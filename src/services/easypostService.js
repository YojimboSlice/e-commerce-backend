require("dotenv").config();

const EasyPost = require("@easypost/api");
const client = new EasyPost(process.env.EP_TEST_KEY);

const verifyAddress = async address => {
  try {
    await client.Address.createAndVerify(address);
  } catch (error) {
    console.error(error);
  }
};

const shipment = async (fromAddress, toAddress, parcel) => {
  try {
    const newShipment = await client.Shipment.create({
      from_address: fromAddress,
      to_address: toAddress,
      parcel,
    });
    return newShipment;
  } catch (error) {
    console.error(error);
  }
};

module.exports = {
  verifyAddress,
  shipment,
};
