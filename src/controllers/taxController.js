require("dotenv").config();
const Taxjar = require("taxjar");

const client = new Taxjar({
  apiKey: `${process.env.TJ_TEST_KEY}`,
  apiUrl: Taxjar.SANDBOX_API_URL,
});

exports.tax = async (req, res) => {
  try {
    const response = await client.taxForOrder(req.body);
    const { tax } = response;
    const amountToCollect = response.tax.amount_to_collect;
    res.json(response);
  } catch (error) {
    console.error(error);
    res
      .status(500)
      .json({ error: "An error occurred while processing the request." });
  }
};
