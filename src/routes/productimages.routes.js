import express from "express";
import * as ProductImageController from "../controllers/ProductImageController.js";
import asyncHandler from "../middlewares/asyncHandler.js";
import validate from "../middlewares/validate.js";
import InsertProductImageRequest from "../dtos/requests/product_images/InsertProductImageRequest.js";
import validateImageExists from "../middlewares/validateImageExists.js";

const router = express.Router();

router.get("/", asyncHandler(ProductImageController.getProductImages));
router.get("/:id", asyncHandler(ProductImageController.getProductImageById));
router.post(
  "/",
  validateImageExists,
  validate(InsertProductImageRequest),
  asyncHandler(ProductImageController.insertProductImage)
);
router.put("/:id", asyncHandler(ProductImageController.updateProductImage));
router.delete("/:id", asyncHandler(ProductImageController.deleteProductImage));

export default router;
