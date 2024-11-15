import express from "express";
const router = express.Router();
import {
  RoomListController,
  viewRoomController,
} from "../../controllers/Product/RoomListController.js";
router.post("/room", RoomListController);
router.post("/viewRoom", viewRoomController);

export default router;
