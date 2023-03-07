const express = require('express')
const router = express.Router()
const userService = require('../services/user.service')

router.post('/', userService.createUsers)
router.get('/', userService.getByQuery)
router.put('/:id', userService.updateUser)
module.exports = router
