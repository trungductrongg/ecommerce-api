import express from "express";
import * as BrandController from "../controllers/BrandController.js";
import asyncHandler from "../middlewares/asyncHandler.js";
import validateImageExists from "../middlewares/validateImageExists.js";

const router = express.Router();

router.get("/", asyncHandler(BrandController.getBrands));
router.get("/:id", asyncHandler(BrandController.getBrandById));
router.post(
  "/",
  validateImageExists,
  asyncHandler(BrandController.insertBrand)
);
router.put(
  "/:id",
  validateImageExists,
  asyncHandler(BrandController.updateBrand)
);
router.delete("/:id", asyncHandler(BrandController.deleteBrand));

export default router;
