const express = require("express")
const AddToCart = require("../model/addToCart")
const router = express.Router()
const { verifyToken } = require("../middleware/authMiddleware")
const razorpayInstance = require('../controllers/razorpay');
const crypto = require('crypto')


// Endpoint to create an order
router.post('/create-order', async (req, res) => {
    const { amount, currency } = req.body;

    try {
        const options = {
            amount: amount * 100, // Convert amount to smallest currency unit
            currency: currency || 'INR',
        };

        const order = await razorpayInstance.orders.create(options);
        res.status(200).json(order);
    } catch (error) {
        console.error(error);
        res.status(500).send('Error creating RazorPay order');
    }
});

router.post('/verify', async (req, res) => {
    try {
        const { razorpay_payment_id, razorpay_order_id, razorpay_signature } = req.body;

        const sign = razorpay_order_id + "|" + razorpay_payment_id

        const expectedSign = crypto
            .createHmac('sha256', process.env.RAZORPAY_KEY_SECRET)
            .update(sign)
            .digest('hex')

        if (razorpay_signature !== expectedSign) {
            return res.status(400).json({
                message: "Invalid signature"
            })
        }

        const cart = await AddToCart.findOne({ userId: req.user._id })

        if(!cart) {
            return res.status(400).json({
                message: "Cart is empty"
            })
        }

        const newOrder = new Order({
            
        })

        res.status(200).json({
            message: "Payment successfull"
        })
    }

    catch (err) {
        res.status(500).json({
            message: "Server Error"
        })
    }
});

module.exports = router
