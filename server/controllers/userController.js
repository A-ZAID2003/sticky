//Importing the (user) model file 
const User = require('../models/user');

const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');

//Registering a new user.............

exports.register = async (req, res) => {
  const { username, password } = req.body;

  if (!username || !password) {
      return res.status(400).json({ message: "Username and password are required." });
  }

  const HashedPassword = await bcrypt.hash(password, 10);

  const user = new User({
      username,
      password: HashedPassword,
  });

  try { 
      const savedUser = await user.save();
      res.status(201).json(savedUser);
  } catch (err) {
      console.error("Error saving user:", err);
      res.status(400).json({ message: err.message });
  }
};

//Login user.........

exports.login = async(req, res) => {
    const {username, password} = req.body;

    const user = User.findOne({username});
    if (!user) {
        return res.status(400).json({ message: 'Invalid credentials' });
      }
    
      const isMatch = await bcrypt.compare(password, user.password);
      if (!isMatch) {
        return res.status(400).json({ message: 'Invalid credentials' });
      }
    
      const token = jwt.sign({ id: user._id }, process.env.JWT_SECRET, { expiresIn: '1h' });
      res.json({ token });

}

// Note: Both the login methods are correct..But it is a good practise to put the request and response in a try and catch block.

// exports.login = async (req, res) => {
//   const { username, password } = req.body;

//   try {
//       // Await the promise returned by findOne
//       const user = await User.findOne({ username });
      
//       // Check if user exists
//       if (!user) {
//           return res.status(400).json({ message: 'Invalid credentials' });
//       }
      
//       // Check if the password matches
//       const isMatch = await bcrypt.compare(password, user.password);
//       if (!isMatch) {
//           return res.status(400).json({ message: 'Invalid credentials' });
//       }
      
//       // Generate JWT token
//       const token = jwt.sign({ id: user._id }, process.env.JWT_SECRET, { expiresIn: '1h' });
      
//       // Respond with token
//       res.json({ token });
//   } catch (error) {
//       console.error("Login error:", error); // Log the error for debugging
//       res.status(500).json({ message: 'Server error' }); // Respond with a generic server error
//   }
// };