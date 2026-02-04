const Complaint = require("../models/Complaint");
const ErrorResponse = require("../utils/ErrorResponse");
const asyncHandler = require("../utils/asyncHandler");
const { v4: uuidv4 } = require("uuid");

// @desc    Get all complaints
// @route   GET /api/v1/complaints
// @access  Private (Admin/Law Enforcement)
exports.getComplaints = asyncHandler(async (req, res, next) => {
  let query;

  // If user is law enforcement, only show assigned cases or pending ones?
  // For now, let's allow admins to see all.
  if (req.user.role === "admin") {
    query = Complaint.find().populate("assignedTo", "name role");
  } else {
    query = Complaint.find({ assignedTo: req.user.id });
  }

  const complaints = await query;

  res.status(200).json({
    success: true,
    count: complaints.length,
    data: complaints,
  });
});

// @desc    Get single complaint by tracking ID
// @route   GET /api/v1/complaints/track/:trackingId
// @access  Public
exports.trackComplaint = asyncHandler(async (req, res, next) => {
  const complaint = await Complaint.findOne({
    trackingId: req.params.trackingId,
  });

  if (!complaint) {
    return next(
      new ErrorResponse(
        `Complaint not found with tracking ID of ${req.params.trackingId}`,
        404,
      ),
    );
  }

  res.status(200).json({
    success: true,
    data: {
      trackingId: complaint.trackingId,
      status: complaint.status,
      createdAt: complaint.createdAt,
      type: complaint.type,
    },
  });
});

// @desc    Create new complaint
// @route   POST /api/v1/complaints
// @access  Public
exports.createComplaint = asyncHandler(async (req, res, next) => {
  // Generate a human-readable tracking ID
  const trackingId = `WD-${Date.now().toString().slice(-6)}-${Math.floor(1000 + Math.random() * 9000)}`;

  req.body.trackingId = trackingId;

  // Handle files if any - FIX: Re-adding this logic
  if (req.files && req.files.length > 0) {
    req.body.evidence = req.files.map((file) => `/uploads/${file.filename}`);
  }

  try {
    const complaint = await Complaint.create(req.body);

    res.status(201).json({
      success: true,
      message:
        "Complaint submitted successfully. Please save your tracking ID.",
      data: {
        trackingId: complaint.trackingId,
        status: complaint.status,
      },
    });
  } catch (err) {
    console.error("MONGOOSE CREATE ERROR:");
    console.error(err);
    return next(err);
  }
});

// @desc    Update complaint status
// @route   PUT /api/v1/complaints/:id/status
// @access  Private (Admin/Law Enforcement)
exports.updateStatus = asyncHandler(async (req, res, next) => {
  let complaint = await Complaint.findById(req.params.id);

  if (!complaint) {
    return next(
      new ErrorResponse(`Complaint not found with id of ${req.params.id}`, 404),
    );
  }

  complaint = await Complaint.findByIdAndUpdate(
    req.params.id,
    { status: req.body.status },
    {
      new: true,
      runValidators: true,
    },
  );

  res.status(200).json({
    success: true,
    data: complaint,
  });
});

// @desc    Assign complaint to user (Law Enforcement/NGO)
// @route   PUT /api/v1/complaints/:id/assign
// @access  Private (Admin)
exports.assignComplaint = asyncHandler(async (req, res, next) => {
  let complaint = await Complaint.findById(req.params.id);

  if (!complaint) {
    return next(
      new ErrorResponse(`Complaint not found with id of ${req.params.id}`, 404),
    );
  }

  complaint = await Complaint.findByIdAndUpdate(
    req.params.id,
    {
      assignedTo: req.body.userId,
      status: "assigned",
    },
    {
      new: true,
      runValidators: true,
    },
  );

  res.status(200).json({
    success: true,
    data: complaint,
  });
});
