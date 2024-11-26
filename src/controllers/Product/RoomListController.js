import roomModel from "../../models/Product/Room/room_model.js";
const RoomListController = async (req, res) => {
  const roomData = await roomModel
    .find({ postCondition: true })
    .populate({
      path: "owner",
      select: "username profilePicture  ",
    })
    .sort({ createdAt: 1 })
    .select(
      " mainImage createdAt _id comments likes price  location postTitle"
    );
  res.send(roomData);
};

const viewRoomController = async (req, res) => {
  const id = req.body;
  const mainid = Object.keys(id);
  const roomData = await roomModel
    .findById(mainid)
    .populate({
      path: "owner",
      select: "username profilePicture phone gender exact_location.city exact_location.village",
    })
    .sort({ createdAt: 1 });
  if (!roomData) {
    return res.status(404).send("Room Not Found");
  }
  res.status(200).send(roomData);
};
export { RoomListController, viewRoomController };
