require("dotenv").config();
const express = require("express");
const router = express.Router();

const nodemailer = require("nodemailer");
const jwt = require("jsonwebtoken");
const crypto = require("crypto");
const bcrypt = require("bcrypt");

const User = require("../models/user");
const Token = require("../models/token");

// user register
router.post("/register", async (req, res) => {
  try {
    // Check if the email is already registered
    const existingUser = await User.findOne({ email: req.body.email });
    if (existingUser) {
      return res.status(400).json({ message: "Email already registered" });
    }

    // Hash the password
    const hashedPassword = await bcrypt.hash(req.body.password, 10);

    // Create a new user
    const user = new User({
      firstName: req.body.firstName,
      lastName: req.body.lastName,
      email: req.body.email,
      password: hashedPassword,
    });

    // Save the user to the database
    await user.save();

    // Generate a verification token
    const jwtSecretKey = crypto.randomBytes(32).toString("hex");
    const token = jwt.sign({ userId: user._id }, jwtSecretKey, {
      expiresIn: "1d",
    });

    // Send a verification email
    const transporter = nodemailer.createTransport({
      host: process.env.HOST,
      service: process.env.SERVICE,
      port: Number(process.env.EMAIL_PORT),
      secure: Boolean(process.env.SECURE),
      auth: {
        user: process.env.USER,
        pass: process.env.PASS,
      },
    });

    const verificationLink = `${process.env.BASE_URL}/${user.id}/verify/${token}`;

    await transporter.sendMail({
      from: process.env.USER,
      to: user.email,
      subject: "Email Verification",
      html: `Click <a href="${verificationLink}">here</a> to verify your email.`,
    });

    res
      .status(201)
      .json({ message: "User registered. Check your email for verification." });

  } 
  catch (error) {
    console.error(error);
    res.status(500).json({ message: "Internal server error" });
  }
});

// email verify
router.get("/:id/verify/:token/", async (req, res) => {
  try {
    // Find the user with user id
    const user = await User.findOne({ _id: req.params.id });

    if (user) {
      // Update the user to mark as verified
      await User.updateOne({ _id: user._id, verified: true });

      res.json({ message: "Email verification successful." });
    } 
    else {
      res.json({ message: "User not found." }); 
    }
  }
  catch (error) {
    console.error(error);
    res.status(500).json({ message: "Internal server error" });
  }
});

module.exports = router;
