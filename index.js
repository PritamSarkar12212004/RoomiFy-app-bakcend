import express from "express";
import "dotenv/config";
import cors from "cors";
import DataBase from "./src/database/MongoDB_DataBase.js";
import AuthUserRoute from "./src/routes/User/auth_Route.js";
import ProfileRoute from "./src/routes/User/profile_Route.js";
import uploadProductRoute from "./src/routes/Product/upload_Prodyuct.js";
import RommProductList from "./src/routes/Product/RoomPeroduct_list.js";

const app = express();


app.use(cors());
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

app.use("/", AuthUserRoute);
app.use("/user", ProfileRoute);
app.use("/upload", uploadProductRoute);
app.use("/list", RommProductList);
app.post("*", (req, res) => {
  res.status(404).json({
    message: "Page not found",
  });
});
app.get("*", (req, res) => {
  res.status(404).json({
    message: "Page not found",
  });
});

DataBase()
  .then(() => {
    app.listen(process.env.PORT, () => {
      console.log("Server start at  port 3000");
    });
  })
  .catch((err) => {
    console.log(err);
  });
