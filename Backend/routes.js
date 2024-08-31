const express = require('express');
const multer = require('multer');
const User = require('../models/User');
const router = express.Router();

// Configure multer for file upload
const storage = multer.diskStorage({
    destination: (req, file, cb) => {
        cb(null, 'uploads/');
    },
    filename: (req, file, cb) => {
        cb(null, Date.now() + '-' + file.originalname);
    }
});

const upload = multer({ storage: storage });

// POST route to handle user signup
router.post('/signup', upload.single('resume'), async (req, res) => {
    const { name, email, phone } = req.body;
    const resume = req.file.filename;

    try {
        const user = new User({
            name,
            email,
            phone,
            resume
        });
        await user.save();
        res.status(201).json({ message: 'User signed up successfully' });
    } catch (err) {
        res.status(500).json({ error: 'Failed to sign up user' });
    }
});

module.exports = router;
