const express = require("express");
const {
  getLegalContent,
  createLegalContent,
  getAwarenessContent,
  createAwarenessContent,
  getHelpServices,
  createHelpService,
} = require("../controllers/contentController");

const router = express.Router();

const { protect, authorize } = require("../middleware/auth");

// Legal
router
  .route("/legal")
  .get(getLegalContent)
  .post(protect, authorize("admin"), createLegalContent);

// Awareness
router
  .route("/awareness")
  .get(getAwarenessContent)
  .post(protect, authorize("admin"), createAwarenessContent);

// Help
router
  .route("/help")
  .get(getHelpServices)
  .post(protect, authorize("admin"), createHelpService);

module.exports = router;
