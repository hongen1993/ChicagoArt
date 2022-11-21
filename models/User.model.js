const { Schema, model } = require("mongoose");
const { ENUM_ROLES, USER } = require('../const/user.const');

const userSchema = new Schema(
  {
    username: {
      type: String,
      required: false,
      unique: true,
      trim: true,
    },
    email: {
      type: String,
      required: true,
      unique: true,
      trim: true,
      lowercase: true,
    },
    imageUrl: String,
    password: {
      type: String,
      required: true,
    },
    interests: {
      type: String
    },
    role: {
      type: String,
      enum: ENUM_ROLES,
      trim: true,
      default: USER
    }
  },
  {
    timestamps: true,
    versionKey: false
  }
);

const UserModel = model("User", userSchema);

module.exports = UserModel;
