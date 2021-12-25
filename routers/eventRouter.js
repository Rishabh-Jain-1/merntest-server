const router = require("express").Router();
const { createEvent, eventList } = require("../controllers/eventController");
router.post("/event/create", createEvent);
router.get("/event/list", eventList);

module.exports = router;
