const express = require("express")
const Product = require("../model/product")
const AddToCart = require("../model/addToCart")
const router = express.Router()
const { verifyToken } = require("../middleware/authMiddleware")
const { findOne } = require("../model/user")


// ADD PRODUCT TO CART
router.post("/add", verifyToken, async (req, res) => {
    try {
        const { productId, userId } = req.body

        const product = await Product.findById(productId)

        if (!product) return res.status(404).json({ message: "Product Not found" })

        let cart = await AddToCart.findOne({ userId })

        if (!cart) {
            cart = new AddToCart({
                userId,
                items: []
            })
        }

        const itemIndex = cart.items.findIndex(item => item.productId.toString() === productId)

        if (itemIndex > -1) {
            cart.items[itemIndex].quantity += 1
        } else {
            cart.items.push({
                productId,
                productName: product.name,
                productDescription: product.description,
                productImage: product.image,
                productPrice: product.price
            })
        }

        cart.totalAmount = cart.items.reduce((acc, item) => acc + item.productPrice * item.quantity, 0)

        await cart.save()


        res.status(200).json({ message: "Product Added in cart" })
    } catch (err) {
        console.log(err)
        res.status(500).json({ message: "Server Error" })
    }
})

router.get("/list", verifyToken, async (req, res) => {
    try {

        const cart = await AddToCart.findOne({ userId: req.user._id })

        res.json(cart)
    } catch (err) {
        console.log(err)
        res.status(500).json({ message: "Server Error" })
    }
})

router.put("/update/:productId", verifyToken, async (req, res) => {
    try {

        const { quantity } = req.body

        const cart = await AddToCart.findOne({
            userId: req.user._id
        })

        const item = cart.items.find(
            item => item.productId.toString() === req.params.productId
        )

        if (item) {
            item.quantity = quantity
        }

        cart.totalAmount = cart.items.reduce(
            (acc, item) => acc + item.productPrice * item.quantity, 0
        )

        await cart.save()

        res.json(cart)
    } catch (err) {
        console.log(err)
        res.status(500).json({ message: "Server Error" })
    }
})

router.delete("/remove/:productId", verifyToken, async (req, res) => {
    try {

        const cart = await AddToCart.findOne({
            userId: req.user._id
        })

        cart.items = cart.items.filter(
            item => item.productId.toString() !== req.params.productId
        )

        cart.totalAmount = cart.items.reduce(
            (acc, item) => acc + item.productPrice * item.quantity, 0
        )

        await cart.save()

        res.json(cart)
    } catch (err) {
        console.log(err)
        res.status(500).json({ message: "Server Error" })
    }
})

module.exports = router
