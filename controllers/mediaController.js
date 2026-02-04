const { News, Media, Campaign } = require("../models/Media");
const asyncHandler = require("../utils/asyncHandler");
const ErrorResponse = require("../utils/ErrorResponse");

// --- NEWS ---
exports.getNews = asyncHandler(async (req, res, next) => {
  const news = await News.find().sort("-createdAt");
  res.status(200).json({ success: true, count: news.length, data: news });
});

exports.createNews = asyncHandler(async (req, res, next) => {
  if (req.file) {
    req.body.image = `/uploads/${req.file.filename}`;
  }
  const news = await News.create(req.body);
  res.status(201).json({ success: true, data: news });
});

// --- MEDIA ---
exports.getMedia = asyncHandler(async (req, res, next) => {
  const media = await Media.find().sort("-createdAt");
  res.status(200).json({ success: true, count: media.length, data: media });
});

exports.uploadMedia = asyncHandler(async (req, res, next) => {
  if (!req.file) {
    return next(new ErrorResponse("Please upload a file", 400));
  }
  const media = await Media.create({
    title: req.body.title,
    url: `/uploads/${req.file.filename}`,
    type: req.file.mimetype.startsWith("image") ? "image" : "video",
  });
  res.status(201).json({ success: true, data: media });
});

// --- CAMPAIGNS ---
exports.getCampaigns = asyncHandler(async (req, res, next) => {
  const collections = await Campaign.find().sort("-startDate");
  res
    .status(200)
    .json({ success: true, count: collections.length, data: collections });
});

exports.createCampaign = asyncHandler(async (req, res, next) => {
  const campaign = await Campaign.create(req.body);
  res.status(201).json({ success: true, data: campaign });
});
