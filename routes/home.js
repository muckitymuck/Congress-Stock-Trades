const express = require('express')
const router = express.Router()
const homeController = require('../controllers/home')
const authController = require(('../controllers/auth'))

router.get('/', homeController.getIndex)

module.exports = router