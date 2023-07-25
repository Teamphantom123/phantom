const mongoose = require('mongoose')
const bcrypt = require('bcrypt')
const SALT_WORK_FACTOR = 10

const emailPattern = function (email) {
    const regex = /[^\s@]+@[^\s@]+\.[^\s@]+/;
    return regex.test(email)
}

const mobilePattern = function (mobile) {
    const regex = /^(\+\d{1,3}[- ]?)?\d{10}$/;
    return regex.test(mobile)
}

// User schema
const UserSchema = mongoose.Schema({
    userName: {
        type: String,
        required: true,
        unique: true
    },
    firstName: {
        type: String,
        required: true
    },
    lastName: {
        type: String,
        required: true
    },
    emailId: {
        type: String,
        required: true,
        unique: true,
        validate: emailPattern
    },
    password: {
        type: String,
        required: true
    },
    mobile: {
        type: String,
        required: true,
        validate: mobilePattern
    },
    designation: {
        type: String,
        required: true,
        enum: ['Doctor', 'Nurse Practioner', 'Admin'],
    },
    isAdmin: {
        type: String,
        required: true,
        enum: ['DENIED', 'GRANTED', 'PENDING'],
        default: "PENDING"
    },
    govtIDNumber: {
        type: String,
        required: true
    },
    approvalStatus: {
        type: String,
        required: true,
        enum: ['APPROVED', 'REJECTED', 'PENDING'],
        default: 'PENDING'
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

// Convert to hash password before saving to db
UserSchema.pre('insertMany', async function (next, docs) {
    if (Array.isArray(docs) && docs.length) {
        const hashedUsers = docs.map(async (user) => {
            return await new Promise((resolve, reject) => {
                bcrypt.genSalt(10).then((salt) => {
                    const password = user.password.toString()
                    bcrypt.hash(password, salt).then(hash => {
                        user.password = hash
                        resolve(user)
                    }).catch(e => reject(e))
                }).catch(e => reject(e))
            })
        })
        docs = await Promise.all(hashedUsers)
        next()
    } else return next(new Error('User list should not be empty')) // lookup early return pattern
})

// Convert to hash password before saving to db
UserSchema.pre('save', function (next) {
    const user = this
    if (user.password) { // If password exists
        bcrypt.genSalt(SALT_WORK_FACTOR, function (err, salt) {
            if (err) return next(err)
            // hash the password using our new salt
            bcrypt.hash(user.password, salt, function (err, hash) {
                if (err) return next(err)
                // Override the cleartext password with the hashed one
                user.password = hash
                next()
            })
        })
    } else next()
})


// Compare the password and return 'true' if matches
UserSchema.methods.comparePassword = async (enteredPassword, actualPassword) => {
    console.log(enteredPassword + " .. " + actualPassword)
    const isMatch = await bcrypt.compare(enteredPassword, actualPassword)
    return !!(isMatch)
}

// Convert to hash password, and udpate the updateddate before updating to db
UserSchema.pre('updateMany', function (next) {
    const user = this.getUpdate()
    // UpdatedAt
    user.updatedAt = new Date()
    if (user.password) { // If password exists
        bcrypt.genSalt(SALT_WORK_FACTOR, function (err, salt) {
            if (err) return next(err)
            // hash the password using our new salt
            bcrypt.hash(user.password, salt, function (err, hash) {
                if (err) return next(err)
                // Override the cleartext password with the hashed one
                user.password = hash
                next()
            })
        })
    } else next()
})

module.exports = mongoose.model('User', UserSchema)
