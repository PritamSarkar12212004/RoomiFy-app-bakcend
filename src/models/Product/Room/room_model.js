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
    postTitle: {
      type: String,
      required: true,
    },
    price: {
      type: Number,
      required: true,
    },
    postCondition: {
      type: Boolean,
      default: true,
    },
    location: {
      type: { type: String, default: "Point" }, // "Point" as the GeoJSON type
      coordinates: { type: [Number], required: true }, // [longitude, latitude]
      country: String,
      country_code: String,
      state: String,
      state_district: String,
      city: String,
      postcode: String,
      formatted: String,
      address_line1: String,
      address_line2: String,
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

    comments: [
      {
        user: {
          type: mongoose.Schema.Types.ObjectId,
          ref: "User",
        },
        commentsItem: {
          type: String,
        },
        createdAt: {
          type: Date,
          default: Date.now,
        },
      },
    ],
    likes: {
      type: Array,
    },

    createdAt: {
      type: Date,
      default: Date.now,
    },
  },
  {
    timestamps: true,
  }
);
roomSchema.index({ location: "2dsphere" });

const Room = mongoose.model("Room", roomSchema);
export default Room;
