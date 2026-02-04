const {
  LegalContent,
  AwarenessContent,
  HelpService,
} = require("../models/Content");
const ErrorResponse = require("../utils/ErrorResponse");
const asyncHandler = require("../utils/asyncHandler");

// --- LEGAL CONTENT ---
exports.getLegalContent = asyncHandler(async (req, res, next) => {
  const content = await LegalContent.find();
  res.status(200).json({ success: true, count: content.length, data: content });
});

exports.createLegalContent = asyncHandler(async (req, res, next) => {
  const content = await LegalContent.create(req.body);
  res.status(201).json({ success: true, data: content });
});

// --- AWARENESS CONTENT ---
exports.getAwarenessContent = asyncHandler(async (req, res, next) => {
  const content = await AwarenessContent.find();
  res.status(200).json({ success: true, count: content.length, data: content });
});

exports.createAwarenessContent = asyncHandler(async (req, res, next) => {
  const content = await AwarenessContent.create(req.body);
  res.status(201).json({ success: true, data: content });
});

// --- HELP SERVICES ---
exports.getHelpServices = asyncHandler(async (req, res, next) => {
  const services = await HelpService.find();
  res
    .status(200)
    .json({ success: true, count: services.length, data: services });
});

exports.createHelpService = asyncHandler(async (req, res, next) => {
  const service = await HelpService.create(req.body);
  res.status(201).json({ success: true, data: service });
});
