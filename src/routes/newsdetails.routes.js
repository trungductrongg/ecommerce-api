import express from "express";
import * as NewsDetailController from "../controllers/NewsDetailController.js";
import asyncHandler from "../middlewares/asyncHandler.js";
import validate from "../middlewares/validate.js";
import insertNewsDetailRequest from "../dtos/requests/newsdetail/InsertNewsDetailRequest.js";

const router = express.Router();

router.get("/", asyncHandler(NewsDetailController.getNewsDetails));
router.get("/:id", asyncHandler(NewsDetailController.getNewsDetailById));
router.post(
  "/",
  validate(insertNewsDetailRequest),
  asyncHandler(NewsDetailController.insertNewsDetail)
);
router.put("/:id", asyncHandler(NewsDetailController.updateNewsDetail));
router.delete("/:id", asyncHandler(NewsDetailController.deleteNewsDetail));

export default router;
