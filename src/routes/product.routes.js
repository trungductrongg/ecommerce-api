import express from "express";
import * as ProductController from "../controllers/ProductController.js";

const router = express.Router();

router.get("/", ProductController.getProducts);
router.get("/:id", ProductController.getProductById);
router.post("/", ProductController.insertProduct);
router.put("/:id", ProductController.updateProduct);
router.delete("/:id", ProductController.deleteProduct);

export default router;
