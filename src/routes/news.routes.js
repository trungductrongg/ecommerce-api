import express from "express";
import * as NewsController from "../controllers/NewsController.js";
import asyncHandler from "../middlewares/asyncHandler.js";
import validate from "../middlewares/validate.js";
import insertNewsRequest from "../dtos/requests/news/InsertNewsRequest.js";
import updateNewsRequest from "../dtos/requests/news/UpdateNewsRequest.js";

const router = express.Router();

router.get("/", asyncHandler(NewsController.getNewsArticcles));
router.get("/:id", asyncHandler(NewsController.getNewsById));
router.post(
  "/",
  validate(insertNewsRequest),
  asyncHandler(NewsController.insertNews)
);
router.put(
  "/:id",
  validate(updateNewsRequest),
  asyncHandler(NewsController.updateNewsArticle)
);
router.delete("/:id", asyncHandler(NewsController.deleteNewsArticle));

export default router;
