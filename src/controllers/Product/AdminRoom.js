import roomModel from "../../models/Product/Room/room_model.js";
const AdminRoomController = async (req, res) => {
  const token = req.body.token;
  const data = await roomModel.find({ owner: token });
  if (!data) {
    const info = {
      status: 404,
      item: null,
    };
    res.send(info);
  } else {
    const info = {
      ststus: 200,
      item: data,
    };
    res.send(info);
  }
};
const DeleteRoomController = async (req, res) => {
  try {
    await roomModel.findByIdAndDelete(req.body.id);

    res.status(200).json({
      message: "Room deleted successfully",
    });
  } catch (error) {
    console.log(error);
  }
};
export { AdminRoomController, DeleteRoomController };
