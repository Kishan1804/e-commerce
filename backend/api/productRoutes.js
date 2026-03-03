const express = require("express")
const router = express.Router()
const Product = require("../model/product")
const multer = require('multer')
const { verifyToken } = require("../middleware/authMiddleware")
const { isAdmin } = require("../middleware/roleMiddleware")


const storage = multer.diskStorage({
  destination: function (req, file, cb) {
    cb(null, "upload")
  },
  filename: function (req, file, cb) {
    const uniqueSuffix = Date.now() + "-" + Math.round(Math.random() * 1e9)
    cb(null, file.fieldname + "-" + uniqueSuffix)
  },
})

const upload = multer({ storage: storage })

// ADD PRODUCT
router.post("/add", verifyToken, isAdmin, upload.single("image"), async (req, res) => {
  try {
    const { name, description, price } = req.body

    await Product.create({
      name,
      description,
      price,
      image: req.file.filename,
    })

    res.json({ message: "Product is Added" })
  } catch (err) {
    console.log(err)
    res.status(500).json({ message: "Server Error" })
  }
})

// GET PRODUCT LIST
router.get("/list", async (req, res) => {
  try {
    const productList = await Product.find()
    res.json({ productList })
  } catch (err) {
    console.log(err)
    res.status(500).json({ message: "Server Error" })
  }
})

// GET PRODUCT DETAILS
router.get("/detail/:id", async (req, res) => {
  try {

    const { id } = req.params

    const product = await Product.findById({ _id: id })

    res.status(200).json({ product: product })
  } catch (err) {
    console.log(err)
    res.status(500).json({ message: "Server Error" })
  }
})

//DELETE PRODUCT
router.delete("/delete/:id", verifyToken, isAdmin, async (req, res) => {
  try {

    const { id } = req.params

    await Product.findByIdAndDelete({ _id: id })

    res.status(200).json({
      message: "Product is deleted"
    })

  } catch (err) {
    console.log(err)
    res.status(500).json({ message: "Server Error" })
  }
})

module.exports = router
