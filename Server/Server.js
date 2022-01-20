const express = require("express");
const bodyParser = require("body-parser");
const cors = require("cors");
const nodemailer = require("nodemailer");
const app = express();
const http = require("http");
const socketIO = require("socket.io");
const server = http.createServer(app);
const io = socketIO.listen(server);
const path = require("path");
const dotenv = require("dotenv");

dotenv.config();
app.use(bodyParser.json());
app.use(cors({ origin: "*" }));
app.use(bodyParser.urlencoded({ extended: false }));
app.start = app.listen = function () {
  return server.listen.apply(server, arguments);
};
app.use(express.static("build"));
app.post("/", (req, res) => {
  nodemailer.createTestAccount((err, account) => {
    const htmlEmail = `
        <h3>Comment Details </h3>
        <ul>
            <li>Name: ${req.body.Name}</li>
            <li>Email: ${req.body.Email}</li>
            <li>TimeofComment: ${req.body.Time}</li>
        </ul>
        <h2 style="color: #8B0000;">Comment</h2>
        <p>${req.body.Comment}</p>
        `;
    let transporter = nodemailer.createTransport({
      host: process.env.mailhost,
      port: process.env.mailport,
      secure: true,
      auth: {
        type: "OAuth2",
        user: process.env.mailuserid,
        clientId: process.env.mailclientId,
        clientSecret: process.env.mailclientSecret,
        refreshToken: process.env.mailrefreshToken,
      },
    });

    let mailOptions = {
      from: process.env.mailuserid,
      to: req.body.Email,
      subject: "New Comment",
      text: req.body.Comment,
      html: htmlEmail,
    };
    transporter.sendMail(mailOptions, (err, info) => {});
  });
});
io.on("connection", (socket) => {
  let flag = true,
    Emailid,
    ID;
  console.log("Connection established");
  socket.on("InitialData", (data) => {
    console.log("InitialData Called- " + data.email);
    socket.join(data.ID);
    if (flag === true) {
      Emailid = data.email;
      ID = data.ID;
      flag = false;
    }
    socket.to(data.ID).broadcast.emit("NewUser", data.email);
  });
  socket.on("Message", (Data) => {
    console.log("Message Send");
    socket.to(Data.ID).emit("NewMessage", Data);
  });
  socket.on("ConfirmUser", (Data) => {
    console.log("ConfirmUser- " + Data.Email);
    socket.to(Data.ID).broadcast.emit("NewUser", Data.Email);
  });
  socket.on("terminated", (Data) => {
    console.log("Terminated");
    socket.to(Data.ID).broadcast.emit("UserDisconnected", Data.email);
    socket.disconnect();
  });
  socket.on("disconnect", () => {
    console.log("Disconnected");
    console.log("ID- " + ID + "EmailID- " + Emailid);
    socket.to(ID).broadcast.emit("UserDisconnected", Emailid);
  });
});

const PORT = process.env.PORT || 3001;

app.start(PORT);
