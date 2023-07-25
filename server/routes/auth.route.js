const express = require('express')
const router = express.Router()
const authService = require('../services/auth.service')

// login
router.post('/login', authService.login)

module.exports = router
