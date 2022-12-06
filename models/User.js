const mongoose = require('mongoose');
const bcrypt = require('bcryptjs')

const UserSchema = new mongoose.Schema({
    username: {
        type: String,
        required: [true, "Please provide a username!"],
        minlength: 3,
        maxlength: 20,
        unique: true,
        trim: true
    },
    password: {
        type: String,
        required: [true, "Please provide a password!"],
        minlength: 6,
    }
})

UserSchema.pre('save', async function() {
    const salt = await bcrypt.genSalt(10)
    this.password = await bcrypt.hash(this.password, salt)
})

UserSchema.methods.getUsername = function() {
    return this.username
}

module.exports = mongoose.model('User', UserSchema)