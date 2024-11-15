import roomModel from "../../models/Product/Room/room_model.js";
const ActionCommentController = async (req, res) => {
  try {
    await roomModel
      .findByIdAndUpdate(req.body.productID, {
        $push: {
          comments: {
            user: req.body.token,
            commentsItem: req.body.commentitem,
          },
        },
      })
      .then((data) => {
        console.log(data);
        res.status(200).json({
          message: "success",
        });
      })
      .catch((error) => {
        console.log(error);
      });
  } catch (error) {
    console.log(error);
  }
};
const ActionLikeController = async (req, res) => {
  try {
    const { token, productID } = req.body;

    // Validate input
    if (!token || !productID) {
      return res
        .status(400)
        .json({ message: "Token and Product ID are required." });
    }

    // Check if the user token exists in the likes array
    const room = await roomModel.findOne({ _id: productID, likes: token });

    if (room) {
      // If token exists, remove it
      await roomModel.findByIdAndUpdate(productID, {
        $pull: { likes: token },
      });

      return res.status(200).json({ message: "Like removed successfully." });
    } else {
      // If token does not exist, add it
      await roomModel.findByIdAndUpdate(productID, {
        $push: { likes: token },
      });

      return res.status(200).json({ message: "Like added successfully." });
    }
  } catch (error) {
    console.log(error);
  }
};

export { ActionCommentController, ActionLikeController };
