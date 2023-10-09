require("dotenv").config();
const express = require("express");
const cors = require("cors");
const bodyParser = require("body-parser");
const sgMail = require("@easypost/api");
const app = express();

const port = process.port.ENV || 3000;

// Enable middleware for parsing JSON and handling CORS
app.use(express.static("public"));
app.use(express.json());
app.use(cors());
app.use(bodyParser.json());

const shipmentRoutes = require("./src/routes/shipmentRoutes");
const taxRoute = require("./src/routes/taxRoute");
const paymentRoute = require("./src/routes/paymentRoute");
const emailRoute = require("./src/routes/sendGridRoute");

app.get("/config", (req, res) => {
  res.send({ publishableKey: process.env.STRIPE_PUBLISHABLE_KEY });
});

app.use("/shipment", shipmentRoutes);

app.use("/salestax", taxRoute);

app.use("/create-payment-intent", paymentRoute);

app.use("/send-email", emailRoute);

app.listen(port, () => {
  console.log(`Example app listening on port ${port}`);
});
