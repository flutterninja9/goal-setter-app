const jsonwebToken = require('jsonwebtoken')
const bcrypt = require('bcryptjs')
const asyncHanlder = require('express-async-handler')
const User = require('../models/userModel')


const registerUser = asyncHanlder(
  async (req, res) => {
    const {name, email, password} = req.body

    if(!name || !email || !password) {
      res
      .status(400)
      
      throw new Error('Please fill in name,email and password')
    }

    // Check if user already exists
    const userExists = await User.findOne({email})
    if(userExists) {
      res.status(400)
      throw new Error('User already exists!')
    }

    // Hash the password
    const salt = await bcrypt.genSalt()
    const hashedPassword = await bcrypt.hash(password, salt)

    // Create user
    const user = await User.create({
      name,
      email,
      password: hashedPassword,
    })
    
    if(user) {
      res
      .status(200)
      .json({
        id : user.id,
        name : user.name,
        email : user.email,
        token : generateToken(user._id),
      })
    } else {
      res
      .status(500)

      throw new Error('Some error occured!')
    }
  }
)

const login = asyncHanlder(
  async (req, res) => {
    const { email, password } = req.body

    const user = await User.findOne({ email })
    if(user && (await bcrypt.compare(password, user.password))) {
      res
      .json({
        id : user.id,
        name : user.name,
        email : user.email,
        token : generateToken(user._id),
      }) 
    } else {
      res.status(400)
      throw new Error('Invalid credentials')
    }    
  }
)

// generate token
const generateToken = (id) => {
  return jsonwebToken
  .sign(
    { id }, 
    process.env.JWT_SECRET, 
    { expiresIn: '30d' },
  )
}

const getMe = asyncHanlder(
  async (req, res) => {
    const { _id, name, email } = await User.findById(req.user.id)

    res
    .status(200)
    .json({
      id: _id,
      name: name,
      email: email,
    })
  }
)


module.exports = { registerUser, login, getMe }
