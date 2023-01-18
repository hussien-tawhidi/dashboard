import mongoose from "mongoose";

const userSchema = new mongoose.Schema({
  name: {
    type: String,
    required: [true, "please enter your name"],
  },
  email: {
    type: String,
    required: [true, "please enter your emai"],
    unique: true,
  },
  password: {
    type: String,
    required: [true, "please enter your password"],
  },
}, { timestamps: true });

const User = mongoose.model("User", userSchema)

export default User
