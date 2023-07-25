const Feedback = require('../models/feedback')

// Create an new feedBack
const post = async (feedbacks) => {
    try {
        const result = await Feedback.insertMany(feedbacks)
        console.log(`>Feedbacks created succesfully, ${JSON.stringify(result)}`)
        return result
    } catch (err) {
        console.error(`Failed to create usefeedbacks, ${err}`)
        throw err
    }
}

// Update an feedback by id
const update = async (query, feedBack) => {
    try {
        delete feedBack._id
        const result = await Feedback.updateMany(query, feedBack)
        console.log(`Feedback updated succesfully, ${JSON.stringify(result)}`)
        return result
    } catch (err) {
        console.error(`Failed to update feedback, ${err}`)
        throw err
    }
}

// Get feedback by query param
const getByQuery = async (query) => {
    try {
        const result = await Feedback.find(query).sort({ _id: -1 })
        console.log(`Feedback fetched successfully , ${JSON.stringify(result)}`)
        return result
    } catch (err) {
        console.error(`Failed to fetch feedback , ${err}`)
        throw err
    }
}

// Get feedback by query param
const deleteByQuery = async (query) => {
    try {
        const result = await Feedback.remove(query)
        console.log(`Feedback fetched successfully , ${JSON.stringify(result)}`)
        return result
    } catch (err) {
        console.error(`Failed to delete feedback , ${err}`)
        throw err
    }
}

module.exports = {
    post,
    getByQuery,
    update,
    deleteByQuery
}
