const router = require('express').Router();
const CartSchema = require('../models/Cart');

router.post('/addCart', async (req, res) => {
    try {
        const { userId, productId, productName, productImage, productPrice, productQuantity } = req.body;
        const existItem = await CartSchema.findOne({ userId, productId });
        if (existItem) {
            return res.status(200).json({
                isExists: true,
                message: "Item already exists in cart",
                data: existItem
            });
        }

        const response = await CartSchema.create({ userId, productId, productName, productImage, productPrice, productQuantity });
        res.status(201).json({ isAdded: true, message: "Item Added to cart", data: response })
    } catch (error) {
        res.status(500).json({ message: "Error adding to cart", error })
    }
});

router.post('/getCartItems', async (req, res) => {
    try {
        const { userId } = req.body;
        const cartItems = await CartSchema.find({ userId });
        if (cartItems) {
            res.status(200).json({ message: "Cart items are fetched successfully", data: cartItems });
        } else {
            res.status(400).json({ message: "No cart items available", data: [] })
        }
    } catch (error) {
        res.status(500).json({ message: "Error fetching cart items", error })

    }
})

router.post('/updateQuntity', async (req, res) => {
    try {
        const { userId, productId, productQuantity } = req.body;
        const cartItem = await CartSchema.find({ userId, productId });
        if (cartItem) {
            cartItem.productQuantity = productQuantity;
            await cartItem.save();
            res.status(200).json({ isUpdate: true, message: "Quantity is updated", cartItem });
        }

    } catch (error) {
        res.status(500).json({ message: "Error updating to cart items", error })
    }
})

router.post('/removeCart', async (req, res) => {
    try {
        const { userId } = req.body;
        const response = await CartSchema.deleteMany({ userId });
        res.status(200).json({ message: "Cart cleared", data: response })

    } catch (error) {
        res.status(500).json({ message: "Error removing to cart items", error })
    }
})

module.exports = router;