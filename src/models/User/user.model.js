import mongoose from "mongoose";
const Schema = mongoose.Schema;
import bcrypt from "bcrypt";

const userSchema = new Schema({
  username: {
    type: String,
    required: true,
    trim: true,
    min: 3,
    max: 20,
  },
  password: {
    type: String,
    min: 5,
    max: 40,
    require: true,
  },
  phone: {
    type: Number,
    required: true,
    unique: true,
  },

  location: {
    type: Object,
    required: true,
    trim: true,
  },

  exact_location: {
    type: Object,
    require: true,
  },

  profilePicture: {
    type: String,
    default:
      "https://i.pinimg.com/564x/d2/98/4e/d2984ec4b65a8568eab3dc2b640fc58e.jpg",
  },
  gender: {
    type: String,
    emun: ["male", "female"],
    required: true,
    trim: true,
  },

  createdAt: {
    type: Date,
    default: Date.now,
  },
});

userSchema.pre("save", async function (next) {
  const user = this;
  if (!user.isModified("password")) return next();

  try {
    const salt = await bcrypt.genSalt(10);
    user.password = await bcrypt.hash(user.password, salt);

    next();
  } catch (error) {
    next(error);
  }
});

const User = mongoose.model("User", userSchema);
export default User;
