// const router = require('express').Router();
// const Products = require('../models/products');

// // Example route to get all products
// router.get('/', async (req, res) => {
//     try {
//         const categories = await Products.distinct('category');
//         res.status(200).json(categories);
//         console.log(categories);

//     } catch (error) {
//         res.status(500).json({ message: "Error fetching categories", error });
//     }
// })

// module.exports = router;

const router = require('express').Router();
const Products = require('../models/products');

// ✅ Get all distinct categories
router.get('/', async (req, res) => {
    try {
        const categories = await Products.distinct('category');
        res.status(200).json({ success: true, categories });
    } catch (error) {
        res.status(500).json({ message: "Error fetching categories", error });
    }
});

module.exports = router;
