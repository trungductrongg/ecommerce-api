import express from "express";
import * as ProductController from "../controllers/ProductController.js";
import asyncHandler from "../middlewares/asyncHandler.js";
import validate from "../middlewares/validate.js";
import InsertProductRequest from "../dtos/requests/product/InsertProductRequest.js";
import updateProductRequest from "../dtos/requests/product/UpdateProductRequest.js";
import validateImageExists from "../middlewares/validateImageExists.js";

const router = express.Router();

router.get("/", asyncHandler(ProductController.getProducts));
router.get("/:id", asyncHandler(ProductController.getProductById));
router.post(
  "/",
  validate(InsertProductRequest),
  validateImageExists,
  asyncHandler(ProductController.insertProduct)
);
router.put(
  "/:id",
  validate(updateProductRequest),
  validateImageExists,
  asyncHandler(ProductController.updateProduct)
);
router.delete("/:id", asyncHandler(ProductController.deleteProduct));

export default router;
