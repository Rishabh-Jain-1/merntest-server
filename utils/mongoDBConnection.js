const mongoose = require("mongoose");
const connect = () => {
  mongoose.connect(process.env.MONGODB_URI, {}, (err) => {
    if (err) throw err;
    console.log("Database Connected!!");
  });
};

connect();
