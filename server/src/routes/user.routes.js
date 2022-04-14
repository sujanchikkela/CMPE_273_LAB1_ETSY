const express = require('express')
const router = express.Router()

const UserController = require('../controllers/UserController')
const AuthController = require('../controllers/AuthController')
const ProductController = require('./../controllers/ProductController')
const OrderController = require('./../controllers/OrderController')
const auth = require('../../middleware/auth')

router.post('/register',UserController.createUser)
router.post('/login',AuthController.login)
router.post('/update-profile',auth,UserController.updateUser)
router.post('/add-to-favorites',auth,UserController.addToFavorites)
router.post('/remove-from-favorites',auth,UserController.removeFromFavorites)
router.post('/myFavorites',auth,UserController.myFavorites)
router.get('/my-favorites/:id/:productId',auth,UserController.searchFavorite)
router.get('/product/:id',auth,ProductController.getProductById)
router.post('/myorders',auth,OrderController.myOrders)

//auth 
router.post('/auth',auth,AuthController.getUserDetails)


module.exports = router