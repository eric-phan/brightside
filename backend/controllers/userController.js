const User = require('../models/userModel')
const jwt = require('jsonwebtoken')

const createToken = (_id) => {
  // id is going to be part of payload of token
  return jwt.sign({_id}, process.env.SECRET, { expiresIn: '3d' })
  // first argument is id, which is the payload, then the secret string known only to server
  // then expiration of token
}

// login a user
const loginUser = async (req, res) => {
  // async code to communicate with the database
  const {email, password} = req.body

  try {
    const user = await User.login(email, password)
    // pass in email and password from the request body

    // create a token
    const token = createToken(user._id)

    res.status(200).json({email, token})
  } catch (error) {
    res.status(400).json({error: error.message})
  }
}

// signup a user
const signupUser = async (req, res) => {
  const {email, password} = req.body
  // destructuring from request body

  try {
    const user = await User.signup(email, password)
    // uses the signup method from the user model

    // create a token
    const token = createToken(user._id)
    // pass in the id of the user

    res.status(200).json({email, token})
  } catch (error) {
    res.status(400).json({error: error.message})
  }
}

module.exports = { signupUser, loginUser }