const User = require('../models/user')

// Create an new users
const post = async (users) => {
    try {
        const result = await User.insertMany(users)
        console.log(`User created succesfully, ${JSON.stringify(result)}`)
        return result
    } catch (err) {
        console.error(`Failed to create user, ${err}`)
        throw err
    }
}

// Update an user by id
const update = async (query, user) => {
    try {
        delete user._id
        const result = await User.updateMany(query, user)
        console.log(`User updated succesfully, ${JSON.stringify(result)}`)
        return result
    } catch (err) {
        console.error(`Failed to update user, ${err}`)
        throw err
    }
}

// Get user by query param
const getByQuery = async (query) => {
    try {
        const result = await User.find(query).sort({ _id: -1 })
        console.log(`User fetched successfully , ${JSON.stringify(result)}`)
        return result
    } catch (err) {
        console.error(`Failed to fetch user , ${err}`)
        throw err
    }
}

module.exports = {
    post,
    getByQuery,
    update
}
