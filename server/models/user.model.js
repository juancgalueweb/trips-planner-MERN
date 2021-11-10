const uniqueValidator = require("mongoose-unique-validator");
const bcrypt = require("bcrypt");
const { Schema, model } = require("mongoose");

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
      validate: {
        validator: (val) => /^([\w-\.]+@([\w-]+\.)+[\w-]+)?$/.test(val),
        message: "Please enter a valid email",
      },
    },
    password: {
      type: String,
      required: [true, "The password is a must"],
      minlength: [6, "6 characters min"],
    },
  },
  { timestamps: true }
);

UserSchema.pre("save", function (next) {
  if (!this.isModified("password")) {
    return next();
  }
  bcrypt.hash(this.password, 10, (err, passwordHash) => {
    if (err) {
      return next(err);
    }
    this.password = passwordHash;
    next();
  });
});

//Apply the uniqueValidator plugin to UserSchema
UserSchema.plugin(uniqueValidator, { message: "{PATH} debe ser único" });

//Converting the schemas into models
const UserModel = model("User model", UserSchema);
module.exports = UserModel;
