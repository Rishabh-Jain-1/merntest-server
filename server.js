require("dotenv").config();
const express = require("express");
const mongoose = require("mongoose");
const cors = require("cors");
require("./utils/mongoDBConnection");
const app = express();
app.use(express.json());
app.use(cors());

app.use("/api", require("./routers/authRouter"));
app.use("/api", require("./routers/eventRouter"));

app.listen(process.env.PORT || 3006, () => {
  console.log("running");
});
