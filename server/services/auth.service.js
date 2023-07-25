const userCrud = require('../crud/user.crud')
const { MESSAGE } = require('../config/constants')

// Authenticate login user
const login = async (req, res) => {
    try {
        if (!req.body._user) return res.status(400).json({ message: MESSAGE.LOGIN.FAILED, body: MESSAGE.LOGIN.INVALID_USER_NAME })
        else if (!req.body.password) return res.status(400).json({ message: MESSAGE.LOGIN.FAILED, body: MESSAGE.LOGIN.INVALID_PASSWORD })

        const password = req.body.password

        // Fetch the user
        var user;
        user = await userCrud.getByQuery({ userName: req.body._user })
        if (!user.length) {
            user = await userCrud.getByQuery({ emailId: req.body._user })
            if (!user.length)
                return res.status(404).send({ message: MESSAGE.LOGIN.FAILED, body: `${MESSAGE.LOGIN.INVALID_USER_NAME}` })
        }
        if (user[0].approvalStatus == 'PENDING') return res.status(403).send({ message: MESSAGE.LOGIN.FAILED, body: `${MESSAGE.LOGIN.APPROVAL_STATUS_PENDING}` })
        if (user[0].approvalStatus == 'REJECTED') return res.status(403).send({ message: MESSAGE.LOGIN.FAILED, body: `${MESSAGE.LOGIN.APPROVAL_STATUS_REJECT}` })

        // Matching password
        console.log(user[0].password)
        const isMatch = await user[0].comparePassword(password, user[0].password)
        console.log(isMatch)
        if (!isMatch) return res.status(401).send({ message: MESSAGE.LOGIN.FAILED, body: MESSAGE.LOGIN.INVALID_PASSWORD })

        return res.send({ message: MESSAGE.LOGIN.SUCCESS, body: true, user: user[0] })
    } catch (err) {
        console.error(`Failed to login, ${err}`)
        return res.status(500).send({ message: MESSAGE.LOGIN.FAILED, body: `${err}` })
    }
}


module.exports = {
    login
}
