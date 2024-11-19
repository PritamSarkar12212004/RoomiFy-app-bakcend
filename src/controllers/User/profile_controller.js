import userModel from "../../models/User/user.model.js";

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
  console.log(req.body.profileImageUrl);
  try {
    await userModel
      .findByIdAndUpdate(
        req.body.id,
        {
          username: req.body.name,
          phone: req.body.phone,
          location: req.body.location,
          profilePicture: req.body.profileImageUrl,
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
    console.error("Error UpDate :", error);
    res.status(500).send("Error UpDate");
  }
};

export { profileChekerController, profileUpdater };
