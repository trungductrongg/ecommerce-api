import express from "express";
import * as CartController from "../controllers/CartController.js";
import asyncHandler from "../middlewares/asyncHandler.js";
import validate from "../middlewares/validate.js";
import InsertCartRequest from "../dtos/requests/cart/insertCartRequest.js";

const router = express.Router();

router.get("/", asyncHandler(CartController.getCarts));
router.get("/:id", asyncHandler(CartController.getCartById));
router.post(
  "/",
  asyncHandler(validate(InsertCartRequest), CartController.insertCart)
);
router.delete("/:id", asyncHandler(CartController.deleteCart));

export default router;
