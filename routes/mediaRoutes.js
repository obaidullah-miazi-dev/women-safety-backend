const express = require("express");
const {
  getNews,
  createNews,
  getMedia,
  uploadMedia,
  getCampaigns,
  createCampaign,
} = require("../controllers/mediaController");

const router = express.Router();

const { protect, authorize } = require("../middleware/auth");
const upload = require("../middleware/upload");

// News
router
  .route("/news")
  .get(getNews)
  .post(protect, authorize("admin"), upload.single("image"), createNews);

// Media
router
  .route("/gallery")
  .get(getMedia)
  .post(protect, authorize("admin"), upload.single("media"), uploadMedia);

// Campaigns
router
  .route("/campaigns")
  .get(getCampaigns)
  .post(protect, authorize("admin"), createCampaign);

module.exports = router;
