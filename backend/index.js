dotenv.config()

const express = require('express')
const app = express()
const port = 3000
const cors = require('cors')
const mongoose = require('mongoose')
const User = require('./model/user')
const bcrypt = require('bcrypt')
const dotenv = require('dotenv')
const jwt = require('jsonwebtoken')
const userSendmail = require('./userSendmail');
const productRoutes = require("./api/productRoutes")
const cartRoutes = require("./api/cartRoutes")
const orderRoutes = require("./api/orderRoutes")
const { verifyToken } = require('./middleware/authMiddleware')


app.use(cors())
app.use(express.json())
app.use("/upload", express.static("upload"))


mongoose.connect(process.env.MONGO_URL)
  .then(() => console.log("MongoDB is Connected!!"))
  .catch((err) => console.log(err))

app.get('/test', (req, res) => {
  res.send('Discover Amazing Products')
})

app.post('/register', async (req, res) => {
  try {
    const { fullName, email, number, password } = req.body

    console.log(fullName, email, number, password)
    const existingUser = await User.findOne({ email })
    const hashedPassword = await bcrypt.hash(password, 10)

    if (existingUser) {
      return res.status(400).json({
        message: "User is already register"
      })
    }

    await User.create({
      fullName, email, number, password: hashedPassword, role: "user"
    })

    res.status(200).json({
      message: "User registered"
    })
  }
  catch (err) {
    res.status(500).json({
      message: "Server Error!!"
    })
  }
})

app.post('/login', async (req, res) => {
  try {
    const { email, password } = req.body
    const existingUser = await User.findOne({ email })

    if (!existingUser) {
      return res.status(400).json({
        message: "Email is invalid"
      })
    }

    const matchPassword = await bcrypt.compare(password, existingUser.password);

    if (!matchPassword) {
      return res.status(400).json({
        message: "Password is invalid"
      })
    }

    const token = await jwt.sign(
      { id: existingUser._id },
      process.env.TOKEN_KEY,
      { expiresIn: '1D' }
    )

    console.log(email, password)

    res.status(200).json({
      token: token,
      user: existingUser,
      message: "User Logged in"
    })
  }
  catch (err) {
    res.status(500).json({
      message: "Server Error!!"
    })
  }
})

app.post('/contact', async (req, res) => {

  try {

    const { email, fullname, message } = req.body;

    await userSendmail(email, fullname, message);

    res.status(200).json({
      message: 'Email is sent!!!'
    })
  }
  catch (err) {
    res.status(500).json({
      message: "Server Error"
    })
  }
})

app.get('/profile', verifyToken, async (req, res) => {
  const user = req.user
  try{
    res.json({ user })
  }
  catch(err){
    res.status(500).json({
      message: "Server Error!!"
    })
  }
})

app.use("/product", productRoutes)
app.use("/cart", cartRoutes)
app.use("/order", orderRoutes)

app.listen(port, () => {
  console.log(`Example app listening on port ${port}`)
})
