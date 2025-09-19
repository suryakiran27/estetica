const router = require('express').Router();
const Customers = require('../models/Customers');
const bcrypt = require('bcrypt');

router.post('/', async (req, res) => {
    try {
        const { name, email, phone, password } = req.body;
        if (!name || !email || !phone || !password) {
            res.status(400).json({ message: "All fields are required" });
        }

        // Check if customer with the same email or phone already exists
        const existingCustomer = await Customers.findOne({ $or: [{ email }, { phone }] });
        if (existingCustomer) {
            res.status(400).json({ message: "Customer with this email or phone already exists" });
        }

        const salt = await bcrypt.genSalt(10);
        const hashedPassword = await bcrypt.hash(password, salt);

        // Create new customer
        const newCustomer = { name, email, phone, password: hashedPassword };
        const response = await Customers.create(newCustomer);
        res.status(201).json({ message: "Customer created successfully", customer: response });
    } catch (error) {
        res.status(500).json({ message: "Error creating customer", error });
    }
});

module.exports = router;