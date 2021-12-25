const Users = require("../models/users");
const jwt = require("jsonwebtoken");

const auth = async (req, res, next) => {
  try {
    const token = req.header("Authorization");
    if (!token) {
      return res.status(400).json({ msg: "You are not authorised" });
    }
    const decode = jwt.verify(token, process.env.ACCESS_TOKEN_SECRET);
    if (!decode) {
      return res.status(400).json({ msg: "You are not authorised" });
    }
    const user = await Users.findOne({ _id: decode.id });

    req.user = user;
    next();
  } catch (error) {
    res.status(500).json({ msg: error.message });
  }
};

module.exports = auth;
