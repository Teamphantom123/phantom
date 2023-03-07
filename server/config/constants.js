const SERVER = {
    NON_SSL_PORT: 3001,
    DATABASE_NAME: 'ClinicalPathway'
}

const MESSAGE = {
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
    LOGIN: {
        SUCCESS: 'Login successful',
        FAILED: 'Login failed',
        INVALID_PASSWORD: 'Invalid password (or) Please enter a valid password'
    },
    INVALID_USER_NAME: 'Invalid username (or) Please enter a valid username'
}

const ADMIN_DEFAULT_DATA = {
    firstName: 'Admin',
    lastName: 'Name',
    userName: 'admin',
    password: 'Admin@123',
    emailId: 'admin@flemingcollege.ca',
    mobile: '9999999999'
}

const USER_DEFAULT_DATA = {
    firstName: 'User',
    lastName: 'Name',
    userName: 'user',
    password: 'User@123',
    emailId: 'user@flemingcollege.ca',
    mobile: '9999999999'
}

module.exports = {
    SERVER,
    MESSAGE,
    ADMIN_DEFAULT_DATA,
    USER_DEFAULT_DATA
}
