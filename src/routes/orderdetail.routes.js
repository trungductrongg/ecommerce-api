import express from "express";
import * as OrderDetailController from "../controllers/OrderDetailController.js";

const router = express.Router();

router.get("/", OrderDetailController.getOrderDetails);
router.get("/:id", OrderDetailController.getOrderDetailById);
router.post("/", OrderDetailController.insertOrderDetail);
router.put("/:id", OrderDetailController.updateOrderDetail);
router.delete("/:id", OrderDetailController.deleteOrderDetail);

export default router;
