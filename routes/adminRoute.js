const express = require('express');
const router = express.Router();
const upload = require('../config/multer');
const productController = require('../controllers/admin/productController');
const adminController = require('../controllers/admin/adminController');
const categoryController =  require('../controllers/admin/categoryController');
const adminAuth = (req, res, next) => {
    if (!req.session.admin) {
        return res.redirect('/admin/login');
    }
    next();
};


router.get('/login', adminController.getAdminLogin);
router.post('/login', adminController.postAdminLogin);
router.get('/dashboard', adminAuth, adminController.getDashboard);


// Update the products routes to handle multipart form data
router.post('/products', adminAuth, upload.array('images', 5), productController.addProduct);
router.put('/products/:id', adminAuth, upload.array('images', 5), productController.editProduct);
router.delete('/products/:id', adminAuth, productController.deleteProduct);
router.get('/products', adminAuth, productController.getProducts);


// ...existing routes...
router.get('/categories', adminAuth, categoryController.getCategories);
router.post('/categories', adminAuth, categoryController.addCategory);
router.put('/categories/:id', adminAuth, categoryController.editCategory);
router.delete('/categories/:id', adminAuth, categoryController.deleteCategory);


module.exports = router;