import multer from "multer";
import path from "path";
const storage = multer.diskStorage({
  destination: (req, file, cb) => {
    cb(null, "temp/"); // Define the directory to save uploaded files
  },
  filename: (req, file, cb) => {
    cb(
      null,
      file.fieldname + "-" + Date.now() + path.extname(file.originalname)
    ); // Name the file as fieldname and current timestamp
  },
});

// Create multer instance with storage options
const upload = multer({
  storage: storage,
}).fields([
  { name: "mainImage", maxCount: 1 }, // For main image
  { name: "childImages", maxCount: 6 }, // For child images (max 6)
]);

export default upload;
