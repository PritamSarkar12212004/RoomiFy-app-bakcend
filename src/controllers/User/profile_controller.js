import userModel from "../../models/User/user.model.js";
import roomModel from "../../models/Product/Room/room_model.js";

const profileChekerController = async (req, res) => {
  const data = await req.body;
  const id = Object.keys(data)[0];
  try {
    const userData = await userModel.findById(id);

    const roomData = await roomModel
      .find({ owner: userData._id })
      .select("owner");
    const info = {
      name: userData.username,
      phone: userData.phone,
      state: userData.exact_location.state,
      city: userData.exact_location.city,
      village: userData.exact_location.village,
      gender: userData.gender,
      profile: userData.profilePicture,
      id: userData._id,
      roomData: roomData.length,
    };
    const auth = {
      status: "success",
      message: "user found",
      data: info,
    };
    res.send(auth);
  } catch (error) {}
};

const profileUpdater = async (req, res) => {
  try {
    // Check if a user with the provided phone number already exists
    const existingUser = await userModel.findOne({ phone: req.body.phone });

    if (existingUser) {
      console.log("userExist");
      return res.status(400).send("User already exists");
    }

    // Update the user's profile using their ID
    const updatedUser = await userModel.findByIdAndUpdate(req.body.id, {
      username: req.body.name,
      phone: req.body.phone,
      location: req.body.location,
      profilePicture: req.body.profileImageUrl,
    });
    return res.status(200).send(updatedUser);
  } catch (error) {
    console.error(error);
    return res.status(500).send("An error occurred while updating the profile");
  }
};

export { profileChekerController, profileUpdater };
