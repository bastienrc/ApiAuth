const mongoose = require('mongoose')
const uniqueValidator = require('mongoose-unique-validator')
const Schema = mongoose.Schema

const userSchema = new Schema({
  userId: mongoose.ObjectId,
  firstname: {
    type: String,
    trim: true,
    minLength: [2, 'Trop petit, au moins 2 caractères'],
    maxLength: [42, 'Oh ! du calme pas plus de 42 à la fois, je vous prie.']
  },
  lastname: {
    type: String,
    trim: true,
    minLength: [2, 'C\'est pas beaucoup, allez au moins 2 lettres'],
    maxLength: [42, 'Oh ! Bah, ca fait beaucoup ! 42 grand max.']
  },
  bio: {
    type: String,
    maxLength: [300, 'Eh ! Pas besoin de racontez votre vie, juste vous présentez.']
  },
  email: {
    type: String,
    lowercase: true,
    required: true,
    unique: true,
    trim: true,
    match: [/^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/, 'Email non valide !']
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

mongoose.plugin(schema => {
  schema.pre('findOneAndUpdate', setRunValidators)
  schema.pre('updateMany', setRunValidators)
  schema.pre('updateOne', setRunValidators)
  schema.pre('update', setRunValidators)
})

function setRunValidators () {
  this.setOptions({ runValidators: true })
}

userSchema.plugin(uniqueValidator)

module.exports = mongoose.model('User', userSchema)
