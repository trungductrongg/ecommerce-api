import express from "express";
import * as BannerController from "../controllers/BannerController.js";
import asyncHandler from "../middlewares/asyncHandler.js";
import validate from "../middlewares/validate.js";
import insertBannerRequest from "../dtos/requests/banner/InsertBannerRequest.js";
import validateImageExists from "../middlewares/validateImageExists.js";

const router = express.Router();

router.get("/", asyncHandler(BannerController.getBanners));
router.get("/:id", asyncHandler(BannerController.getBannerById));
router.post(
  "/",
  validate(insertBannerRequest),
  validateImageExists,
  asyncHandler(BannerController.insertBanner)
);
router.put(
  "/:id",
  validateImageExists,
  asyncHandler(BannerController.updateBanner)
);
router.delete("/:id", asyncHandler(BannerController.deleteBanner));

export default router;
