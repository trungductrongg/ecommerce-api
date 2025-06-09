import express from "express";
import * as BrandController from "../controllers/BrandController.js";

const router = express.Router();

router.get("/", BrandController.getBrands);
router.get("/:id", BrandController.getBrandById);
router.post("/", BrandController.insertBrand);
router.put("/:id", BrandController.updateBrand);
router.delete("/:id", BrandController.deleteBrand);

export default router;
