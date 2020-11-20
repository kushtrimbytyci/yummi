const asyncHandler = require('../helpers/asyncHandler')
const errorHandler = require('../helpers/errorHandler')
const Products = require('../models/Products')


exports.getAll = asyncHandler(async (req, res, next) => {
    const data = await Products.findAll()
    res.status(200).json({ success: true, data })
})


exports.createProduct = asyncHandler(async (req, res, next) => {

    await Products.bulkCreate(req.body)
    res.status(200).json({ success: true })
})