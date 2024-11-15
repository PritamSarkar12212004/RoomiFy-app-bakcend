import cloudinary from "cloudinary";

// Cloudinary Configuration
cloudinary.config({
  cloud_name: process.env.CLOUDINARY_NAME, // Your Cloudinary cloud name
  api_key: process.env.API_KEY, // Your Cloudinary API key
  api_secret: process.env.API_SECRET, // Your Cloudinary API secret
});
