const mongoose = require("mongoose");

const EventSchema = new mongoose.Schema(
  {
    deviceId: { type: String, required: true, index: true },
    domain: { type: String, required: true, index: true },
    category: { type: String, enum: ["productive", "unproductive", "neutral"], default: "neutral" },
    seconds: { type: Number, required: true },
    startedAt: { type: Date, required: true },
    endedAt: { type: Date, required: true }
  },
  { timestamps: true }
);

module.exports = mongoose.model("Event", EventSchema);
