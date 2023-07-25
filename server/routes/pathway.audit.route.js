const express = require('express')
const router = express.Router()
const pathwayAuditService = require('../services/pathway.audit.service')

router.get('/', pathwayAuditService.getByQuery)

module.exports = router
