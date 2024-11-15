import mongoose from "mongoose";
import "dotenv/config";
const DataBase = async () => {
  try {
    const connect = await mongoose.connect(
      "mongodb+srv://pritam7796419792:PritamSarkar%402004@roomify.uwsnu.mongodb.net/?retryWrites=true&w=majority&appName=RoomiFy"
    );
    console.log("Database is connected");
  } catch (error) {
    console.log(error);
  }
};
export default DataBase;
