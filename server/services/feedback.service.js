const { MESSAGE } = require('../config/constants')
const feedbackCrud = require('../crud/feedback.crud')

// Create an new feedback
const createFeedback = async (req, res) => {
    try {
        let obj = [];
        for (let i = 0; i < req.body.length; i++)
            obj[i] = { "question": req.body[i] };

        req.body = obj;
        const result = await feedbackCrud.post(req.body)
        console.log(`Feedback created succesfully, ${JSON.stringify(result)}`);

        return res.send({ message: MESSAGE.FEEDBACK_CREATE.SUCCESS, body: null })
    } catch (err) {
        console.error(`Failed to create feedback, ${err}`)
        return res.status(500).send({ message: MESSAGE.FEEDBACK_CREATE.FAILED, body: `${err}` })
    }
}

// Fetch feedback by query
const getByQuery = async (req, res) => {
    try {
        let result = await feedbackCrud.getByQuery(req.query ? req.query : {})
        if (!result.length)
            return res.status(404).send({ message: MESSAGE.FEEDBACK_READ.FAILED, body: `${MESSAGE.INVALID_QUERY}: ${JSON.stringify(req.query)}` })

        console.log(`Feedback fetched successfully , ${JSON.stringify(result)}`)
        return res.send({ message: MESSAGE.FEEDBACK_READ.SUCCESS, body: result })
    } catch (err) {
        console.error(`Failed to fetch feedback , ${err}`)
        return res.status(500).send({ message: MESSAGE.FEEDBACK_READ.FAILED, body: `${err}` })
    }
}

// Update an feedback by id
const updateFeedback = async (req, res) => {
    try {
        const _result = await feedbackCrud.getByQuery(req.query ? req.query : {})
        if (!_result.length)
            return res.status(404).send({ message: MESSAGE.FEEDBACK_UDPATE.FAILED, body: `${MESSAGE.INVALID_USER}` })

        const result = await feedbackCrud.update(req.query ? req.query : {}, req.body)
        console.log(`Feedback updated succesfully, ${JSON.stringify(result)}`);

        return res.send({ message: MESSAGE.FEEDBACK_UDPATE.SUCCESS, body: null })
    } catch (err) {
        console.error(`Failed to update feedback, ${err}`)
        return res.status(500).send({ message: MESSAGE.FEEDBACK_UDPATE.FAILED, body: `${err}` })
    }
}

const deleteByQuery = async (req, res) => {
    try {
        const _result = await feedbackCrud.getByQuery(req.query ? req.query : {})
        if (!_result.length)
            return res.status(404).send({ message: MESSAGE.FEEDBACK_UDPATE.FAILED, body: `${MESSAGE.INVALID_USER}` })

        const result = await feedbackCrud.deleteByQuery(req.query ? req.query : {}, req.body)
        console.log(`Feedback deleted succesfully, ${JSON.stringify(result)}`);

        return res.send({ message: MESSAGE.FEEDBACK_DELETE.SUCCESS, body: null })
    } catch (err) {
        console.error(`Failed to delete feedback, ${err}`)
        return res.status(500).send({ message: MESSAGE.FEEDBACK_DELETE.FAILED, body: `${err}` })
    }
}


const createFeedbackComments = async (req, res) => {
    try {

        for (let i = 0; i < req.body.length; i++) {

            let updateObj = {
                $addToSet: { "feedBackList": req.body[i].feedback }
            };

            console.log(`Comments Update Obj , ${JSON.stringify(updateObj)}`);

            let result = await feedbackCrud.update({ "question": req.body[i].question }, updateObj)
            console.log(`Feedback updated succesfully, ${JSON.stringify(result)}`);
        }

        return res.send({ message: MESSAGE.FEEDBACK_UDPATE.SUCCESS, body: null })
    } catch (err) {
        console.error(`Failed to update feedback, ${err}`)
        return res.status(500).send({ message: MESSAGE.FEEDBACK_UDPATE.FAILED, body: `${err}` })
    }
}

module.exports = {
    createFeedback,
    getByQuery,
    updateFeedback,
    deleteByQuery,
    createFeedbackComments
}
