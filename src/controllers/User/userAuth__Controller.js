import userModel from "../../models/User/user.model.js";
import axios from "axios";
import bcrypt from "bcrypt";
const useSingUpController = async (req, res) => {
  try {
    const data = await req.body;
    console.log(data);
    const findData = await userModel.findOne({ phone: parseInt(data.phone) });
    if (findData) {
      const errorData = {
        status: "error",
        message: "User Created Successfully",
      };
      res.send(errorData);
    } else {
      const longitude = data.location.coords.longitude;
      const latitude = data.location.coords.latitude;
      const location = `https://api.geoapify.com/v1/geocode/reverse?lat=${latitude}&lon=${longitude}&apiKey=${process.env.MAP_API_KEY}`;

      var config = {
        method: "get",
        url: location,
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
        const response = (
          await userModel.create({
            username: data.username,
            password: data.password,
            phone: parseInt(data.phone),
            location: data.location,
            exact_location: exact_location,
            gender: data.gender,
          })
        )
          .save()
          .then((res) => {
            const data = {
              status: "success",
              message: "User Created Successfully",
              token: res._id,
            };
            sender(data);
          })
          .catch((err) => {
            console.log(err);
          });
        const sender = (data) => {
          res.send(data);
        };
      };
    }
  } catch (err) {
    console.log(err);
  }
};

const useLoginController = async (req, res) => {
  const { phone, password } = await req.body;
  try {
    const findData = await userModel.findOne({ phone:parseInt(phone) });
    if (!findData) {
      const errorData = {
        status: "error",
        message: "User not found Please SignUp",
      };
      res.send(errorData);
    } else {
      const isMatch = await bcrypt.compare(password, findData.password);
      if (!isMatch) {
        const errorData = {
          status: "error",
          message: "Password is incorrect",
        };
        res.send(errorData);
      } else {
        const data = {
          status: "success",
          message: "User Login Successfully",
          token: findData._id,
        };
        res.send(data);
      }
    }
    res.send(findData);
  } catch (error) {
    console.log(error);
  }
};
export { useSingUpController, useLoginController };
