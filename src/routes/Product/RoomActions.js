import express from "express";
const router = express.Router();
import {
  ActionCommentController,
  ActionLikeController,
} from "../../controllers/Product/actionController.js";

router.post("/comment", ActionCommentController);
router.post("/like", ActionLikeController);
export default router;
