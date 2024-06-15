const express = require("express");
const nodemailer = require("nodemailer");
const cors = require("cors");
const bodyParser = require("body-parser");
const app = express();
app.use(
  cors({
    origin: "*",
  })
);

// Use body-parser middleware to parse JSON bodies
app.use(bodyParser.json());

const port = 9090;

const transporter = nodemailer.createTransport({
  host: "smtp.gmail.com",
  port: 465,
  secure: true, // use SSL
  auth: {
    user: "aymaanpathan5@gmail.com",
    pass: "shke aviz whyw uhwd",
  },
});

const Router = express.Router();

Router.get("/", (req, res) => {
  res.send("YEEESSSSSS");
});

Router.post("/sendEmail", async (req, res) => {
  try {
    const { name, subject, message } = req.body;

    const info = await transporter.sendMail({
      from: name, // sender address
      to: "aymaanpathan5@gmail.com", // list of receivers
      subject: subject, // Subject line
      text: message, // plain text body
    });

    console.log("Message sent: %s");
    res.status(200).send({ message: "Email sent successfully" });
  } catch (error) {
    console.error("Error sending email:", error);
    res.status(500).send({ message: "Error sending email", error });
  }
});

app.use(Router);

app.listen(port, () => {
  console.log(`Server is running on port ${port}`);
});
