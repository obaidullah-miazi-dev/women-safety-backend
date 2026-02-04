const mongoose = require("mongoose");

// --- NEWS MODEL ---
const NewsSchema = new mongoose.Schema({
  title: {
    type: String,
    required: true,
  },
  content: {
    type: String,
    required: true,
  },
  image: String,
  category: {
    type: String,
    enum: ["Roundtable", "Press Release", "Campaign", "General"],
    default: "General",
  },
  createdAt: {
    type: Date,
    default: Date.now,
  },
});

exports.News = mongoose.model("News", NewsSchema);

// --- MEDIA GALLERY MODEL ---
const MediaSchema = new mongoose.Schema({
  title: String,
  url: {
    type: String,
    required: true,
  },
  type: {
    type: String,
    enum: ["image", "video"],
    required: true,
  },
  createdAt: {
    type: Date,
    default: Date.now,
  },
});

exports.Media = mongoose.model("Media", MediaSchema);

// --- CAMPAIGN MODEL ---
const CampaignSchema = new mongoose.Schema({
  name: {
    type: String,
    required: true,
  },
  description: String,
  startDate: Date,
  endDate: Date,
  isMainCampaign: {
    type: Boolean,
    default: false, // e.g., 16 Days of Activism
  },
  highlights: [String], // URLs to photos/videos
  createdAt: {
    type: Date,
    default: Date.now,
  },
});

exports.Campaign = mongoose.model("Campaign", CampaignSchema);
