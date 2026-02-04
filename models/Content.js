const mongoose = require("mongoose");

// --- Legal & Policy CONTENT MODEL ---
const LegalContentSchema = new mongoose.Schema({
  title: {
    type: String,
    required: [true, "Please add a title"],
    unique: true,
  },
  content: {
    type: String,
    required: [true, "Please add content"],
  },
  category: {
    type: String,
    enum: ["Cyber Law", "Victim Rights", "Evidence Guide", "Liability Info"],
    required: true,
  },
  lastUpdated: {
    type: Date,
    default: Date.now,
  },
});

exports.LegalContent = mongoose.model("LegalContent", LegalContentSchema);

// --- AWARENESS & EDUCATION MODEL ---
const AwarenessSchema = new mongoose.Schema({
  type: {
    type: String,
    required: [true, "Please add a violence type"],
    enum: [
      "Cyberbullying",
      "Deepfake",
      "Image-Based Abuse",
      "Online Threats",
      "Identity Theft",
    ],
    unique: true,
  },
  description: String,
  impact: String,
  legalStatus: String,
  prevention: String, // What to do
  imageUrl: String,
});

exports.AwarenessContent = mongoose.model("AwarenessContent", AwarenessSchema);

// --- EMERGENCY & HELP SERVICES MODEL ---
const HelpServiceSchema = new mongoose.Schema({
  name: {
    type: String,
    required: true,
  },
  category: {
    type: String,
    enum: ["Police", "Hotline", "Mental Health", "NGO"],
    required: true,
  },
  contactNumber: String,
  link: String,
  description: String,
  isAvailable247: {
    type: Boolean,
    default: true,
  },
});

exports.HelpService = mongoose.model("HelpService", HelpServiceSchema);
