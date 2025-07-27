import express from "express";
import * as ImageController from "../controllers/ImageController.js";
import asyncHandler from "../middlewares/asyncHandler.js";
import uploadImageMiddleWare from "../middlewares/imageUpload.js";

const router = express.Router();

router.get("/:fileName", asyncHandler(ImageController.viewImage));
router.post(
  "/uploads",
  uploadImageMiddleWare.array("images", 5),
  asyncHandler(ImageController.uploadImages)
);
// router.post(
//   "/google/uploads",
//   uploadImageGoogleMiddleWare.array("images", 5),
//   asyncHandler(ImageController.uploadImages)
// );
router.delete("/delete", ImageController.deleteImage);

export default router;
