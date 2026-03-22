const SavedAd = require("../models/SavedAd");

const toggleSave = async (userId, adId) => {
  const existing = await SavedAd.findOne({ user: userId, ad: adId });
  if (existing) {
    await existing.deleteOne();
    return { saved: false };
  }
  await SavedAd.create({ user: userId, ad: adId });
  return { saved: true };
};

const getSavedAds = async (userId) => {
  return await SavedAd.find({ user: userId })
    .populate({
      path: "ad",
      populate: [
        { path: "category", select: "name icon" },
        { path: "subcategory", select: "name" },
      ],
    })
    .sort({ createdAt: -1 })
    .lean();
};

const isSaved = async (userId, adId) => {
  const existing = await SavedAd.findOne({ user: userId, ad: adId });
  return !!existing;
};
const getSavedAdsCount = async (userId) => {
  return await SavedAd.countDocuments({ user: userId });
};
module.exports = { toggleSave, getSavedAds, isSaved ,getSavedAdsCount};