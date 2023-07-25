// importing modules
const express = require('express')
const mongoose = require('mongoose')
const bodyparser = require('body-parser')
const cors = require('cors')
const app = express()

const { SERVER, ADMIN_DEFAULT_DATA, ON_LOAD_FEEDBACK_QUESTIONS, ON_LOAD_PATHWAYS } = require('./config/constants')

const IP = 'localhost'

mongoose.set('useCreateIndex', true)
mongoose.set('useUnifiedTopology', true)

// Import routes
const userRoute = require('./routes/user.route')
const authRoute = require('./routes/auth.route')
const feedbackRoute = require('./routes/feedback.route')
const pathwayRoute = require('./routes/pathway.route')
const pathwayAuditRoute = require('./routes/pathway.audit.route')


mongoose.connect('mongodb://adminuser:Admin%40pwd@147.182.152.183:27017:ClinicalPathwiay', { useNewUrlParser: true })
// Connect to mongodb
// mongoose.connect(`mongodb://${IP}/${SERVER.DATABASE_NAME}`, { useNewUrlParser: true })
//mongoose.connect(`mongodb+srv://reshmashaik462:mongoAtlas786@cluster-free.4gppmvb.mongodb.net/${SERVER.DATABASE_NAME}`, { useNewUrlParser: true })
// mongoose.connect(`mongodb+srv://reshmashaik462:mongoAtlas786@cluster-free.4gppmvb.mongodb.net/test`)
// mongoose.connect(`mongodb://adminuser:${encodeURIComponent('Admin@pwd')}@147.182.152.183:27017:ClinicalPathway`, { useNewUrlParser: true })

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
app.use('/api/feedbacks', feedbackRoute)
app.use('/api/pathways', pathwayRoute)
app.use('/api/pathwaysAudit', pathwayAuditRoute)


// Test API
app.get('/', (req, res) => {
    res.send('Hello Node JS!')
})


// Create a admin user (if not exists) on app initialization
const User = require('./models/user')
async function adminUserCreation() {
    const admin = await User.find({ userName: 'admin' })
    if (admin.length) return // User already exists
    // Admin data
    const adminObj = ADMIN_DEFAULT_DATA
    const newUser = new User(adminObj)
    const result = await newUser.save() // Create a admin user
    result ? console.log('Admin user created succesfully') : console.error('Failed to create admin user')
}
adminUserCreation();

const Feedback = require('./models/feedback')
async function feedBackCreation() {
    const feedBackObj = ON_LOAD_FEEDBACK_QUESTIONS
    feedBackObj.forEach(async element => {
        const feedBack = await Feedback.find(element);
        if (feedBack.length) return
        const newFeedback = new Feedback(element)
        const result = await newFeedback.save() // Create a feedback
        result ? console.log('Feedback created succesfully') : console.error('Failed to create feedback')
    });
}
feedBackCreation();


const Pathway = require('./models/pathway')

async function pathwayCreation() {
    const pathwayObj = ON_LOAD_PATHWAYS
    pathwayObj.forEach(async element => {
        const pathway = await Pathway.find({ pathway: element.pathway });
        if (pathway.length) return
        const newPathway = new Pathway(element)
        const result = await newPathway.save()
        result ? console.log('Pathway created succesfully') : console.error('Failed to create pathway')
    });
}
pathwayCreation();

// [For http]
// Create a server
app.listen(port.NON_SSL, (err, res) => {
    if (err) console.error(`Failed to start node server: ${err}`)
    console.log(` [HTTP] => Node is running at http://${IP}:${port.NON_SSL}`)
})
