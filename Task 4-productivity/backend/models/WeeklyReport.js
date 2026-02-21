const mongoose = require("mongoose");

const WeeklyReportSchema = new mongoose.Schema(
  {
    deviceId: { type: String, required: true, index: true },
    weekStart: { type: Date, required: true, index: true },
    weekEnd: { type: Date, required: true },
    totalSeconds: { type: Number, default: 0 },
    productiveSeconds: { type: Number, default: 0 },
    unproductiveSeconds: { type: Number, default: 0 },
    neutralSeconds: { type: Number, default: 0 }
  },
  { timestamps: true }
);

module.exports = mongoose.model("WeeklyReport", WeeklyReportSchema);
