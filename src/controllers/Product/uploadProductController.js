import roomModel from "../../models/Product/Room/room_model.js";

const UploadProduct = async (req, res) => {
  try {
    // Extract data from the request body
    const {
      id,
      description,
      price,
      family,
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

    // Create a new room document
    const roomData = new roomModel({
      owner: id,
      description,
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
