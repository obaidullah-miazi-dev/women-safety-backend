const express = require("express");
const {
  getComplaints,
  createComplaint,
  trackComplaint,
  updateStatus,
  assignComplaint,
} = require("../controllers/complaintController");

const router = express.Router();

const { protect, authorize } = require("../middleware/auth");
const upload = require("../middleware/upload");

router
  .route("/")
  .get(protect, authorize("admin", "law_enforcement"), getComplaints)
  .post(upload.array("evidence", 5), createComplaint);

router.get("/track/:trackingId", trackComplaint);

router.put(
  "/:id/status",
  protect,
  authorize("admin", "law_enforcement"),
  updateStatus,
);
router.put("/:id/assign", protect, authorize("admin"), assignComplaint);

module.exports = router;
