require('dotenv').config()
const User = require('../models/user')
const bcrypt = require('bcrypt')
const jwt = require('jsonwebtoken')
const fs = require('fs')

exports.signup = (req, res, next) => {
  bcrypt.hash(req.body.password, 10)
    .then(hash => {
      const user = new User({
        email: req.body.email,
        password: hash
      })
      user.save()
        .then(() => res.status(201).json({ message: 'Utilisateur créée !' }))
        .catch(error => res.status(400).json({ error }))
    })
    .catch(error => res.status(500).json({ error }))
}

exports.login = (req, res, next) => {
  User.findOne({ email: req.body.email })
    .then(user => {
      if (!user) {
        return res.status(401).json({ error: 'Utilisateur non trouvé !' })
      }
      bcrypt.compare(req.body.password, user.password)
        .then(valid => {
          if (!valid) {
            return res.status(401).json({ error: 'Mot de passe incorrect !' })
          }
          res.status(200).json({
            userId: user._id,
            token: jwt.sign(
              { userId: user._id },
              process.env.AUTH_TOKEN,
              { expiresIn: '24h' }
            )
          })
        })
        .catch(error => res.status(500).json({ error }))
    })
    .catch(error => res.status(500).json({ error }))
}

exports.readOneUser = (req, res, next) => {
  User.findOne({ _id: req.params.id })
    .then(user => res.status(200).json(user))
    .catch(error => res.status(404).json({ error }))
}

exports.readAllUsers = (req, res, next) => {
  User.find()
    .then(users => res.status(200).json(users))
    .catch(error => res.status(400).json({ error }))
}

exports.updateUser = (req, res, next) => {
  const userObject = req.file
    ? {
        ...JSON.parse(req.body.user),
        avatarUrl: `${req.protocol}://${req.get('host')}/images/${req.file.filename}`
      }
    : {
        ...req.body
      }
  User.updateOne({ _id: req.params.id }, { ...userObject, _id: req.params.id })
    .then(user => res.status(200).json({ message: 'Utilisateur modifié !' }))
    .catch(error => res.status(404).json({ error }))
}

exports.deleteUser = (req, res, next) => {
  User.findOne({ _id: req.params.id })
    .then(user => {
      const filename = user.avatarUrl.split('/images/')[1]
      fs.unlink(`images/${filename}`, () => {
        User.deleteOne({ _id: req.params.id })
          .then(() => res.status(200).json({ message: 'Utilisateur supprimé !' }))
          .catch(error => res.status(400).json({ error }))
      })
    })
    .catch(error => res.status(500).json({ error }))
}
