const Event = require("../models/events");
const createEvent = async (req, res) => {
  try {
    console.log(req.body);
    const event = new Event(req.body);
    await event.save();
    res.status(201).json({ message: "Event created", result: event });
  } catch (error) {
    console.log(error);
    res.status(500).json({ message: "Internal servor error" });
  }
};

const eventList = async (req, res) => {
  try {
    const events = await Event.find();
    res.status(200).json({ message: "Data found", results: events });
  } catch (error) {
    console.log(error);
    res.status(500).json({ message: "Internal servor error" });
  }
};

module.exports = { createEvent, eventList };
