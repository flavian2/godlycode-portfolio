const express = require('express');
const router = express.Router();
const Anthropic = require('@anthropic-ai/sdk');
const gods = require('../prompts/gods');
const Conversation = require('../models/Conversation');
const Session = require('../models/Session');
const DivineBlueprint = require('../models/DivineBlueprint');

const anthropic = new Anthropic({ apiKey: process.env.ANTHROPIC_API_KEY });

const VALID_GODS = ['ikuku', 'oshun', 'ogun', 'eshu'];

// Extract blueprint JSON from Ikuku's response
function extractBlueprint(text) {
  const startMarker = '[DIVINE_BLUEPRINT_START]';
  const endMarker = '[DIVINE_BLUEPRINT_END]';
  const startIdx = text.indexOf(startMarker);
  const endIdx = text.indexOf(endMarker);

  if (startIdx === -1 || endIdx === -1) return null;

  const jsonStr = text.slice(startIdx + startMarker.length, endIdx).trim();
  try {
    return JSON.parse(jsonStr);
  } catch {
    return null;
  }
}

// Strip blueprint markers from response shown to user
function stripBlueprint(text) {
  const startMarker = '[DIVINE_BLUEPRINT_START]';
  const endMarker = '[DIVINE_BLUEPRINT_END]';
  const startIdx = text.indexOf(startMarker);
  if (startIdx === -1) return text;
  return text.slice(0, startIdx).trim();
}

// Build context-aware system prompt (inject blueprint for non-ikuku gods)
async function buildSystemPrompt(god, sessionId) {
  const godData = gods[god];
  let systemPrompt = godData.systemPrompt;

  if (god !== 'ikuku' && sessionId) {
    try {
      const blueprint = await DivineBlueprint.findOne({ sessionId });
      if (blueprint) {
        const briefingKey = `briefingFor${god.charAt(0).toUpperCase() + god.slice(1)}`;
        const briefing = blueprint[briefingKey];

        systemPrompt += `\n\n--- IKUKU'S DIVINE BRIEFING (received before client arrived) ---
Project Type: ${blueprint.projectType}
Budget: ${blueprint.budget}
Timeline: ${blueprint.timeline}
Tech Stack: ${blueprint.techStack ? blueprint.techStack.join(', ') : 'TBD'}
Your Specific Briefing: ${briefing || 'Ikuku has briefed you — you know the project details. Greet the client as if you already know everything.'}
---
When greeting this client for the first time, reference this briefing naturally and confidently as if Ikuku told you everything in advance.`;
      }
    } catch (err) {
      console.error('Error loading blueprint for', god, err.message);
    }
  }

  return systemPrompt;
}

// POST /api/chat/:god — Streaming chat with SSE
router.post('/:god', async (req, res) => {
  const { god } = req.params;
  const { message, sessionId, preloadedContext } = req.body;

  if (!VALID_GODS.includes(god)) {
    return res.status(400).json({ error: 'Unknown divine entity requested.' });
  }

  if (!message || !sessionId) {
    return res.status(400).json({ error: 'Message and sessionId are required.' });
  }

  // Set SSE headers
  res.setHeader('Content-Type', 'text/event-stream');
  res.setHeader('Cache-Control', 'no-cache');
  res.setHeader('Connection', 'keep-alive');
  res.setHeader('Access-Control-Allow-Origin', '*');
  res.flushHeaders();

  const sendEvent = (data) => {
    res.write(`data: ${JSON.stringify(data)}\n\n`);
  };

  try {
    // Ensure session exists
    await Session.findOneAndUpdate(
      { sessionId },
      { $set: { lastActiveAt: new Date() } },
      { upsert: true, new: true }
    );

    // Get or create conversation
    let conversation = await Conversation.findOne({ sessionId, god });
    if (!conversation) {
      conversation = new Conversation({ sessionId, god, messages: [], messageCount: 0 });
    }

    // Build system prompt (with blueprint context for non-ikuku gods)
    const systemPrompt = await buildSystemPrompt(god, sessionId);

    // Build messages array for API call
    const apiMessages = conversation.messages
      .slice(-20) // keep last 20 messages for context
      .map(m => ({ role: m.role, content: m.content }));

    // Add preloaded context as first user message if present (for Start Project flow)
    if (apiMessages.length === 0 && preloadedContext) {
      apiMessages.push({ role: 'user', content: preloadedContext });
      apiMessages.push({
        role: 'assistant',
        content: 'The wind has carried your project details to me. I have received Ikuku\'s briefing. I am ready to begin.'
      });
    }

    apiMessages.push({ role: 'user', content: message });

    // Stream from Anthropic
    let fullResponse = '';

    const stream = await anthropic.messages.stream({
      model: 'claude-sonnet-4-20250514',
      max_tokens: 1500,
      system: systemPrompt,
      messages: apiMessages
    });

    for await (const event of stream) {
      if (event.type === 'content_block_delta' && event.delta.type === 'text_delta') {
        fullResponse += event.delta.text;

        // Don't stream blueprint markers — stream clean text
        const cleanText = stripBlueprint(fullResponse);
        const prevClean = stripBlueprint(fullResponse.slice(0, -event.delta.text.length));
        const newChunk = cleanText.slice(prevClean.length);

        if (newChunk) {
          sendEvent({ type: 'token', text: newChunk });
        }
      }
    }

    // Extract and save blueprint if Ikuku generated one
    let blueprintData = null;
    if (god === 'ikuku') {
      const blueprint = extractBlueprint(fullResponse);
      if (blueprint) {
        blueprintData = blueprint;
        try {
          await DivineBlueprint.findOneAndUpdate(
            { sessionId },
            {
              $set: {
                ...blueprint,
                sessionId,
                updatedAt: new Date()
              }
            },
            { upsert: true, new: true }
          );

          // Update session with assigned gods
          if (blueprint.assignedGods) {
            await Session.findOneAndUpdate(
              { sessionId },
              { $set: { assignedGods: blueprint.assignedGods, status: 'Lead' } }
            );
          }
        } catch (err) {
          console.error('Error saving blueprint:', err.message);
        }
      }
    }

    const cleanResponse = stripBlueprint(fullResponse);

    // Save messages to DB
    try {
      conversation.messages.push({ role: 'user', content: message });
      conversation.messages.push({ role: 'assistant', content: cleanResponse });
      conversation.messageCount = conversation.messages.length;
      conversation.updatedAt = new Date();
      await conversation.save();
    } catch (err) {
      console.error('Error saving conversation:', err.message);
    }

    // Send completion event with blueprint data if generated
    sendEvent({
      type: 'done',
      blueprint: blueprintData,
      fullText: cleanResponse
    });

    res.end();

  } catch (err) {
    console.error('Chat route error:', err.message);
    sendEvent({ type: 'error', message: 'The divine connection was interrupted. Please try again.' });
    res.end();
  }
});

// GET /api/chat/:god/history — Get conversation history
router.get('/:god/history', async (req, res) => {
  const { god } = req.params;
  const { sessionId } = req.query;

  if (!VALID_GODS.includes(god) || !sessionId) {
    return res.status(400).json({ error: 'Invalid request.' });
  }

  try {
    const conversation = await Conversation.findOne({ sessionId, god });
    res.json({ messages: conversation ? conversation.messages : [] });
  } catch (err) {
    res.status(500).json({ error: 'Could not retrieve divine records.' });
  }
});

module.exports = router;
