import roomModel from "../../models/Product/Room/room_model.js";

const searchMain = async (req, res) => {
  try {
    const data = req.body.input;

    // Validate input
    if (!data) {
      console.log("No data provided in the request.");
      return res.status(400).json({ message: "Input data is required" });
    }

    console.log("Search input received:", data);

    // Perform search query
    const search = await roomModel
      .find({
        $or: [
          { postTitle: { $regex: data, $options: "i" } }, // Case-insensitive search
          { "location.city": { $regex: data, $options: "i" } }, // Case-insensitive search
          { "location.village": { $regex: data, $options: "i" } }, // Case-insensitive search
          { "location.district": { $regex: data, $options: "i" } }, // Case-insensitive search
          { "location.state": { $regex: data, $options: "i" } }, // Case-insensitive search
          { "location.formatted": { $regex: data, $options: "i" } }, // Case-insensitive search
          { "location.postcode": { $regex: data, $options: "i" } }, // Case-insensitive search
        ],
      })
      .select("postTitle owner mainImage _id location price");

    if (search.length === 0) {
      console.log("No results found for the input:", data);
      return res.status(404).json({ message: "No results found" });
    }

    console.log("Search results:", search);
    return res.send(search);
  } catch (error) {
    console.error("Error during search:", error);
    return res.status(500).json({ message: "Internal Server Error", error });
  }
};
const searchFilter = async (req, res) => {
  const data = await roomModel
    .find({
      price: { $lte: req.body.price },
    })
    .then((results) => {
      if (results.length === 0) {
        return res.status(404).json({ message: "No results found" });
      }
      res.status(200).json(results);
    })
    .catch((err) => {
      console.log(err);
      res.status(404).json({ error: "Internal Server Error" });
    });
};
const searchNearby = async (req, res) => {
  try {
    const longitude = req.body.location.coords.longitude;
    const latitude = req.body.location.coords.latitude;

    // Perform the geospatial query
    const data = await roomModel
      .find({
        location: {
          $near: {
            $geometry: {
              type: "Point", // GeoJSON type
              coordinates: [longitude, latitude], // Coordinates in [longitude, latitude] format
            },
            $maxDistance: 5000, // Distance in meters (adjust according to your needs)
          },
        },
      })
      .then((results) => {
        if (results.length === 0) {
          return res.status(404).json({ message: "No results found" });
        }
        res.status(200).json(results);
        console.log(results)
      })
      .catch((err) => {
        console.log(err);
        res.status(404).json({ error: "Internal Server Error" });
      });
  } catch (err) {
    console.log(err);
    res
      .status(500)
      .json({ message: "Error fetching nearby rooms", error: err.message });
  }
};

export { searchMain, searchFilter, searchNearby };
