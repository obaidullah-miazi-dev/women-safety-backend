const mongoose = require("mongoose");
const CryptoJS = require("crypto-js");

const ComplaintSchema = new mongoose.Schema(
  {
    trackingId: {
      type: String,
      required: true,
      unique: true,
    },
    type: {
      type: String,
      required: [true, "Please add a violence type"],
      enum: [
        "Cyberstalking",
        "Deepfake",
        "Image-Based Abuse",
        "Online Harassment",
        "Identity Theft",
        "Online Threats",
        "Other",
      ],
    },
    description: {
      type: String,
      required: [true, "Please add a description"],
    },
    // Encrypted field for victim name (if provided)
    victimName: {
      type: String,
      set: function (val) {
        if (!val) return val;
        return CryptoJS.AES.encrypt(val, process.env.JWT_SECRET).toString();
      },
      get: function (val) {
        if (!val) return val;
        try {
          const bytes = CryptoJS.AES.decrypt(val, process.env.JWT_SECRET);
          return bytes.toString(CryptoJS.enc.Utf8);
        } catch (err) {
          return val;
        }
      },
    },
    victimPhone: {
      type: String,
      set: function (val) {
        if (!val) return val;
        return CryptoJS.AES.encrypt(val, process.env.JWT_SECRET).toString();
      },
      get: function (val) {
        if (!val) return val;
        try {
          const bytes = CryptoJS.AES.decrypt(val, process.env.JWT_SECRET);
          return bytes.toString(CryptoJS.enc.Utf8);
        } catch (err) {
          return val;
        }
      },
    },
    isAnonymous: {
      type: Boolean,
      default: false,
    },
    evidence: [String], // Array of file paths
    status: {
      type: String,
      enum: ["pending", "investigating", "resolved", "dismissed"],
      default: "pending",
    },
    assignedTo: {
      type: mongoose.Schema.ObjectId,
      ref: "User",
    },
    notes: [
      {
        text: String,
        user: {
          type: mongoose.Schema.ObjectId,
          ref: "User",
        },
        createdAt: {
          type: Date,
          default: Date.now,
        },
      },
    ],
    language: {
      type: String,
      enum: ["Bangla", "English"],
      default: "Bangla",
    },
    createdAt: {
      type: Date,
      default: Date.now,
    },
  },
  {
    toJSON: { getters: true },
    toObject: { getters: true },
  },
);

module.exports = mongoose.model("Complaint", ComplaintSchema);
