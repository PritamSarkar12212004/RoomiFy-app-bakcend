import express from "express";
const router = express.Router();
import {
  useSingUpController,
  useLoginController,
} from "../../controllers/User/userAuth__Controller.js";


router.post("/signup", useSingUpController);
router.post("/login", useLoginController);

export default router;
