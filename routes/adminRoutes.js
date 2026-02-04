const express = require("express");
const {
  getUsers,
  updateUserRole,
  getStats,
} = require("../controllers/adminController");

const router = express.Router();

const { protect, authorize } = require("../middleware/auth");

router.use(protect);
router.use(authorize("admin"));

router.get("/users", getUsers);
router.put("/users/:id/role", updateUserRole);
router.get("/stats", getStats);

module.exports = router;
