const asyncHandler = require('../helpers/asyncHandler')
const errorHandler = require('../helpers/errorHandler')
const User = require('../models/User')



//Create user
exports.createUser = asyncHandler(async (req, res, next) => {
    const { username, password, name, address, zip, city } = req.body
    let user = await User.findOne({
        where: {
            username
        }
    })
    if (user) {
        return next(new errorHandler('User already exists', 401))
    }
    user = await User.create({ username, password, name, address, zip, city })
    delete user.dataValues['password']
    sendTokenResponse(user, 200, res)

})




const sendTokenResponse = (user, statusCode, res) => {
    const token = user.getSignedJwtToken()

    const options = {
        expires: new Date(Date.now() + process.env.JWT_COOKIE_EXPIRE * 24 * 60 * 60 * 1000),
        httpOnly: true
    }

    res.status(statusCode).cookie('token', token, options).json({ success: true, token, user })
}