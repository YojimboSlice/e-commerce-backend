const { verifyAddress, shipment } = require("../services/easypostService");

const createShipment = async (req, res) => {
  try {
    res.setHeader("Access-Control-Allow-Origin", "*");
    res.setHeader("Access-Control-Allow-Headers", "Content-Type");

    const { fromAddress, toAddress, parcel } = req.body;

    await verifyAddress(fromAddress);
    await verifyAddress(toAddress);
    const newShipment = await shipment(fromAddress, toAddress, parcel);
    res.json(newShipment);
  } catch (error) {
    console.error(error);
  }
};

module.exports = { createShipment };
