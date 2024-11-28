import userModel from "../../models/User/user.model.js";
import roomModel from "../../models/Product/Room/room_model.js";
import axios from "axios";

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
    // Update the user's profile using their ID
    const updatedUser = await userModel.findByIdAndUpdate(req.body.id, {
      profilePicture: req.body.profileImageUrl,
    });
    return res.status(200).send(updatedUser);
  } catch (error) {
    console.error(error);
    return res.status(500).send("An error occurred while updating the profile");
  }
};
const nameUpdater = async (req, res) => {
  try {
    const updatedUser = await userModel
      .findByIdAndUpdate(req.body.id, {
        username: req.body.name,
      })
      .then((response) => {
        res.state(200).send(response);
      })
      .catch((error) => {
        res.status(500).send(error);
      });
  } catch (error) {
    console.log(error);
  }
};

const numberUpdater = async (req, res) => {
  const existingUser = await userModel.findOne({ phone: req.body.phone });
  try {
    if (existingUser) {
      console.log("userExist");
      return res.status(400).send("User already exists");
    }
    const updatedUser = await userModel.findByIdAndUpdate(req.body.id, {
      phone: req.body.phone,
    });
    return res.status(200).send(updatedUser);
  } catch (error) {
    console.log(error);
  }
};
const locationUpdater = async (req, res) => {
  const { location, id } = req.body;
  const longitude = location.coords.longitude;
  const latitude = location.coords.latitude;
  const locationApi = `https://api.geoapify.com/v1/geocode/reverse?lat=${latitude}&lon=${longitude}&apiKey=${process.env.MAP_API_KEY}`;
  var config = {
    method: "get",
    url: locationApi,
    headers: {},
  };

  axios(config)
    .then(function (response) {
      const exact_location = response.data.features[0].properties;
      dataSaver(exact_location);
    })
    .catch(function (error) {
      console.log(error);
    });
  const dataSaver = async (exact_location) => {
    await userModel
      .findByIdAndUpdate(id, {
        exact_location: exact_location,
      })
      .then((resss) => {
        const data = {
          status: "success",
          message: "User Created Successfully",
          token: resss._id,
        };
        res.send(data);
      })

      .catch((err) => {
        console.log(err);
        res.send(Error);
      });
  };
};

export {
  profileChekerController,
  profileUpdater,
  nameUpdater,
  numberUpdater,
  locationUpdater,
};
