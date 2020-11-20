const asyncHandler = require('../helpers/asyncHandler')
const errorHandler = require('../helpers/errorHandler')
const User = require('../models/User')



exports.login = asyncHandler(async (req, res, next) => {
    const { username, password } = req.body
    let user = await User.findOne({
        where: {
            username
        },
        attributes: {
            include: ['password']
        }
    })
    if (!user) {
        return next(new errorHandler("No user with the given username exists", 401))
    }
    const isMatch = await user.validPassword(password)

    if (!isMatch) {
        return next(new errorHandler('Wrong password'))
    }
    delete user.dataValues['password']
    sendTokenResponse(user, 200, res)
})


exports.getMe = asyncHandler(async (req, res, next) => {
    res.status(200).json({ success: true, data: req.user })
})



const sendTokenResponse = (user, statusCode, res) => {
    const token = user.getSignedJwtToken()

    const options = {
        expires: new Date(Date.now() + process.env.JWT_COOKIE_EXPIRE * 24 * 60 * 60 * 1000),
        httpOnly: true
    }

    res.status(statusCode).cookie('token', token, options).json({ success: true, token, user })
}