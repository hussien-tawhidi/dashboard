import jwt from "jsonwebtoken";
import asyncHandler from "express-async-handler";
import User from "../models/userModel.js";

const protect = asyncHandler(async (req, res, next) => {
  let token;

  if (
    req.headers.authorization &&
    req.headers.authorization.startsWith("Bearer")
  ) {
    try {
      //   get token from header
      token = req.headers.authorization.split(" ")[1];

      //   verify token
      const decode = jwt.verify(token, process.env.TOKEN_SECRET);

      // get user from token
      req.user = await User.findById(decode.id).select("-password");

      next();
    } catch (err) {
      console.log(err);
      res.status(401);
      throw new Error("Not authorized");
    }
  }
  if (!token) {
    res.status(401);
    throw new Error("Not token");
  }
});

export default protect;
