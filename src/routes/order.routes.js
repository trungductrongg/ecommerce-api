import express from "express";
import * as OrderController from "../controllers/OrderController.js";

const router = express.Router();

router.get("/", OrderController.getOrders);
router.get("/:id", OrderController.getOrderById);
router.post("/", OrderController.insertOrder);
router.put("/:id", OrderController.updateOrder);
router.delete("/:id", OrderController.deleteOrder);

export default router;
