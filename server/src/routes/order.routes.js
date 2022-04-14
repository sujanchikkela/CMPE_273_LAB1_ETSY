const express = require('express')
const router = express.Router()

const SellerController = require('./../controllers/SellerController')
const ProductController = require('./../controllers/ProductController')
const OrderController = require('./../controllers/OrderController')
const CartController = require('./../controllers/CartController')

const auth = require('../../middleware/auth')

router.post('/place-order',auth,OrderController.placeOrder)
router.post('/add-to-cart',auth,CartController.addToCart)
router.post('/cart-items',auth,CartController.getCartItems)
router.post('/cart/remove-item',auth,CartController.removeCartItem)

module.exports = router