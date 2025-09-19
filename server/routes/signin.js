const router = require('express').Router();
const Customers = require('../models/Customers');
const bcrypt = require('bcrypt');

router.post('/', async (req, res) => {
    try {
        const response = await Customers.findOne({ email: req.body.email });
        if (!response) {
             res.status(400).json({ isUser: false, message: "User Not Registered" });
        }

        const isMatch = await bcrypt.compare(req.body.password, response.password);

        if (!isMatch) {
             res.status(400).json({ message: "Invalid email or password" });
        }
        res.status(200).json({ isUser: true, message: "Sign in successful", customer: response });

    } catch (error) {
        res.status(500).json({ message: "Error signing in", error });
    }
})
module.exports = router;