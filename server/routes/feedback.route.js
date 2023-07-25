const express = require('express')
const router = express.Router()
const feedBackService = require('../services/feedback.service')

router.post('/', feedBackService.createFeedback)
router.get('/', feedBackService.getByQuery)
router.put('/', feedBackService.updateFeedback)
router.delete('/', feedBackService.deleteByQuery)
router.post('/comments', feedBackService.createFeedbackComments)

module.exports = router
