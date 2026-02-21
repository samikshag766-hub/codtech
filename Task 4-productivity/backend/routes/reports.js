const router = require("express").Router();
const Event = require("../models/Event");

function startOfWeek(d) {
  const date = new Date(d);
  const day = date.getDay(); // 0=Sun
  const diff = date.getDate() - day; // start Sunday
  const start = new Date(date.setDate(diff));
  start.setHours(0, 0, 0, 0);
  return start;
}

function endOfWeek(start) {
  const end = new Date(start);
  end.setDate(end.getDate() + 6);
  end.setHours(23, 59, 59, 999);
  return end;
}

// GET /api/reports/summary?deviceId=xxx&days=7
router.get("/summary", async (req, res) => {
  try {
    const deviceId = req.query.deviceId;
    const days = Number(req.query.days || 7);

    if (!deviceId) return res.status(400).json({ ok: false, message: "deviceId required" });

    const since = new Date();
    since.setDate(since.getDate() - days);

    const events = await Event.find({ deviceId, endedAt: { $gte: since } }).lean();

    const byDomain = {};
    let totals = { productive: 0, unproductive: 0, neutral: 0, total: 0 };

    for (const e of events) {
      totals.total += e.seconds;
      totals[e.category] += e.seconds;

      byDomain[e.domain] = (byDomain[e.domain] || 0) + e.seconds;
    }

    const topDomains = Object.entries(byDomain)
      .sort((a, b) => b[1] - a[1])
      .slice(0, 10)
      .map(([domain, seconds]) => ({ domain, seconds }));

    res.json({ ok: true, totals, topDomains });
  } catch (err) {
    res.status(500).json({ ok: false, message: err.message });
  }
});

// GET /api/reports/weekly?deviceId=xxx
router.get("/weekly", async (req, res) => {
  try {
    const deviceId = req.query.deviceId;
    if (!deviceId) return res.status(400).json({ ok: false, message: "deviceId required" });

    const ws = startOfWeek(new Date());
    const we = endOfWeek(ws);

    const events = await Event.find({
      deviceId,
      endedAt: { $gte: ws, $lte: we }
    }).lean();

    let report = { weekStart: ws, weekEnd: we, productive: 0, unproductive: 0, neutral: 0, total: 0 };

    for (const e of events) {
      report.total += e.seconds;
      report[e.category] += e.seconds;
    }

    res.json({ ok: true, report });
  } catch (err) {
    res.status(500).json({ ok: false, message: err.message });
  }
});

module.exports = router;
