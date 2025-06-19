import express from "express";
import * as UserController from "../controllers/UserController.js";
import asyncHandler from "../middlewares/asyncHandler.js";
import validate from "../middlewares/validate.js";
import insertUserRequest from "../dtos/requests/user/inserUserRequest.js";

const router = express.Router();

router.get("/", asyncHandler(UserController.getUsers));
router.get("/:id", asyncHandler(UserController.getUserById));
router.post(
  "/",
  validate(insertUserRequest),
  asyncHandler(UserController.insertUser)
);
router.put("/:id", asyncHandler(UserController.updateUser));
router.delete("/:id", asyncHandler(UserController.deleteUser));

export default router;
