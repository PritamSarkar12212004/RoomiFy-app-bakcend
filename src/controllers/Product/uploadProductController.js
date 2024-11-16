import cloudinary from "cloudinary";
import fs from "fs";
import sharp from "sharp";
import roomModel from "../../models/Product/Room/room_model.js";

const UploadProduct = async (req, res) => {
  const { mainImage, childImages } = req.files;
  // Validate that images are provided
  if (!mainImage || !childImages || childImages.length === 0) {
    return res
      .status(400)
      .json({ message: "Please upload all required images." });
  }

  try {
    const compressedImagePath = `uploads/compressed-${Date.now()}.jpg`; // Temporary path for the compressed image
    await sharp(mainImage[0].path)
      .resize(500) // Resize the image to a max width of 500px
      .toFormat("jpeg") // Convert to JPEG format (you can adjust this based on your needs)
      .jpeg({ quality: 80 }) // Set JPEG quality to 80 (you can adjust this for compression)
      .toFile(compressedImagePath);
    // Upload main image to Cloudinary
    const mainImageResult = await cloudinary.uploader.upload(
      compressedImagePath
    );

    // Upload child images to Cloudinary
    const allImageUrls = [];
    const childImagesResults = await Promise.all(
      childImages.map(async (file) => {
        const compressImage = `uploads/compressed-${Date.now()}.jpg`; // Temporary path for child image
        await sharp(file.path)
          .resize(500) // Resize the image to a max width of 500px
          .toFormat("jpeg") // Convert to JPEG format
          .jpeg({ quality: 80 }) // Set JPEG quality to 80
          .toFile(compressImage); // Save to temporary path

        // Upload image to Cloudinary
        const result = await cloudinary.uploader.upload(compressImage);
        // Push the secure URL to the array
        allImageUrls.push(result.secure_url);
      })
    );

    // Store the uploaded image URLs in the postData
    const postData = {
      description: req.body.description,
      rent: req.body.rent,
      category: req.body.category,
      mainImage: mainImageResult.secure_url,
      childImages: allImageUrls.map((results) => results),
    };

    // Delete local images after uploading to Cloudinary
    try {
      fs.unlinkSync(mainImage[0].path); // Delete the main image
      childImages.forEach((file) => fs.unlinkSync(file.path)); // Delete child images
    } catch (err) {
      console.error("Error deleting local files:", err);
    }

    // Create a new room document
    const roomData = new roomModel({
      owner: req.body.id,
      description: req.body.description,
      price: req.body.price,
      facility: {
        family: req.body.family,
        group: req.body.group,
        single: req.body.single,
        double: req.body.double,
        Independent: req.body.independent,
        Non_Independent: req.body.nonIndependent,
        bikeParking: req.body.bikeParking,
        wifi: req.body.wifi,
        cooler: req.body.cooler,
        bed: req.body.bed,
        attachedWashroom: req.body.attachedWashroom,
        light: req.body.light,
        fan: req.body.fan,
      },
      mainImage: postData.mainImage,
      // Map child images dynamically to avoid errors if fewer than 6 images are uploaded
      childImg1: postData.childImages[0] || null,
      childImg2: postData.childImages[1] || null,
      childImg3: postData.childImages[2] || null,
      childImg4: postData.childImages[3] || null,
      childImg5: postData.childImages[4] || null,
      childImg6: postData.childImages[5] || null,
    });

    // Save the document to MongoDB using .save()
    await roomData
      .save()
      .then((data) => {
        const info = {
          status: "success",
        };
        res.send(info);
      })
      .catch((err) => {
        console.log(err);
      });
  } catch (error) {
    console.error("Error uploading images to Cloudinary:", error);
    return res
      .status(500)
      .json({ message: "Error uploading images to Cloudinary" });
  }
};

export { UploadProduct };
