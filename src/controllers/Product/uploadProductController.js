import axios from "axios";
import roomModel from "../../models/Product/Room/room_model.js";

const UploadProduct = async (req, res) => {
  try {
    // Extract data from the request body
    const {
      id,
      description,
      postTitle,
      price,
      family,
      location,
      group,
      single,
      double,
      independent,
      nonIndependent,
      bikeParking,
      wifi,
      cooler,
      bed,
      attachedWashroom,
      light,
      fan,
      mainImage,
      childImg1,
      childImg2,
      childImg3,
      childImg4,
      childImg5,
      childImg6,
    } = req.body;

    const longitude = location.coords.longitude;
    const latitude = location.coords.latitude;
    const locationData = `https://api.geoapify.com/v1/geocode/reverse?lat=${latitude}&lon=${longitude}&apiKey=${process.env.MAP_API_KEY}`;

    // Get the location data
    const locationResponse = await axios.get(locationData);
    const exact_location = locationResponse.data.features[0].properties;
    console.log(exact_location);

    // Now save the room data after fetching the location
    const roomData = new roomModel({
      owner: id,
      description,
      postTitle,
      location: {
        coordinates: [exact_location.lon, exact_location.lat],
        address_line1: exact_location.address_line1,
        address_line2: exact_location.address_line2,
        city: exact_location.city,
        state: exact_location.state,
        country: exact_location.country,
        postalCode: exact_location.postcode,
        village: exact_location.village,
        lon: exact_location.lon,
        lat: exact_location.lat,
        result_type: exact_location.result_type,
      },
      price,
      facility: {
        family,
        group,
        single,
        double,
        Independent: independent,
        Non_Independent: nonIndependent,
        bikeParking,
        wifi,
        cooler,
        bed,
        addtachedWashroom: attachedWashroom,
        light,
        fan,
      },
      mainImage,
      childImg1,
      childImg2,
      childImg3,
      childImg4,
      childImg5,
      childImg6,
    });

    // Save the document to MongoDB
    await roomData.save();

    // Send success response
    res.status(201).json({
      status: "success",
      message: "Room product uploaded successfully",
    });
  } catch (err) {
    console.error(err);
    res.status(500).json({
      status: "error",
      message: "Error uploading room product",
    });
  }
};

export { UploadProduct };
