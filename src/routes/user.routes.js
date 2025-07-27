import express from "express";
import * as UserController from "../controllers/UserController.js";
import asyncHandler from "../middlewares/asyncHandler.js";
import validate from "../middlewares/validate.js";
import insertUserRequest from "../dtos/requests/user/inserUserRequest.js";
import validateImageExists from "../middlewares/validateImageExists.js";

const router = express.Router();

router.get("/", asyncHandler(UserController.getUsers));
router.get("/:id", asyncHandler(UserController.getUserById));
router.post(
  "/",
  validate(insertUserRequest),
  validateImageExists,
  asyncHandler(UserController.insertUser)
);
router.put(
  "/:id",
  validateImageExists,
  asyncHandler(UserController.updateUser)
);
router.delete("/:id", asyncHandler(UserController.deleteUser));

export default router;
