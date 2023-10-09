const { verifyAddress, shipment } = require("../services/easypostService");
const stripe = require("stripe")(process.env.STRIPE_SECRET_KEY);

const verifyAndCreateShipmentMiddleware = async (req, res, next) => {
  try {
    const { fromAddress, toAddress, parcel, paymentToken } = req.body;

    // Verify Addresses using EasyPost
    await verifyAddress(fromAddress);
    await verifyAddress(toAddress);

    // Create Shipment using EasyPost
    const newShipment = await shipment(fromAddress, toAddress, parcel);
    req.shipment = newShipment;

    // Perform payment processing using Stripe
    const charge = await stripe.charges.create({
      amount: calculateTotalAmount(parcel),
      currency: "usd",
      source: paymentToken,
      description: "Payment for shipment",
    });
    req.charge = charge;

    next();
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: "An error occurred" });
  }
};

module.exports = { verifyAndCreateShipmentMiddleware };
