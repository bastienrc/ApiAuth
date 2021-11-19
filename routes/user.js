const express = require('express')
const router = express.Router()

const userController = require('../controllers/user')
const auth = require('../middleware/auth')
const multer = require('../middleware/multer-config')

// Enregistrement et connexion
router.post('/signup', userController.signup)
router.post('/login', userController.login)

/*
/* Utilisateur
*/

router.get('/:id', auth, userController.readOneUser)
router.put('/:id', auth, multer, userController.updateUser)
router.delete('/:id', auth, userController.deleteUser)

/*
/* Administrateur
*/

router.get('/', auth, userController.readAllUsers)

module.exports = router
