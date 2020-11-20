const asyncHandler = require("../helpers/asyncHandler");
const errorHandler = require("../helpers/errorHandler");
const Products = require("../models/Products");
const Orders = require("../models/Orders");
const Product_orders = require("../models/Product_orders");

exports.createOrder = asyncHandler(async (req, res, next) => {
  const { UserId, total, address, items } = req.body;
  const order = await Orders.create({ UserId, total, address });
  items.forEach(async (e) => {
    await Product_orders.create({
      ProductId: e.id,
      OrderId: order.dataValues.id,
      price: e.price,
      product_name: e.product_name,
      quantity: e.quantity,
    });
  });
  res.status(201).json({ success: true, data: "Order created" });
});

exports.getOrders = asyncHandler(async (req, res, next) => {
  const { id } = req.query
  let data;
  if (req.user.type === 'admin') {
    data = await Orders.findAll({
      include: [Products],
      order: [
        ['id', 'DESC']
      ]
    })

  } else {
    data = await Orders.findAll({
      where: {
        UserId: id
      },
      order: [
        ['id', 'DESC']
      ],
      include: [Products]


    })
  }
  res.status(200).json({ success: true, data })
})

exports.updateOrder = asyncHandler(async (req, res, next) => {
  const order = await Orders.update({
    status: true
  },
    {
      where: {
        id: req.query.id
      }
    })
  if (!order) {
    return next(new errorHandler('Order does not exist', 400))
  }
  res.status(200).json({ success: true, data: order })
})