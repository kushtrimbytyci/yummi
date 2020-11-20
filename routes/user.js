const express = require('express')
const router = express.Router()
const { createUser } = require('../controllers/user')


router.route('/createuser').post(createUser)


module.exports = router;

