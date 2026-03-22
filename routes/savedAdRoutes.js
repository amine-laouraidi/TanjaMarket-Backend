const express = require("express");
const {
  toggleSave,
  getSavedAds,
  checkSaved,
  getSavedAdsCount
} = require("../controllers/savedAdController");
const { protect } = require("../middlewares/authMiddleware");

const router = express.Router();

router.use(protect);
router.get("/", getSavedAds);
router.post("/:adId", toggleSave);
router.get("/check/:adId", checkSaved);
router.get("/count", getSavedAdsCount);

module.exports = router;
