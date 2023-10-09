require("dotenv").config();
const express = require("express");
const sgMail = require("@sendgrid/mail");
const router = express.Router();

// Set your SendGrid API key
sgMail.setApiKey(process.env.SEND_GRID_API_KEY);

console.log(process.env.SEND_GRID_API_KEY);

router.post("/", (req, res) => {
  const { recipientEmail, emailSubject, emailText, emailHtml } = req.body;

  const msg = {
    to: recipientEmail,
    from: "yojimbo@yojimboslice.info", // Change to your verified sender
    subject: emailSubject,
    text: emailText,
    html: emailHtml,
  };

  sgMail
    .send(msg)
    .then(() => {
      console.log("Email sent");
      res.status(200).json({ message: "Email sent successfully" });
    })
    .catch(error => {
      console.error(error);
      res.status(500).json({ error: "Email sending failed" });
    });
});

module.exports = router;
