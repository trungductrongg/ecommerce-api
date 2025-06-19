import express from "express";
import * as CategoryController from "../controllers/CategoryController.js";
import asyncHandler from "../middlewares/asyncHandler.js";

const router = express.Router();

router.get("/", asyncHandler(CategoryController.getCategories));
router.get("/:id", asyncHandler(CategoryController.getCategoryById));
router.post("/", asyncHandler(CategoryController.insertCategory));
router.put("/:id", asyncHandler(CategoryController.updateCategory));
router.delete("/:id", asyncHandler(CategoryController.deleteCategory));

export default router;
