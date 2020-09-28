// Import Mongoose Module
const mongoose = require('mongoose')

// Create User Schema
const UserSchema = mongoose.Schema({
    userName: {
        type: String,
        required: true
    },
    userEmail: {
        type: String,
        required: true
    }
})

// Export User Schema
// Step4: User mongoose.model Instead Of Direct Export To Prevent 'User is not a constructor' Error
// 'User' Is Capitalize As In 'index.js' We Import UserSchema As 'User'
module.exports = mongoose.model('User', UserSchema)

