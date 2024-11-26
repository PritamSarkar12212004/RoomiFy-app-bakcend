import express from "express";

import {
  profileChekerController,
  profileUpdater,
  nameUpdater,
  numberUpdater,
} from "../../controllers/User/profile_controller.js";

const router = express.Router();

router.post("/profile", profileChekerController);
router.post("/profile/update/profile", profileUpdater);
router.post("/profile/update/name", nameUpdater);
router.post("/profile/update/number", numberUpdater);

export default router;
