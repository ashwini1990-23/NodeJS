import asyncHandler from "express-async-handler";
import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";
import dotenv from "dotenv";

import { User } from "../models/userModel.js";
import { Otp } from "../models/otpModel.js";
import { sendEmail } from "../config/sendEmail.js";

dotenv.config();
//@desc Register a user
//@route POST /api/users/register
//@access public
export const registerUser = asyncHandler(async (req, res) => {
  const { username, email, password } = req.body;
  if (!username || !email || !password) {
    res.status(400);
    throw new Error("All fields are mandatory");
  }
  const userExists = await User.findOne({ email });
  if (userExists) {
    res.status(400);
    throw new Error("User already registered");
  }

  // Hash Password
  const hashedPassword = await bcrypt.hash(password, 10);
  console.log(`Hashed password: `, hashedPassword);
  const user = await User.create({ username, email, password: hashedPassword });
  console.log(`User Created ${user}`);

  if (user) {
    res.status(201).json({ _id: user.id, email: user.email });
  } else {
    res.status(400);
    throw new Error("User data is not valid");
  }
  // res.json({ message: "Register the user" });
});

//@desc Login  user
//@route POST /api/users/login
//@access public
export const loginUser = asyncHandler(async (req, res) => {
  const { email, password } = req.body;
  if (!email || !password) {
    res.status(400);
    throw new Error("All fields are mandatory");
  }
  const user = await User.findOne({ email });
  // Compare password with hashedpassword
  if (user && (await bcrypt.compare(password, user.password))) {
    const accessToken = jwt.sign(
      {
        user: { username: user.username, email: user.email, id: user.id },
      },
      process.env.ACCESS_TOKEN_SECRET,
      { expiresIn: "1m" },
    );
    res.status(200).json({ accessToken });
  } else {
    res.status(401);
    throw new Error("Email or password is not valid");
  }
  // res.json({ message: "Login the user" });
});

//@desc Current user info
//@route GET /api/users/current
//@access private
export const currentUser = asyncHandler(async (req, res) => {
  res.json(req.user);
});

//@desc Forgot password
//@route GET /api/users/forgot-password
//@access private
export const handleForgotPassword = asyncHandler(async (req, res) => {
  console.log("Inside forgot password");
  const { email } = req.body;

  const user = await User.findOne({ email });
  if (!user) {
    res.status(400);
    throw new Error("User does not exist");
  }
  const otp = Math.floor(100000 + Math.random() * 999999); // 6 digit random otp
  console.log("OTP is:", otp);

  const newOtp = new Otp({ email, otp });
  await newOtp.save();

  const message = `Your verification code for password reset is: ${otp}`;
  await sendEmail(email, "Reset Password", message);

  res.status(200).json({ message: "OTP sent to your email" });
});

//@desc Verify OTp
//@route GET /api/users/verify-otp
//@access private
export const handleVerifyOtp = asyncHandler(async (req, res) => {
  const { email, otp } = req.body;

  const otpExists = await Otp.findOne({ email, otp });
  if (
    !otpExists ||
    Date.now() > otpExists.createdAt.getTime() + 60 * 60 * 1000
  ) {
    res.status(400);
    throw new Error("Invalid or expired OTP");
  }
  res.status(200).json({ message: "OTP verification successful" });
  // res.status(400);
  // throw new Error("Invalid credentials");
});

//@desc Reset password
//@route GET /api/users/reset-password
//@access private
export const handleResetPassword = asyncHandler(async (req, res) => {
  const { email, otp, newPassword } = req.body;

  const otpExists = await Otp.findOne({ email, otp });
  if (
    !otpExists ||
    Date.now() > otpExists.createdAt.getTime() + 60 * 60 * 1000
  ) {
    res.status(400);
    throw new Error("Invalid or expired OTP");
  }

  const user = await User.findOne({ email });
  if (!user) {
    res.status(404);
    throw new Error("User does not exist");
  }

  const salt = await bcrypt.genSalt(10);
  const hashedPassword = await bcrypt.hash(newPassword, salt);
  user.password = hashedPassword;
  await user.save();
  await Otp.deleteMany({ email });
  res.status(200).json({ message: "Password reset successfully" });
});
