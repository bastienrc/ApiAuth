const express = require('express')
const router = express.Router()

const userController = require('../controllers/user')
const auth = require('../middleware/auth')
const multer = require('../middleware/multer-config')

router.post('/signup', userController.signup)
router.post('/login', userController.login)

router.put('/account/:id', auth, multer, userController.updateUser)
router.delete('/account/:id', auth, userController.deleteUser)
router.get('/account/:id', auth, userController.readOneUser)
router.get('/accounts/', auth, userController.readAllUsers)

module.exports = router
