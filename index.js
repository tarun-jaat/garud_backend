const express = require("express");
const app = express();

const server = require('http').createServer(app)

const userDataRoutes = require('./routes/UserData.route');
const userRoutes =require("./routes/User.routes")
const ContactUs=require('./routes/ContactUs.route')
// const mailBroadcast =require('./routes/EmailBroadcast')
// const paymentRoutes = require("./routes/Payments");
const profileRoutes = require("./routes/Profile.route");
const CourseRoutes = require("./routes/Course.route");
// const messagesRoutes=require("./routes/Message.route")
const database = require("./config/database"); 
const cookieParser = require("cookie-parser");
// const notificationRoutes = require('./routes/Notificaton.route');
const cors = require("cors");
const fileUpload = require("express-fileupload");
const { cloudnairyconnect } = require("./config/Cloudinary");
const notification =require('./Controllers/Notification.controller')
const Batch =require('./routes/Batches.route')
const quizRoutes =require('./routes/Quiz.route')

// const allUser=require('./routes/user.route')
const dotenv = require("dotenv");
dotenv.config();   

 

const PORT = process.env.PORT || 5000;
database.connect();

app.use(express.json());
app.use(cookieParser()); 

app.use(
  cors({
    origin: "*",
    credentials: true,
    maxAge: 14400,
  })
);

app.use(
  fileUpload({
    useTempFiles: true,
    tempFileDir: "/tmp",
  })
);

cloudnairyconnect();

// socket connection

const io = require('socket.io')(server, {
  transports: ['polling'],
  cors:"*",
})


require('./Socket/Socketio')(io)

// app.use("/api/v1/email",mailBroadcast)

app.use("/api/v1/auth", userRoutes);

// app.use("/api/v1/payment", paymentRoutes);

app.use("/api/v1/profile", profileRoutes);

// app.use('/api/v1/notifications', notificationRoutes);

app.use("/api/v1/course", CourseRoutes);
app.use("/api/v1/batch", Batch);

app.use("/api/v1/quiz", quizRoutes);

// app.use("/api/v1/messages", messagesRoutes);

// app.use("/api/v1/allUsers",allUser)

app.use('/api/v1/userdata', userDataRoutes);
app.use("/api/v1/reach", ContactUs);
app.use('api/v1/notification',notification);


// app.use("/api/v1/contact", require("./routes/ContactUs"));

app.get("/", (req, res) => {
  res.status(200).json({
    message: "Welcome to the API", 
  }); 
});

 
app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});  