const Users = require("../models/users");
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");
const authCtrl = {
  home: (req, res) => {
    res.status(200).json({ message: "HOME API" });
  },

  register: async (req, res) => {
    //console.log("body", req.body)
    try {
      const { fullname, username, email, password, gender } = req.body;

      let newUserName = username.toLowerCase().replace(/ /g, "");

      const user_name = await Users.findOne({ username: newUserName });
      if (user_name) {
        return res
          .status(400)
          .json({ message: "This username is already taken." });
      }

      const user_email = await Users.findOne({ email });
      if (user_email) {
        return res
          .status(400)
          .json({ message: "This email is already registered." });
      }

      if (password.length < 6) {
        return res
          .status(400)
          .json({ message: "Password must be at least 6 characters long." });
      }

      const passwordHash = await bcrypt.hash(password, 12);

      const newUser = new Users({
        fullname,
        username: newUserName,
        email,
        password: passwordHash,
        gender,
      });

      //console.log(newUser)

      const access_token = createAccessToken({ id: newUser._id });
      await newUser.save();
      res.status(201).json({
        message: "Registered Successfully",
        token: access_token,
        user: {
          ...newUser._doc,
          password: "",
        },
      });
    } catch (error) {
      res.status(500).json({ message: error.message });
    }
  },

  login: async (req, res) => {
    try {
      const { email, password } = req.body;
      const user = await Users.findOne({ email });
      if (!user) {
        return res
          .status(400)
          .json({ message: "Email or Password is incorrect." });
      }

      const isMatch = await bcrypt.compare(password, user.password);
      if (!isMatch) {
        return res
          .status(400)
          .json({ message: "Email or Password is incorrect." });
      }

      const access_token = createAccessToken({ id: user._id });
      res.json({
        message: "Logged in  Successfully!",
        access_token,
        user: {
          ...user._doc,
          password: "",
        },
      });
    } catch (error) {
      res.status(500).json({ message: error.message });
    }
  },

  userInfo: async (req, res) => {
    try {
      const user = await Users.findOne({ _id: req.user._id });
      res.status(200).json({ results: user });
    } catch (error) {
      res.status(500).json({ message: error.message });
    }
  },
};

const createAccessToken = (payload) => {
  return jwt.sign(payload, process.env.ACCESS_TOKEN_SECRET);
};

module.exports = authCtrl;
