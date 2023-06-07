const mongoose = require('mongoose')
const bcrypt = require('bcrypt')
const validator = require('validator')

const Schema = mongoose.Schema

const userSchema = new Schema({
  email: {
    type: String,
    required: true,
    unique: true
    // dont want two accounts
  },
  password: {
    type: String,
    required: true
  }
})
// need to adhere to this schema to save to DB

// static signup method
// making your own functions in additions to the ones that come with mongoose (create, delete, findOne...)
userSchema.statics.signup = async function(email, password) {

  // validation
  if (!email || !password) {
    throw Error('All fields must be filled')
    // make sure theres a value for the email and password
  }
  if (!validator.isEmail(email)) {
    throw Error('Email not valid')
  }
  if (!validator.isStrongPassword(password)) {
    throw Error('Password not strong enough')
  }
  // prebuilt methods to check emails and passwords

  const exists = await this.findOne({ email })
  // this refers to this model

  if (exists) {
    throw Error('Email already in use')
  }

  const salt = await bcrypt.genSalt(10)
  // generate a 10 key password
  const hash = await bcrypt.hash(password, salt)
  // combine the salt and the password together

  const user = await this.create({ email, password: hash })
  // creates user

  return user
}

// static login method
userSchema.statics.login = async function(email, password) {

  if (!email || !password) {
    throw Error('All fields must be filled')
  }

  const user = await this.findOne({ email })
  if (!user) {
    throw Error('Incorrect email')
    // doesnt exist in our DB
  }

  const match = await bcrypt.compare(password, user.password)
  // compare the password with the hased password from the user document
  if (!match) {
    throw Error('Incorrect password')
  }

  return user
}
// will use this login method on the loginUser controller

module.exports = mongoose.model('User', userSchema)