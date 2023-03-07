// importing modules
const express = require('express')
const mongoose = require('mongoose')
const bodyparser = require('body-parser')
const cors = require('cors')
const app = express()

const { SERVER, ADMIN_DEFAULT_DATA, USER_DEFAULT_DATA } = require('./config/constants')

const IP = '127.0.0.1'

mongoose.set('useCreateIndex', true)
mongoose.set('useUnifiedTopology', true)

// Import routes
const userRoute = require('./routes/user.route')
const authRoute = require('./routes/auth.route')

// Connect to mongodb
mongoose.connect('mongodb://adminuser:Admin%40pwd@147.182.152.183:27017:ClinicalPathway', { useNewUrlParser: true })

// on connection
mongoose.connection.on('connected', (err) => {
    if (err) console.error(`Mongo Connection Failed: \n ${err}`)
    console.log('MongoDB connected successfully.')
})

const port = {
    SSL: SERVER.SSL_PORT,
    NON_SSL: SERVER.NON_SSL_PORT
}

// Adding middleware
app.use(cors())
app.use(bodyparser.json())
app.use('/api/users', userRoute);
app.use('/api/auth', authRoute)

// Test API
app.get('/', (req, res) => {
    res.send('Hello Node JS!')
})


// Create a admin user (if not exists) on app initialization
const User = require('./models/user')
async function adminUserCreation() {
    const admin = await User.find({ userName: 'admin_123' })
    if (admin.length) return // User already exists
    // Admin data
    const adminObj = ADMIN_DEFAULT_DATA
    const newUser = new User(adminObj)
    const result = await newUser.save() // Create a admin user
    result ? console.log('Admin user created succesfully') : console.error('Failed to create admin user')
} adminUserCreation();


// Create a user (if not exists) on app initialization
async function UserCreation() {
    const user = await User.find({ userName: 'user_123' })
    if (user.length) return // User already exists
    // user data
    const userObj = USER_DEFAULT_DATA
    const newUser = new User(userObj)
    const result = await newUser.save() // Create a admin user
    result ? console.log('User created succesfully') : console.error('Failed to create user')
} UserCreation();


// [For http]
// Create a server
app.listen(port.NON_SSL, (err, res) => {
    if (err) console.error(`Failed to start node server: ${err}`)
    console.log(` [HTTP] => Node is running at http://${IP}:${port.NON_SSL}`)
})
