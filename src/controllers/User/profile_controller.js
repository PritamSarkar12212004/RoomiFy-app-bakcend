import userModel from "../../models/User/user.model.js";
import cloudinary from "cloudinary";
import fs from "fs"; // Import fs to delete the local file

const profileChekerController = async (req, res) => {
  const data = await req.body;
  const id = Object.keys(data)[0];
  try {
    await userModel
      .findById(id)
      .then((data) => {
        const info = {
          name: data.username,
          email: data.email,
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

  if (!file) {
    return res.status(400).send("No file uploaded");
  }

  try {
    // Upload the image to Cloudinary
    const result = await cloudinary.v2.uploader.upload(file.path, {
      folder: "profile_images", // Optional: Define a folder name in Cloudinary
    });

    // Cloudinary returns an object with image details
    const profileImageUrl = result.secure_url; // URL of the uploaded image

    // Delete the local file from the server (the one uploaded by multer)
    fs.unlink(file.path, (err) => {
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
          email: req.body.email,
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
