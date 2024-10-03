const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors');
const dotenv = require('dotenv');

dotenv.config(); // Load environment variables from .env file

const app = express();
const PORT = process.env.PORT || 8080;

// Middleware setup
app.use(cors()); // Allow cross-origin requests
app.use(express.json()); // Built-in JSON parser
app.use(express.urlencoded({ extended: true })); // Parse URL-encoded bodies

// Connect to MongoDB using environment variables for sensitive info
const DB_USER = process.env.DB_USER;
const DB_PW = process.env.DB_PW;
const uri = `mongodb://${DB_USER}:${DB_PW}@mongodb:27017/monolithic_app_db?authSource=admin`;

// Connect to MongoDB
mongoose.connect(uri, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
    useCreateIndex: true,
    useFindAndModify: false
})
.then(() => {
    console.log("MongoDB connected successfully");

    // Optional: Run a simple query to check connectivity
    User.find({}, (err, users) => {
        if (err) {
            console.error("Error fetching users:", err);
        } else {
            console.log("Fetched users:", users);
        }
    });
})
.catch(err => {
    console.error("MongoDB connection error:", err);
    process.exit(1); // Exit the process if the connection fails
});

// User schema for MongoDB
const UserSchema = mongoose.Schema({
    name: { type: String, required: true },
    email: { type: String, required: true, unique: true } // Ensures emails are unique
}, { collection: 'users' });

// Define the mongoose model for use below in methods
const User = mongoose.model('User', UserSchema);

// Index page (optional, if you want a home route)
app.get('/', (req, res) => {
    res.send('<h1>Welcome to the Monolithic Architecture Application API!</h1>');
});

// Registration endpoint
app.post('/register', function(req, res) {
    const { name, email } = req.body;

    // Basic validation
    if (!name || !email) {
        return res.status(400).json({ error: 'Name and email are required' });
    }

    const newUser = new User({
        name,
        email
    });

    newUser.save((err, user) => {
        if (err) {
            console.error("Error saving user:", err);
            return res.status(500).json({ error: 'Failed to save user' });
        }
        res.status(200).json(user);
    });
});

// Start the server
app.listen(PORT, () => {
    console.log(`Visit app at http://localhost:${PORT}`);
});
