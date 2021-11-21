const mongoose = require('mongoose')
const uniqueValidator = require('mongoose-unique-validator')

const userSchema = mongoose.Schema({
  email: {
    type: String,
    lowercase: true,
    required: true,
    unique: true
  },
  password: {
    type: String,
    required: true
  },
  group: {
    type: String,
    required: true,
    default: 'member'
  },
  avatarUrl: {
    type: String
  }
},
{
  timestamps: true
})

userSchema.plugin(uniqueValidator)

module.exports = mongoose.model('User', userSchema)
