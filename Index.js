const express = require("express");
const mongoose = require("mongoose");
const dotenv = require("dotenv");
dotenv.config();
const cors = require("cors");

const app = express();

app.use(cors({
  origin: ["https://student-data-9os7.vercel.app"],
  methods: ["POST", "GET"],
  credentials:true
   }
))
  app.use(express.json())
app.use(express.json());

// Connect to the MongoDB database
const URI = "mongodb+srv://mayanksandikar191098:P612SpRzc2bEeue0@reactjs.smvpawt.mongodb.net/Schoolteacher?retryWrites=true&w=majority&appName=reactjs";

mongoose.connect(URI, {
  useNewUrlParser: true,
  useUnifiedTopology: true,
}).then(() => {
  console.log("Connected to the database successfully");
}).catch((error) => {
  console.log("Error connecting to the database:", error);
});

// Route for handling students
const userStudentRoute = require("./routes/userStudentRoutes");
app.use("/students", userStudentRoute);


const userTeacherRoute = require("./routes/userRoutes");
app.use("/teachers", userTeacherRoute);


// Middleware to ignore favicon.ico requests
app.use('/favicon.ico', (req, res) => res.status(204));

const PORT = process.env.PORT || 5000;

app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});



// P612SpRzc2bEeue0
