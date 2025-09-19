const router = require('express').Router();
const CartSchema = require('../models/Cart');

router.post('/', async (req, res) => {
    try {
        const { userId } = req.body;
        const cartItems = await CartSchema.find({ userId });
        if (cartItems) {
            let productTotal = 0;
            const taxPercentage = 18;
            const serviceAmount = 1800;

            cartItems.forEach((item) => productTotal += item.productPrice);

            const taotalAmount = productTotal + serviceAmount;
            const taxAmount = (taotalAmount * taxPercentage) / 100;
            const finalTotal = productTotal + taxAmount + serviceAmount;

            const billingData = {
                serviceTotal: roundedValue(serviceAmount),
                productTotal: roundedValue(productTotal),
                orderDiscount: 0,
                taxPercent: taxPercentage,
                tax: roundedValue(taxAmount),
                finalTotal: roundedValue(finalTotal)
            }

            res.status(200).json({ data: billingData })
        }
    } catch (error) {
        res.status(500).json({ message: "Error in billing summary", error })
    }
})

module.exports = router;

const roundedValue = (value) => {
    return value.toFixed(2)
}