import roomModel from "../../models/Product/Room/room_model.js";
const RoomListController = async (req, res) => {
  const roomData = await roomModel
    .find()
    .populate({
      path: "owner",
      select: "username profilePicture  exact_location ",
    })
    .sort({ createdAt: 1 })
    .select(" mainImage createdAt _id comments likes price ");
  res.send(roomData);
};

const viewRoomController = async (req, res) => {
  const id = req.body;
  const mainid = Object.keys(id);
  const roomData = await roomModel
    .findById(mainid)
    .populate({
      path: "owner",
      select:
        "username profilePicture phone exact_location.lon exact_location.lat   exact_location.city exact_location.state exact_location.village exact_location.state_district  ",
    })
    .sort({ createdAt: 1 });
  if (!roomData) {
    return res.status(404).send("Room Not Found");
  }
  console.log(roomData);
  res.status(200).send(roomData);
};
export { RoomListController, viewRoomController };
