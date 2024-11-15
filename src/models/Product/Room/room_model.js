import mongoose from "mongoose";
const roomSchema = new mongoose.Schema(
  {
    mainImage: {
      type: String,
      required: true,
    },
    childImg1: {
      type: String,
      required: true,
    },
    childImg2: {
      type: String,
      required: true,
    },
    childImg3: {
      type: String,
      required: true,
    },
    childImg4: {
      type: String,
      required: true,
    },
    childImg5: {
      type: String,
      required: true,
    },
    childImg6: {
      type: String,
      required: true,
    },
    owner: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
      required: true,
    },
    description: {
      type: String,
      required: true,
    },
    price: {
      type: Number,
      required: true,
    },

    facility: {
      single: {
        type: Boolean,
        default: false,
      },
      group: {
        type: Boolean,
        default: false,
      },
      family: {
        type: Boolean,
        default: false,
      },
      double: {
        type: Boolean,
        default: false,
      },

      Independent: {
        type: Boolean,
        default: false,
      },

      Non_Independent: {
        type: Boolean,
        default: false,
      },

      bikeParking: {
        type: Boolean,
        default: false,
      },
      wifi: {
        type: Boolean,
        default: false,
      },
      light: {
        type: Boolean,
        default: false,
      },
      fan: {
        type: Boolean,
        default: false,
      },
      cooler: {
        type: Boolean,
        default: false,
      },

      bed: {
        type: Boolean,
        default: false,
      },
      addtachedWashroom: {
        type: Boolean,
        default: false,
      },
    },
    taps: {
      type: Number,
    },

    reviews: [
      {
        user: {
          type: mongoose.Schema.Types.ObjectId,
          ref: "User",
        },
        rating: {
          type: Number,
          min: 1,
          max: 5,
        },
        comment: String,
        createdAt: {
          type: Date,
          default: Date.now,
        },
      },
    ],
    createdAt: {
      type: Date,
      default: Date.now,
    },
  },
  {
    timestamps: true,
  }
);

const Room = mongoose.model("Room", roomSchema);
export default Room;
