const express = require("express");
const bodyParser = require("body-parser");
const nodemailer = require("nodemailer");
const cors = require("cors");
const multer = require("multer");

const app = express();
app.use(express.json());
const upload = multer({ storage: multer.memoryStorage() });

const corsOption = {
  origin: ["https://application-form-gamma-seven.vercel.app"],
  methods: ["GET", "POST", "PUT", "DELETE", "OPTIONS"],
  allowedHeaders: ["Content-Type", "Authorization"],
  credentials: true,
};
app.use(cors(corsOption));

// Setup transporter (use real credentials in production)
const transporter = nodemailer.createTransport({
  service: "gmail", // or another service
  host: "smtp.gmail.com",
  port: 587,
  secure: false,
  auth: {
    user: "ibrahimyounes646@gmail.com",
    pass: "kuvn miru alkn tnss",
  },
});

// Email template function
function generateEmailTemplate(data, file) {
  return `
  <div style="font-family: Arial, sans-serif; background-color: #f4f4f4; padding: 20px;">
    <div style="max-width: 600px; margin: auto; background-color: #ffffff; border-radius: 8px; padding: 20px; box-shadow: 0 0 10px rgba(0,0,0,0.05);">
      <div style="text-align: center; margin-bottom: 20px;">
        <img src="https://tinyurl.com/294h7954" alt="Company Logo" style="max-width: 150px;">
      </div>
      <table style="width: 100%; border-collapse: collapse;">
       <table border="1" cellpadding="10" cellspacing="0" style="border-collapse: collapse; width: 100%;">
      <thead>
        <tr>
          <th>Field</th>
          <th>Value</th>
        </tr>
      </thead>
      <tbody>
        ${Object.entries(data)
          .map(
            ([key, value]) => `
          <tr>
            <td>${key}</td>
            <td>${value}</td>
          </tr>
        `
          )
          .join("")}
           <tr>
            <td>File Name</td>
            <td>${file.originalname}</td>
          </tr>
      </tbody>
        </table>
    </div>
  </div>
`;
}
app.get("/", (req, res) => {
  res.send("Backend server is running!");
});

// POST /submit endpoint
app.post("/submit", upload.single("fileToUpload"), (req, res) => {
  console.log(req.url);
  const data = req.body;
  const file = req.file;
  const mailOptions = {
    from: "ibrahimyounes646@gmail.com",
    to: ["ibrahimyounes646@gmail.com", "digitalmedia@ajman.ae"],
    subject: "Thank you for your submission!",
    html: generateEmailTemplate(data, file),
    attachments: file
      ? [{ filename: file.originalname, content: file.buffer }]
      : [],
  };

  transporter.sendMail(mailOptions, (error, info) => {
    if (error) {
      console.error(error);
      return res.status(500).send("Error sending email");
    }
    res.send("Form submitted and email sent!");
  });
});
const PORT = process.env.PORT || 2000;
app.listen(PORT, () => console.log(`Server running on port ${PORT}`));
