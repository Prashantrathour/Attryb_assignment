const express = require("express");
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");
const { userModel } = require("../models/user.model");

require("dotenv").config();
const userRouter = express.Router();

userRouter.post("/register", async (req, res) => {
  const { firstName, lastName, email, password } = req.body;
  if (!firstName||!lastName||!email || !password) {
    return res
      .status(400)
      .json({ msg: `Please enter ${!firstName ? "firstName" : !lastName ? "lastName" :!email?"email":!password? "password":"Something going wrong Please refresh"}`});
  }
  try {
    let userExist = await userModel.findOne({ email });
    if (userExist) {
      return res.status(409).json({
        msg: "Email already exists, please login or signup with another email",
        state: true,
      });
    }

    if (!/^[a-zA-Z ]*$/.test(firstName)) {
      return res.status(400).json({ msg: "Invalid First Name!" });
    } else if (!/^[a-zA-Z ]*$/.test(lastName)) {
      return res.status(400).json({ msg: "Invalid Last Name!" });
    } else if (!/^[\w-\.]+@([\w-]+\.)+[\w-]{2,4}$/.test(email)) {
      return res.status(400).json({ msg: "Invalid emailId!" });
    } else if (
      !/^(?=.*\d)(?=.*[a-z])(?=.*[A-Z])(?=.*[^a-zA-Z0-9])(?!.*\s).{8,15}$/.test(
        password
      )
    ) {
      return res.status(400).json({
        msg:
          "Password should contain at least one lowercase letter, one uppercase letter, one numeric digit, and one special character and minimum length should be 8!",
      });
    }

    const hash = await bcrypt.hash(password, 5);
    const user = new userModel({
      firstName,
      lastName,
      email,
      password: hash,
    });
    await user.save();
    res.json({ msg: "New user registered" });
  } catch (err) {
    console.log(err);
    res.status(500).json({ error: "Internal server error" });
  }
});

userRouter.post("/login", async (req, res) => {
  const { email, password } = req.body;

  if (!email || !password) {
    return res
      .status(400)
      .json({ msg: `Please enter ${!email ? "email" : "password"}` });
  }

  try {
    const user = await userModel.findOne({ email });
    if (!user) {
      return res
        .status(404)
        .json({ msg: "User does not exist. Please register first", newUser: true });
    }

    bcrypt.compare(password, user.password, (err, result) => {
      if (err) {
        return res.status(500).json({ msg: "Internal server error" });
      }

      if (result) {
        const token = jwt.sign(
          { userID: user._id, user: user.firstName },
          process.env.SECRATE_KEY
        );
        res.cookie("token", token, { httpOnly: true });
        res.json({ msg: "Logged In!", token, user: user.firstName });
        // console.log(res)
      } else {
        res.status(401).json({ msg: "Wrong Credentials" });
      }
    });
  } catch (err) {
    console.log(err)
    res.status(500).json({ msg: "Internal server error Please check Connection or Refresh" });
  }
});

module.exports = {
  userRouter,
};
