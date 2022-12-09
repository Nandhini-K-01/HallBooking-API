const express = require("express");
const router = express.Router();
const models = require("./models");

router.get("/roombookeddata", models.allRoomsBookedData);
router.post("/createroom", models.createRoom);
router.get("/customerdata", models.customersData);
router.post("/roombooking", models.roomBooking);

module.exports = router;