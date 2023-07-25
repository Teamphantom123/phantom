const { MESSAGE } = require('../config/constants')
const userCrud = require('../crud/user.crud')
const emailService = require('../services/email.service');

// Create an new user
const createUsers = async (req, res) => {
    try {
        const result = await userCrud.post(req.body)
        var emailSent = false;
        console.log(`User created succesfully, ${JSON.stringify(result)}`);

        //Send Email 
        const _result = await userCrud.getByQuery({ isAdmin: 'GRANTED' })
        if (!_result.length)
            return res.status(404).send({ message: MESSAGE.USER_READ.FAILED, body: `${MESSAGE.INVALID_QUERY}: ${JSON.stringify(req.query)}` })

        req.body[0]['emailIdList'] = _result.map(res => res.emailId);
        req.body[0]['reqOnReviewApprovalStatus'] = true;

        const isEmailSent = await emailService.sendMail(req.body[0])
        console.log(`isEmailSent: ${isEmailSent.emailSent}`);
        if (isEmailSent) emailSent = isEmailSent.emailSent;

        return res.send({ message: MESSAGE.USER_CREATE.SUCCESS, body: null, emailSent: emailSent ? emailSent : false })
    } catch (err) {
        console.error(`Failed to create user, ${err}`)
        return res.status(500).send({ message: MESSAGE.USER_CREATE.FAILED, body: `${err}` })
    }
}

// Fetch user by query
const getByQuery = async (req, res) => {
    try {
        const result = await userCrud.getByQuery(req.query ? req.query : {})
        if (!result.length) {
            return res.status(404).send({ message: MESSAGE.USER_READ.FAILED, body: `${MESSAGE.INVALID_QUERY}: ${JSON.stringify(req.query)}` })
        }

        console.log(`User fetched successfully , ${JSON.stringify(result)}`)
        return res.send({ message: MESSAGE.USER_READ.SUCCESS, body: result })
    } catch (err) {
        console.error(`Failed to fetch user , ${err}`)
        return res.status(500).send({ message: MESSAGE.USER_READ.FAILED, body: `${err}` })
    }
}

// Update an user by id
const updateUser = async (req, res) => {
    try {
        let _result;
        if (req.body['password']) {  //Prepare query for Password Reset
            // Check for username
            _result = await userCrud.getByQuery({ userName: req.query.__user })
            if (!_result.length) {
                // Check for emailId
                _result = await userCrud.getByQuery({ emailId: req.query.__user });
                if (!_result.length)
                    return res.status(404).send({ message: MESSAGE.USER_UDPATE.FAILED, body: `${MESSAGE.INVALID_USER} ` })
            }
        }

        else {
            _result = await userCrud.getByQuery(req.query ? req.query : {})
            if (!_result.length) return res.status(404).send({ message: MESSAGE.USER_UDPATE.FAILED, body: `${MESSAGE.INVALID_USER} ` })
        }

        if (req.body['approvalStatus']) { // Approve Status
            console.log("Request coming for approve status!")
            req.body['reqOnUpdateApprovalStatus'] = true;
        }

        if (req.body['isAdmin']) { // Approve Status
            console.log("Request coming for grant/deny admin access!")
            req.body['reqOnGrantAdminAccess'] = true;
        }

        if (req.body['password']) { //Password Reset
            console.log("Request coming for password reset!")
            req.body['reqOnPasswordReset'] = true;
            req.body['emailId'] = _result[0].emailId;
            req.query = { _id: _result[0]._id }
        }

        req.body['emailIdList'] = _result[0].emailId;

        const result = await userCrud.update(req.query ? req.query : {}, req.body)
        console.log(`User updated succesfully, ${JSON.stringify(result)} `);

        //Send Email if Approve/Reject or passwordReset
        var emailSent = false;
        if (req.body['reqOnUpdateApprovalStatus'] || req.body['reqOnPasswordReset'] || req.body['reqOnGrantAdminAccess']) {
            console.log("Email require to send!")
            const isEmailSent = await emailService.sendMail(req.body)
            console.log(`isEmailSent: ${isEmailSent.emailSent} `);
            if (isEmailSent) emailSent = isEmailSent.emailSent;
        } else console.log("Email not require to send!")

        return res.send({ message: MESSAGE.USER_UDPATE.SUCCESS, body: null, emailSent: emailSent ? emailSent : false })
    } catch (err) {
        console.error(`Failed to create user, ${err} `)
        return res.status(500).send({ message: MESSAGE.USER_UDPATE.FAILED, body: `${err} ` })
    }
}

module.exports = {
    createUsers,
    getByQuery,
    updateUser
}
