const jwt = require('jsonwebtoken')
const asyncHanlder = require('express-async-handler')
const User = require('../models/userModel')

const protect = asyncHanlder(
  async (req, res, next) => {
    let token
    if (req.headers.authorization &&
      req.headers.authorization.startsWith('Bearer')
    ) {
      try {
        // Get token from header
        token = req.headers.authorization.split(' ')[1]

        // Verify if the token is correct
        const decodedToken = jwt.verify(token, process.env.JWT_SECRET)

        // Get user from the token
        req.user = await User.findById(decodedToken.id).select('-password')
        next()
      }
      catch (error) {
        console.log(error);
        res.status(401)
        throw new Error('Not authorized')
      }
    }

    if (!token) {
      res.status(401)
      throw new Error('Not authorized, No token found!')
    }
  }
)


module.exports = { protect }
