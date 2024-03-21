const express = require("express");
const mongoose = require("mongoose");
const dotenv = require("dotenv");
dotenv.config();
const cors = require("cors");

const app = express();

// CORS configuration to allow requests from a specific origin
app.use(cors({
  origin: ["https://student-data-9os7.vercel.app"],
  methods: ["POST", "GET"],
  credentials:true
}));

// Middleware to parse JSON request bodies
app.use(express.json());

// Connect to the MongoDB database
const URI = "mongodb+srv://mayanksandikar191098:P612SpRzc2bEeue0@reactjs.smvpawt.mongodb.net/SchoolTeacher?retryWrites=true&w=majority&appName=reactjs";
 
mongoose.connect(URI, {
}).then(() => {
  console.log("Connected to the database successfully");
}).catch((error) => {
  console.log("Error connecting to the database:", error);
});

app.get("/teachers" , (req,res)=>{
  res.json("hello")
})

// Route for handling student-related routes
const userStudentRoute = require("./routes/userStudentRoutes");
app.use("/students", userStudentRoute);

// Route for handling teacher-related routes
const userTeacherRoute = require("./routes/userRoutes");
app.use("/teachers", userTeacherRoute);

// Middleware to ignore favicon.ico requests
app.use('/favicon.ico', (req, res) => res.status(204));

const PORT = process.env.PORT || 5000;

app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});
