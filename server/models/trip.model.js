const mongoose = require("mongoose");
const { Schema, model } = mongoose;

const TripsSchema = new Schema(
  {
    author: {
      type: Schema.Types.ObjectId,
      ref: "UserModel",
      required: [true, "User is required"],
    },
    location: {
      type: String,
      required: [true, "The trip needs a location"],
      minlength: [3, "3 characters min"],
    },
    date: {
      type: Date,
      required: [true, "The trip needs a date"],
    },
    people: {
      type: Array,
      default: [],
    },
    status: {
      type: String,
      default: "Pendiente",
    },
  },
  { timestamps: true }
);

//Converting the schema into model
const TripModel = model("Trip model", TripsSchema);
module.exports = TripModel;
