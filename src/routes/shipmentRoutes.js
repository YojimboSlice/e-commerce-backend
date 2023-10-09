const express = require("express");
const router = express.Router();
const { createShipment } = require("../controllers/shipmentController");

router.post("/", createShipment);

module.exports = router;
