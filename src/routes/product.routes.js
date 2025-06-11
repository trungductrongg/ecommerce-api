import express from "express";
import * as ProductController from "../controllers/ProductController.js";
import asyncHandler from "../middlewares/asyncHandler.js";
import validate from "../middlewares/validate.js";
import InsertProductRequest from "../dtos/requests/InsertProductRequest.js";

const router = express.Router();

router.get("/", asyncHandler(ProductController.getProducts));
router.get("/:id", asyncHandler(ProductController.getProductById));
router.post(
  "/",
  validate(InsertProductRequest),
  asyncHandler(ProductController.insertProduct)
);
router.put("/:id", asyncHandler(ProductController.updateProduct));
router.delete("/:id", asyncHandler(ProductController.deleteProduct));

export default router;
