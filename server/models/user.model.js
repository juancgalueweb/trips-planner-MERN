const mongoose = require("mongoose");
const uniqueValidator = require("mongoose-unique-validator");
const { Schema, model } = mongoose;

const UserSchema = new Schema(
  {
    fullName: {
      type: String,
      required: [true, "The user requires a name"],
      minlength: [5, "5 characters min"],
    },
    email: {
      type: String,
      required: [true, "The user requires an email"],
      unique: [true, "Email already exists in the database"],
    },
    password: {
      type: String,
      required: [true, "The password is a must"],
      minlength: [6, "6 characters min"],
    },
  },
  { timestamps: true }
);

//Apply the uniqueValidator plugin to UserSchema
UserSchema.plugin(uniqueValidator, { message: "{PATH} debe ser único" });

//Converting the schemas into models
const UserModel = model("User model", UserSchema);
module.exports = UserModel;
