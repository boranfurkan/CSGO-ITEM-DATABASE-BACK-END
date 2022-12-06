const User = require('../models/User')
const { StatusCodes } = require('http-status-codes')
const { BadRequestError, UnauthenticatedError } = require('../errors')

const register = async (req, res) => {
    const user = await User.create({ ...req.body })
    const token = user.createJWT()
    res.status(StatusCodes.CREATED).json({ user: { username: user.getUsername() }, token })
}

const login = async (req, res) => {

    const { username, password } = req.body
    if (!username || !password) {
        throw new BadRequestError('Missing username or password')
    }

    const user = await User.findOne({ username })
    if (!user) {
        throw new UnauthenticatedError('Invalid username or password')
    }

    const isPasswordCorrect = await user.comparePassword(password)
    if (!isPasswordCorrect) {
        throw new UnauthenticatedError('Invalid username or password')
    }

    const token = user.createJWT()
    res.status(StatusCodes.OK).json({
        user: {
            username: user.getUsername()
        },
        token
    })
}

module.exports = {
    register,
    login
}