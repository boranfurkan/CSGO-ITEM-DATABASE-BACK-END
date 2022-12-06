const User = require('../models/User')
const {StatusCodes} = require('http-status-codes')
const {BadRequestError} = require('../errors')
const jwt = require('jsonwebtoken')

const register = async (req, res) => {
    const user = await User.create({ ...req.body })
    const token = jwt.sign({userId: user._id, username: user.username}, "jwtsecret", {expiresIn: '30d'})
    res.status(StatusCodes.CREATED).json({ user: {username: user.getUsername()}, token })
}

const login = async (req, res) => {
    res.send("Login user")
}

module.exports = {
    register,
    login
}