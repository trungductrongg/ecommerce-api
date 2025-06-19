import express from "express";
import * as OrderController from "../controllers/OrderController.js";
import asyncHandler from "../middlewares/asyncHandler.js";
import validate from "../middlewares/validate.js";
import insertOrderRequest from "../dtos/requests/order/InsertOrderRequest.js";

const router = express.Router();

router.get("/", OrderController.getOrders);
router.get("/:id", OrderController.getOrderById);
router.post(
  "/",
  validate(insertOrderRequest),
  asyncHandler(OrderController.insertOrder)
);
router.put("/:id", OrderController.updateOrder);
router.delete("/:id", OrderController.deleteOrder);

export default router;
