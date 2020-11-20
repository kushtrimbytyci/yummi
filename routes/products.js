const express = require('express')
const router = express.Router()
const { getAll, createProduct } = require('../controllers/products')

router.route('/allproducts').get(getAll)
router.route('/createproducts').post(createProduct)




module.exports = router;
