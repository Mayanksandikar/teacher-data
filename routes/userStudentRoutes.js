const express = require("express");
const router = express.Router();
const User = require("../models/userStudent");
// Create and send data to the database
router.post('/signupstudent', async (req, res) => {
    const { name, email, rollNo, address ,phoneNo} = req.body;
  
    try {
      // Check if the user already exists
      const existingUser = await User.findOne({ email });
      if (existingUser) {
        return res.status(400).json({ error: 'User already exists' });
      }
  
      // Create a new user
      const newUser = new User({
        name ,email, rollNo,address,phoneNo
          });
  
      // Save the user to the database
      await newUser.save();
      
      res.status(201).json({ message: 'User created successfully' });
    } catch (error) {
      console.error('Error during signup:', error);
      res.status(500).json({ error: 'Internal server error' });
    }
  });
  

// Get data for all students
router.get("/", async (req, res) => {
  try {
    const allStudents = await User.find();
    console.log('All students fetched successfully:', allStudents);
    res.status(200).json(allStudents);
  } catch (error) {
    console.error('Error during data fetch:', error);
    res.status(500).json({ error: error.message });
  }
});

//get data only singe users 
router.get("/:id", async (req, res) => {
    const {id} =req.params
    try {
        const singleUser = await User.findById({_id : id});
        res.status(200).json(singleUser); // Changed status to 200 for successful GET request
    } catch (error) {
        res.status(500).json({ error: error.message }); // Changed status to 500 for internal server error
    }
});

// delete the data from database
router.delete("/:id", async (req, res) => {
    const {id} =req.params
    try {
        const deleteUser = await User.findByIdAndDelete({_id : id});
        res.status(200).json(deleteUser); // Changed status to 200 for successful GET request
    } catch (error) {
        res.status(500).json({ error: error.message }); // Changed status to 500 for internal server error
    }
});

//update the data 
//you can use patch or put

router.patch("/:id", async (req, res) => {
    const {id} =req.params
        const { name ,email, rollNo,address,phoneNo} =req.body
    try {
        const updateUser = await User.findByIdAndUpdate(id ,req.body, {new:true});
        res.status(200).json(updateUser); // Changed status to 200 for successful GET request
    } catch (error) {
        res.status(500).json({ error: error.message }); // Changed status to 500 for internal server error
    }
}); 



module.exports = router;
