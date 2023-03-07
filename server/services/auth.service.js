const userCrud = require('../crud/user.crud')
const { MESSAGE } = require('../config/constants')

// Authenticate login user
const login = async (req, res) => {
    try {
        if (!req.body.userName) return res.status(400).json({ message: MESSAGE.LOGIN.FAILED, body: MESSAGE.INVALID_USER_NAME })
        else if (!req.body.password) return res.status(400).json({ message: MESSAGE.LOGIN.FAILED, body: MESSAGE.LOGIN.INVALID_PASSWORD })

        const userName = req.body.userName
        const password = req.body.password

        // Fetch the user
        const user = await userCrud.getByQuery({ userName: userName })
        if (!user.length) return res.status(404).send({ message: MESSAGE.LOGIN.FAILED, body: `${MESSAGE.INVALID_USER_NAME}` })

        // Matching password
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
