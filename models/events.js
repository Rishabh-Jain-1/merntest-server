const mongoose = require("mongoose");

const eventSchema = new mongoose.Schema({
  name: {
    type: String,
    required: true,
  },
  description: {
    type: String,
    required: true,
  },
  startDate: {
    type: Date,
    //required: true,
  },
  endDate: {
    type: Date,
    //required: true,
  },
  organiser: {
    type: String,
    required: true,
  },
  tickets: [],
});
module.exports = mongoose.model("event", eventSchema);
