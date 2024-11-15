import express from "express";
import upload from "../../utils/multer/multer.js"; // Assuming multer setup

import {
  profileChekerController,
  profileUpdater,
} from "../../controllers/User/profile_controller.js";

const router = express.Router();

router.post("/profile", profileChekerController);
router.post("/profile/update", upload.single("image"), profileUpdater); // Make sure 'image' matches the form field name

export default router;
