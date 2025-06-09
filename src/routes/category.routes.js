import express from "express";
import * as CategoryController from "../controllers/CategoryController.js";

const router = express.Router();

router.get("/", CategoryController.getCategories);
router.get("/:id", CategoryController.getCategoryById);
router.post("/", CategoryController.insertCategory);
router.put("/:id", CategoryController.updateCategory);
router.delete("/:id", CategoryController.deleteCategory);

export default router;
