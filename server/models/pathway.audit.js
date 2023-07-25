const mongoose = require('mongoose')
var Schema = mongoose.Schema;

// Pathway schema
const pathwayAuditSchema = mongoose.Schema({
    dataUpdated: {
        type: Boolean,
        default: false
    },
    __pId: {
        type: String
    },
    pathway: {
        type: String,
        required: true,
        unique: true
    },
    heading: {
        type: String,
        required: true
    },
    visible: {
        type: Boolean,
        default: true
    },
    accordians: {
        type: Schema.Types.Mixed,
        default: []
    },
    createdAt: {
        type: Date,
        required: true,
        default: Date.now
    },
    updatedAt: {
        type: Date,
        required: false
    }
})

// Udpate the updateddate before updating to db
pathwayAuditSchema.pre('updateMany', function (next) {
    const pathwayAudit = this.getUpdate()
    // UpdatedAt
    pathwayAudit.updatedAt = new Date()
    next()
})

module.exports = mongoose.model('PathwayAudit', pathwayAuditSchema)
