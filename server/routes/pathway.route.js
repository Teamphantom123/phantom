const express = require('express')
const router = express.Router()
const pathwayService = require('../services/pathway.service')

router.post('/', pathwayService.createPathway)
router.get('/', pathwayService.getByQuery)
router.put('/', pathwayService.updatePathway)
router.delete('/', pathwayService.deleteByQuery)

module.exports = router
