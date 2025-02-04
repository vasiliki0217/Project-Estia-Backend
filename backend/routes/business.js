const express = require("express");
const multer = require("multer");
const router = express.Router();
const {
  getBusiness,
  getBusinessById,
  getBusinessWithAddress,
  getBusinessWithFeatures,
  getBusinessWithReviews,
  uploadImageToBusiness,
} = require("../controllers/businessController");

const storage = multer.diskStorage({});
const upload = multer({ storage });

router.get("/", getBusiness);
router.get("/:id", getBusinessById);
router.get("/:id/address_details", getBusinessWithAddress);
router.get("/:id/business_features", getBusinessWithFeatures);
router.get("/:id/business_reviews", getBusinessWithReviews);
router.post(
  "/uploadImageToBusiness",
  upload.single("picture"),
  uploadImageToBusiness
);

module.exports = router;
