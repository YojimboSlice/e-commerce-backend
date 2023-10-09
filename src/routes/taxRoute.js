const express = require("express");
const router = express.Router();
const { tax } = require("../controllers/taxController");

router.post("/", tax);

module.exports = router;
