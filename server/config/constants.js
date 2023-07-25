const SERVER = {
    NON_SSL_PORT: 3001,
    DATABASE_NAME: 'ClinicalPathway'
}

const MESSAGE = {
    INVALID_USER: "User / Email ID not found",
    INVALID_QUERY: "Invalid Query",
    USER_CREATE: {
        SUCCESS: 'User(s) created successfully',
        FAILED: 'Failed to create user(s)'
    },
    USER_READ: {
        SUCCESS: 'User(s) fetched successfully',
        FAILED: 'Failed to fetch user(s)'
    },
    USER_UDPATE: {
        SUCCESS: 'User updated successfully',
        FAILED: 'Failed to update user'
    },
    FEEDBACK_CREATE: {
        SUCCESS: 'Feedback(s) created successfully',
        FAILED: 'Failed to create feedback(s)'
    },
    FEEDBACK_READ: {
        SUCCESS: 'Feedback(s) fetched successfully',
        FAILED: 'Failed to fetch feedback(s)'
    },
    FEEDBACK_UDPATE: {
        SUCCESS: 'Feedback updated successfully',
        FAILED: 'Failed to update feedback'
    },
    FEEDBACK_DELETE: {
        SUCCESS: 'Feedback deleted successfully',
        FAILED: 'Failed to deleted feedback'
    },
    PATHWAY_CREATE: {
        SUCCESS: 'Pathway(s) created successfully',
        FAILED: 'Failed to create pathway(s)'
    },
    PATHWAY_READ: {
        SUCCESS: 'Pathway(s) fetched successfully',
        FAILED: 'Failed to fetch pathway(s)'
    },
    PATHWAY_UDPATE: {
        SUCCESS: 'Pathway updated successfully',
        FAILED: 'Failed to update pathway'
    },
    PATHWAY_DELETE: {
        SUCCESS: 'Pathway deleted successfully',
        FAILED: 'Failed to deleted pathway'
    },
    LOGIN: {
        SUCCESS: 'Login successful',
        FAILED: 'Login failed',
        INVALID_PASSWORD: 'Invalid password (or) Please enter a valid password',
        APPROVAL_STATUS_REJECT: 'Your approval status is "REJECTED" in state. Please contact administator for more details.',
        APPROVAL_STATUS_PENDING: 'Your approval status is "PENDING" in state. Please contact administator for more details.',
        INVALID_USER_NAME: 'Invalid username / Email ID (or) Please enter a valid username / Email ID'
    },

}

const EMAIL = {
    DONOT_REPLY_EMAIL_ID: 'familydoctor2002@gmail.com', // To be updated later
    AUTH_EMAIL_ID: 'familydoctor2002@gmail.com', // To be updated later
    AUTH_APP_PASSWORD: 'blcwwczvnqbgovcl', // To be updated later
    EMAIL_SERVICE: 'gmail',
    APPLICATION_URL: '' // To be updated later
}

const ADMIN_DEFAULT_DATA = {
    firstName: 'Admin',
    lastName: 'Admin',
    userName: 'admin',
    password: 'Admin@123',
    emailId: 'familydoctor2002@gmail.com',
    designation: 'Admin',
    govtIDNumber: "admin",
    approvalStatus: "APPROVED",
    mobile: '9999999999',
    isAdmin: 'GRANTED'
}

const ON_LOAD_FEEDBACK_QUESTIONS = [
    {
        generalFeedback: false,
        question: "Do you have an edit or update to suggest to an existing Roadmap ?"
    },
    {
        generalFeedback: true,
        question: "Do you have general feedback on RoadmapsPTBO ?"
    }
]

const ON_LOAD_PATHWAYS = [
    {
        "pathway": "Smoking-Cessation",
        "heading": "Smoking-Cessation",
        "visible": true
    },
    {
        "pathway": "Simplified-Dental-Pain",
        "heading": "Simplified-Dental-Pain",
        "visible": true
    }
]


module.exports = {
    SERVER,
    MESSAGE,
    ADMIN_DEFAULT_DATA,
    ON_LOAD_FEEDBACK_QUESTIONS,
    EMAIL,
    ON_LOAD_PATHWAYS
}
