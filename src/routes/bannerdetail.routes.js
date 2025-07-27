import express from "express";
import * as BannerDetailController from "../controllers/BannerDetailController";
import asyncHandler from "../middlewares/asyncHandler";
import validate from "../middlewares/validate";
import insertBannerDetailRequest from "../dtos/requests/bannerdetail/InsertBannerDetailRequest";

const router = express.Router();

router.get("/", asyncHandler(BannerDetailController.getBannerDetails));
router.get("/:id", asyncHandler(BannerDetailController.getBannerDetailById));
router.post(
  "/",
  validate(insertBannerDetailRequest),
  asyncHandler(BannerDetailController.insertBannerDetail)
);
router.put("/:id", asyncHandler(BannerDetailController.updateBannerDetail));
router.delete("/:id", asyncHandler(BannerDetailController.deleteBannerDetail));

export default router;
