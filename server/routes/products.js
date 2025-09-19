const router = require('express').Router();
const Products = require('../models/products');

router.post('/', async (req, res) => {
    try {
        const { category, search } = req.query;
        let filter = {};

        if (category) {
            filter.category = category;
        }

        if (search) {
            filter.name = { $regex: search, $options: "i" };
        }

        const products = await Products.find(filter);
        res.status(200).json({ success: true, products });
    } catch (error) {
        res.status(500).json({ message: "Error fetching products", error });
    }
});

module.exports = router;
