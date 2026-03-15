const express = require('express');
const router = express.Router();
const { adminAuth } = require('../middleware/auth');
const Session = require('../models/Session');
const Conversation = require('../models/Conversation');
const DivineBlueprint = require('../models/DivineBlueprint');

// POST /api/admin/login — Authenticate admin
router.post('/login', (req, res) => {
  const { password } = req.body;
  if (password === process.env.ADMIN_PASSWORD) {
    res.json({ success: true, token: process.env.ADMIN_PASSWORD });
  } else {
    res.status(401).json({ error: 'The divine archives are sealed. Wrong passphrase.' });
  }
});

// All routes below require auth
router.use(adminAuth);

// GET /api/admin/sessions — List all sessions
router.get('/sessions', async (req, res) => {
  try {
    const { status, god, limit = 50, skip = 0 } = req.query;

    const filter = {};
    if (status) filter.status = status;
    if (god) filter.assignedGods = god;

    const sessions = await Session.find(filter)
      .sort({ lastActiveAt: -1 })
      .limit(Number(limit))
      .skip(Number(skip));

    const total = await Session.countDocuments(filter);

    res.json({ sessions, total });
  } catch (err) {
    res.status(500).json({ error: 'Could not retrieve sessions.' });
  }
});

// GET /api/admin/sessions/:sessionId — Get full session with all conversations and blueprint
router.get('/sessions/:sessionId', async (req, res) => {
  const { sessionId } = req.params;

  try {
    const session = await Session.findOne({ sessionId });
    const blueprint = await DivineBlueprint.findOne({ sessionId });
    const conversations = await Conversation.find({ sessionId }).sort({ updatedAt: -1 });

    res.json({ session, blueprint, conversations });
  } catch (err) {
    res.status(500).json({ error: 'Could not retrieve session details.' });
  }
});

// PATCH /api/admin/sessions/:sessionId/status — Update session status
router.patch('/sessions/:sessionId/status', async (req, res) => {
  const { sessionId } = req.params;
  const { status } = req.body;

  const validStatuses = ['Lead', 'In Progress', 'Closed'];
  if (!validStatuses.includes(status)) {
    return res.status(400).json({ error: 'Invalid status. Use: Lead, In Progress, or Closed.' });
  }

  try {
    const session = await Session.findOneAndUpdate(
      { sessionId },
      { $set: { status } },
      { new: true }
    );

    if (!session) return res.status(404).json({ error: 'Session not found.' });
    res.json({ success: true, session });
  } catch (err) {
    res.status(500).json({ error: 'Could not update session status.' });
  }
});

// GET /api/admin/stats — Dashboard stats
router.get('/stats', async (req, res) => {
  try {
    const totalSessions = await Session.countDocuments();
    const leads = await Session.countDocuments({ status: 'Lead' });
    const inProgress = await Session.countDocuments({ status: 'In Progress' });
    const closed = await Session.countDocuments({ status: 'Closed' });
    const totalBlueprints = await DivineBlueprint.countDocuments();

    const godActivity = await Conversation.aggregate([
      { $group: { _id: '$god', conversations: { $sum: 1 }, messages: { $sum: '$messageCount' } } },
      { $sort: { messages: -1 } }
    ]);

    const recentSessions = await Session.find()
      .sort({ lastActiveAt: -1 })
      .limit(5);

    res.json({
      totalSessions,
      leads,
      inProgress,
      closed,
      totalBlueprints,
      godActivity,
      recentSessions
    });
  } catch (err) {
    res.status(500).json({ error: 'Could not retrieve divine stats.' });
  }
});

// GET /api/admin/export/:sessionId — Export conversation as JSON (can be used for PDF generation on frontend)
router.get('/export/:sessionId', async (req, res) => {
  const { sessionId } = req.params;

  try {
    const session = await Session.findOne({ sessionId });
    const blueprint = await DivineBlueprint.findOne({ sessionId });
    const conversations = await Conversation.find({ sessionId });

    const exportData = {
      exportedAt: new Date(),
      session,
      blueprint,
      conversations: conversations.map(c => ({
        god: c.god,
        messageCount: c.messageCount,
        messages: c.messages,
        updatedAt: c.updatedAt
      }))
    };

    res.setHeader('Content-Type', 'application/json');
    res.setHeader('Content-Disposition', `attachment; filename=divine-session-${sessionId}.json`);
    res.json(exportData);
  } catch (err) {
    res.status(500).json({ error: 'Could not export session.' });
  }
});

module.exports = router;
