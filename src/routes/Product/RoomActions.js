import express from "express";
const router = express.Router();
import {
  AdminRoomController,
  DeleteRoomController,
} from "../../controllers/Product/AdminRoom.js";
import {
  postControllerAdd,
  postControllerRemove,
} from "../../controllers/Product/actionController.js";

router.post("/admin", AdminRoomController);
router.post("/delete", DeleteRoomController);
router.post("/postAdd", postControllerAdd);
router.post("/postRemove", postControllerRemove);
export default router;
