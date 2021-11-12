const mongoose = require('mongoose')
const uniqueValidator = require('mongoose-unique-validator')

const userSchema = mongoose.Schema({
  email: { type: String, required: true, unique: true },
  password: { type: String, required: true },
  group: { type: String, required: true, default: 'padawan' },
  avatarUrl: { type: String }
}, { timestamps: true })

userSchema.plugin(uniqueValidator)

module.exports = mongoose.model('User', userSchema)
