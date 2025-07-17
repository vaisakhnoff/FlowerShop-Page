const express = require('express');
const router = express.Router();
const userController = require('../controllers/user/userController')


router.get('/',userController.getHome);
router.get('/product',userController.getProductDetail);
router.get('/favourites', userController.getFavorites);
router.get('/contact', userController.getContact);
router.get('/shop', userController.getshopPage) // Changed from /shopPage to /shop


module.exports = router;