import express from "express";
import * as CartItemController from "../controllers/CartItemController.js";
import asyncHandler from "../middlewares/asyncHandler.js";
import InsertCartItemRequest from "../dtos/requests/cartitem/InsertCartItemRequest.js";

const router = express.Router();

router.get("/", asyncHandler(CartItemController.getCartItems));
router.get("/:id", asyncHandler(CartItemController.getCartItemById));
router.post(
  "/",
  asyncHandler(
    validate(InsertCartItemRequest),
    CartItemController.insertCartItem
  )
);
// router.post("/", asyncHandler(CartItemController.updateCartItem));
router.delete("/:id", asyncHandler(CartItemController.deleteCartItem));

export default router;
