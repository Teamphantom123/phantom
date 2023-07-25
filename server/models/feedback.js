const mongoose = require('mongoose')

// Feedback schema
const feedBackSchema = mongoose.Schema({
    question: {
        type: String,
        required: true,
        unique: true
    },
    generalFeedback: {
        type: Boolean,
        default: false
    },
    feedBackList: {
        type: Array,
        haveComments: {
            required: true,
            type: Boolean,
            default: false
        },
        pathway: {
            type: String,
            required: false
        },
        feedBack: {
            required: false,
            type: String
        }
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
feedBackSchema.pre('updateMany', function (next) {
    const feedBack = this.getUpdate()
    // UpdatedAt
    feedBack.updatedAt = new Date()
    next()
})

module.exports = mongoose.model('Feedback', feedBackSchema)
