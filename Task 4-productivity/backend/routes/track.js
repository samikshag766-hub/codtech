const router = require("express").Router();
const Event = require("../models/Event");

// POST /api/track
// body: { deviceId, domain, category, seconds, startedAt, endedAt }
router.post("/", async (req, res) => {
  try {
    const { deviceId, domain, category, seconds, startedAt, endedAt } = req.body;

    if (!deviceId || !domain || !seconds || !startedAt || !endedAt) {
      return res.status(400).json({ ok: false, message: "Missing fields" });
    }

    const ev = await Event.create({
      deviceId,
      domain,
      category: category || "neutral",
      seconds,
      startedAt: new Date(startedAt),
      endedAt: new Date(endedAt)
    });

    res.json({ ok: true, eventId: ev._id });
  } catch (err) {
    res.status(500).json({ ok: false, message: err.message });
  }
});

module.exports = router;
