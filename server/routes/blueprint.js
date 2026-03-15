const express = require('express');
const router = express.Router();
const DivineBlueprint = require('../models/DivineBlueprint');
const Session = require('../models/Session');

// GET /api/blueprint/:sessionId — Retrieve divine blueprint for a session
router.get('/:sessionId', async (req, res) => {
  const { sessionId } = req.params;

  try {
    const blueprint = await DivineBlueprint.findOne({ sessionId });
    if (!blueprint) {
      return res.json({ blueprint: null });
    }
    res.json({ blueprint });
  } catch (err) {
    res.status(500).json({ error: 'Could not retrieve divine blueprint.' });
  }
});

// POST /api/blueprint/save — Save project intake form data (Start a Project flow)
router.post('/save', async (req, res) => {
  const { sessionId, projectType, budget, timeline, description } = req.body;

  if (!sessionId) {
    return res.status(400).json({ error: 'sessionId is required.' });
  }

  try {
    await Session.findOneAndUpdate(
      { sessionId },
      {
        $set: {
          'clientInfo.projectType': projectType,
          'clientInfo.budget': budget,
          'clientInfo.timeline': timeline,
          'clientInfo.description': description,
          lastActiveAt: new Date()
        }
      },
      { upsert: true, new: true }
    );

    res.json({ success: true, message: 'Divine intake recorded.' });
  } catch (err) {
    res.status(500).json({ error: 'Could not save project intake.' });
  }
});

// GET /api/blueprint/session/:sessionId — Get full session info
router.get('/session/:sessionId', async (req, res) => {
  const { sessionId } = req.params;

  try {
    const session = await Session.findOne({ sessionId });
    const blueprint = await DivineBlueprint.findOne({ sessionId });
    res.json({ session, blueprint });
  } catch (err) {
    res.status(500).json({ error: 'Could not retrieve session data.' });
  }
});

module.exports = router;
