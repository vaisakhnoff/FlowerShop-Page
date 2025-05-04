const express = require('express');
const router = express.Router();
const userController = require('../controllers/user/userController')


router.get('/',userController.getHome);
router.get('/product',userController.getProductDetail);
router.get('/favorites', userController.getFavorites);
router.get('/categories', userController.getCategories);
router.get('/contact', userController.getContact);


module.exports = router;