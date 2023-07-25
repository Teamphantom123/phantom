const mongoose = require('mongoose')
var Schema = mongoose.Schema;

// Pathway schema
const pathwaySchema = mongoose.Schema({
    dataUpdated: {
        type: Boolean,
        default: false
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
pathwaySchema.pre('updateMany', function (next) {
    const pathway = this.getUpdate()
    // UpdatedAt
    pathway.updatedAt = new Date()
    next()
})

module.exports = mongoose.model('Pathway', pathwaySchema)
