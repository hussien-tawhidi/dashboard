import asyncHandler from "express-async-handler";
import User from "../models/userModel.js";
import jwt from "jsonwebtoken";
import bcrypt from "bcryptjs";

// *************register user
const registerUser = asyncHandler(async (req, res) => {
  const { name, email, password } = req.body;

  if (!name || !email || !password) {
    res.status(400);
    throw new Error("please fill all field");
  }

  // *************check if user is exist
  const userExist = await User.findOne({ email });
  if (userExist) {
    res.status(400);
    throw new Error("User already exists");
  }

  // hash the password
  const salt = await bcrypt.genSalt(10);
  const hashedPassword = await bcrypt.hash(password, salt);

  // create user
  const user = await User.create({
    name,
    email,
    password: hashedPassword,
  });

  if (user) {
    [
      res.status(201).json({
        _id: user._id,
        name: user.name,
        email: user.email,
        token: generateToken(user._id),
      }),
    ];
  } else {
    res.status(400);
    throw new Error("INvalid user");
  }
});

// ************login user
const loginUser = asyncHandler(async (req, res) => {
  const { email, password } = req.body;

  const user = await User.findOne({ email });

  // checkout user login password
  if (user && (await bcrypt.compare(password, user.password))) {
    res.json({
      _id: user.id,
      name: user.name,
      email: user.email,
      token: generateToken(user._id),
    });
  } else {
    res.status(400);
    throw new Error("INvalid email or password");
  }
});

// show user info by (token)
const getMe = asyncHandler(async (req, res) => {
  // when we user middleware (protect) we should access to use.id
  res.status(200).json(req.user);
});

// generate token
const generateToken = (id) => {
  return jwt.sign({ id }, process.env.TOKEN_SECRET, { expiresIn: "30d" });
};

export { registerUser, loginUser, getMe };
