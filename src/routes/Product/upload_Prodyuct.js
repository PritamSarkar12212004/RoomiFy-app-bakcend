import express from "express";
const router = express.Router();
import { UploadProduct } from "../../controllers/Product/uploadProductController.js";
import upload from "../../utils/multer/multimilter.js";

router.post("/product", UploadProduct);
export default router;
