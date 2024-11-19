import express from "express";

import {
  profileChekerController,
  profileUpdater,
} from "../../controllers/User/profile_controller.js";

const router = express.Router();

router.post("/profile", profileChekerController);
router.post("/profile/update", profileUpdater); // Make sure 'image' matches the form field name

export default router;
