const User = require("../models/User");
const Complaint = require("../models/Complaint");
const asyncHandler = require("../utils/asyncHandler");
const ErrorResponse = require("../utils/ErrorResponse");

// @desc    Get all users
// @route   GET /api/v1/admin/users
// @access  Private (Admin)
exports.getUsers = asyncHandler(async (req, res, next) => {
  const users = await User.find();
  res.status(200).json({ success: true, count: users.length, data: users });
});

// @desc    Update user role
// @route   PUT /api/v1/admin/users/:id/role
// @access  Private (Admin)
exports.updateUserRole = asyncHandler(async (req, res, next) => {
  const user = await User.findByIdAndUpdate(
    req.params.id,
    { role: req.body.role },
    {
      new: true,
      runValidators: true,
    },
  );

  if (!user) {
    return next(
      new ErrorResponse(`User not found with id of ${req.params.id}`, 404),
    );
  }

  res.status(200).json({ success: true, data: user });
});

// @desc    Get dashboard stats
// @route   GET /api/v1/admin/stats
// @access  Private (Admin)
exports.getStats = asyncHandler(async (req, res, next) => {
  const totalCases = await Complaint.countDocuments();
  const pendingCases = await Complaint.countDocuments({ status: "pending" });
  const resolvedCases = await Complaint.countDocuments({ status: "resolved" });
  const totalUsers = await User.countDocuments();

  // Stats by violence type
  const typeStats = await Complaint.aggregate([
    { $group: { _id: "$type", count: { $sum: 1 } } },
  ]);

  res.status(200).json({
    success: true,
    data: {
      totalCases,
      pendingCases,
      resolvedCases,
      totalUsers,
      typeStats,
    },
  });
});
