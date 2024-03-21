const express = require("express");
const router = express.Router();
const User = require("../models/userTeacher"); // Adjust the path to userModel based on your project structure
const bcrypt = require('bcrypt');
// Create and send data to the database
router.post('/signup', async (req, res) => {
    const { name, email, password } = req.body;
  
    try {
      // Check if the user already exists
      const existingUser = await User.findOne({ email });
      if (existingUser) {
        return res.status(400).json({ error: 'User already exists' });
      }
  
      // Hash the password
      const hashedPassword = await bcrypt.hash(password, 10);
  
      // Create a new user
      const newUser = new User({
        name,
        email,
        password: hashedPassword,
      });
  
      // Save the user to the database
      await newUser.save();
      
      res.status(201).json({ message: 'User created successfully' });
    } catch (error) {
      console.error('Error during signup:', error);
      res.status(500).json({ error: 'Internal server error' });
    }
  });
  
  // Login route
  router.post('/login', async (req, res) => {
    const { email, password } = req.body;
  
    try {
      // Find the user by email
      const user = await User.findOne({ email });

console.log('Received Email:', email);
console.log('Found User:', user);

if (!user) {
  return res.status(401).json({ error: 'Invalid email or password' });
}
  
      // Check if the password is correct
      const passwordMatch = await bcrypt.compare(password, user.password);

      if (!passwordMatch) {
        return res.status(401).json({ error: 'Invalid email or password' });
      }
      console.log('Email:', email);
      console.log('Password:', password);
      console.log('User:', user);
      console.log('Password Match:', passwordMatch);
      // Successful login
      return res.status(200).json({ message: 'Login successful' });
    } catch (error) {
      console.error('Error during login:', error);
      res.status(500).json({ error: 'Internal server error' });
    }
  });
  
// Get data from the database
router.get("/", async (req, res) => {
    try {
        const showAll = await User.find();
        res.status(200).json(showAll); // Changed status to 200 for successful GET request
    } catch (error) {
        res.status(500).json({ error: error.message }); // Changed status to 500 for internal server error
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
    const {name ,email, password} =req.body
    try {
        const updateUser = await User.findByIdAndUpdate(id ,req.body, {new:true});
        res.status(200).json(updateUser); // Changed status to 200 for successful GET request
    } catch (error) {
        res.status(500).json({ error: error.message }); // Changed status to 500 for internal server error
    }
});



module.exports = router;
