const express = require('express')
const router = express.Router()
const { createOrder, getOrders, updateOrder } = require('../controllers/orders')
const { protect } = require('../middlewares/auth')


router.route('/createorder').post(createOrder)
router.route('/getorders').get(protect, getOrders)
router.route('/updateorder').put(updateOrder)

module.exports = router;