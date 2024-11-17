import userModel from "../../models/User/user.model.js";
import cloudinary from "cloudinary";
import fs from "fs"; // Import fs to delete the local file
import sharp from "sharp";

const profileChekerController = async (req, res) => {
  const data = await req.body;
  const id = Object.keys(data)[0];
  try {
    await userModel
      .findById(id)
      .then((data) => {
        const info = {
          name: data.username,
          phone: data.phone,
          state: data.exact_location.state,
          city: data.exact_location.city,
          village: data.exact_location.village,
          gender: data.gender,
          profile: data.profilePicture,
          id: data._id,
        };
        const auth = {
          status: "success",
          message: "user found",
          data: info,
        };
        res.send(auth);
      })
      .catch((err) => {
        res.send(err);
      });
  } catch (error) {}
};

const profileUpdater = async (req, res) => {
  const { file } = req; // multer will attach the file to req.file
  console.log(file);
  if (!file) {
    return res.status(400).send("No file uploaded");
  }

  try {
    // Compress the image using Sharp before uploading
    const compressedImagePath = `uploads-${Date.now()}.jpg`; // Temporary path for the compressed image
    // Compress the image using Sharp (resize to a smaller size, e.g., 500px max width)
    await sharp(file.path)
      .resize(500) // Resize the image to a max width of 500px
      .toFormat("jpeg") // Convert to JPEG format (you can adjust this based on your needs)
      .jpeg({ quality: 80 }) // Set JPEG quality to 80 (you can adjust this for compression)
      .toFile(compressedImagePath); // Save the compr essed image

    // Upload the image to Cloudinary
    const result = await cloudinary.v2.uploader.upload(compressedImagePath, {
      folder: "profile_images", // Optional: Define a folder name in Cloudinary
    });

    // Cloudinary returns an object with image details
    const profileImageUrl = result.secure_url; // URL of the uploaded image

    // Delete the local file from the server (the one uploaded by multer)
    fs.unlink(req.file.path, (err) => {
      if (err) {
        console.error("Error deleting local file:", err);
      } else {
        console.log("Local file deleted successfully.");
      }
    });
    fs.unlink(compressedImagePath, (err) => {
      if (err) {
        console.error("Error deleting local file:", err);
      } else {
        console.log("Local file deleted successfully.");
      }
    });

    // Respond with the Cloudinary image URL

    await userModel
      .findByIdAndUpdate(
        req.body.id,
        {
          username: req.body.name,
          phone: req.body.phone,
          location: req.bodylocation,
          profilePicture: profileImageUrl,
        },
        { new: true } // Option to return the updated document
      )
      .then((response) => {
        res.send(response);
      })
      .catch((error) => {
        console.log(error);
      });
  } catch (error) {
    console.error("Error uploading to Cloudinary:", error);
    res.status(500).send("Error uploading image to Cloudinary");
  }
};

export { profileChekerController, profileUpdater };
