import express from "express";
import * as BannerController from "../controllers/BannerController.js";

const router = express.Router();

router.get("/", BannerController.getBanners);
router.get("/:id", BannerController.getBannerById);
router.post("/", BannerController.insertBanner);
router.put("/:id", BannerController.updateBanner);
router.delete("/:id", BannerController.deleteBanner);

export default router;
