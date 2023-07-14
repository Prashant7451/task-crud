const express = require('express');
const bodyParser = require('body-parser');
const mongoose = require('mongoose');

const app = express();
const port = 5000; // Choose an available port

app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());

// MongoDB connection
mongoose.connect('mongodb://localhost/userdb', {
  useNewUrlParser: true,
  useUnifiedTopology: true,
}).then(() => {
  // Seed sample data
  const sampleUsers = [
    {
      name: 'John Doe',
      email: 'john@example.com',
    },
    {
      name: 'Jane Smith',
      email: 'jane@example.com',
    },
    // Add more sample users as needed
  ];

  User.insertMany(sampleUsers, (err) => {
    if (err) {
      console.error('Error seeding users:', err);
    } else {
      console.log('Sample users seeded successfully.');
    }
  });


// Define a User schema and model
const userSchema = new mongoose.Schema({
  name: String,
  email: String,
  // add other user fields as needed
});

const User = mongoose.model('User', userSchema);

// Set up API routes

// Start the server
app.listen(port, () => {
  console.log(`Server is running on port ${port}`);
});


// Get all users
app.get('/api/users', (req, res) => {
    User.find({}, (err, users) => {
      if (err) {
        res.status(500).json({ error: 'An error occurred while fetching users.' });
      } else {
        res.status(200).json(users);
      }
    });
  });
  
  // Get a single user by ID
  app.get('/api/users/:id', (req, res) => {
    const userId = req.params.id;
    User.findById(userId, (err, user) => {
      if (err) {
        res.status(500).json({ error: 'An error occurred while fetching the user.' });
      } else if (!user) {
        res.status(404).json({ error: 'User not found.' });
      } else {
        res.status(200).json(user);
      }
    });
  });
  
  // Create a new user
  app.post('/api/users', (req, res) => {
    const { name, email } = req.body;
    const newUser = new User({ name, email });
    newUser.save((err, user) => {
      if (err) {
        res.status(500).json({ error: 'An error occurred while creating the user.' });
      } else {
        res.status(201).json(user);
      }
    });
  });
  
  // Update an existing user
  app.put('/api/users/:id', (req, res) => {
    const userId = req.params.id;
    const { name, email } = req.body;
    User.findByIdAndUpdate(userId, { name, email }, { new: true }, (err, user) => {
      if (err) {
        res.status(500).json({ error: 'An error occurred while updating the user.' });
      } else if (!user) {
        res.status(404).json({ error: 'User not found.' });
      } else {
        res.status(200).json(user);
      }
    });
  });
  
  // Delete a user
  app.delete('/api/users/:id', (req, res) => {
    const userId = req.params.id;
    User.findByIdAndDelete(userId, (err, user) => {
      if (err) {
        res.status(500).json({ error: 'An error occurred while deleting the user.' });
      } else if (!user) {
        res.status(404).json({ error: 'User not found.' });
      } else {
        res.status(200).json({ message: 'User deleted successfully.' });
      }
    });
  });
  