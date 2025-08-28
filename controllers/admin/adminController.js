const Product = require('../../model/products');
const Category = require('../../model/category');

const adminCredentials = {
    email: 'admin@flower.com',
    password: 'admin123'
};

const getAdminLogin = async (req, res) => {
    try {
        res.render('admin/login', { error: null });
    } catch (error) {
        console.error('Login page error:', error);
        res.status(500).send('Error loading login page');
    }
};

const postAdminLogin = async (req, res) => {
    try {
        const { email, password } = req.body;
        
        if (email === adminCredentials.email && password === adminCredentials.password) {
            req.session.admin = true;
            res.redirect('/admin/dashboard');
        } else {
            res.render('admin/login', { error: 'Invalid credentials' });
        }
    } catch (error) {
        console.error('Login error:', error);
        res.render('admin/login', { error: 'Error during login' });
    }
};

const getDashboard = async (req, res) => {
    try {
        if (!req.session.admin) {
            return res.redirect('/admin/login');
        }
        
        const products = await Product.find({}).populate('categories');
        const categories = [...new Set(products.map(p => p.category))];
        
        res.render('admin/dashboard', { 
            products,
            categories,
            error: null 
        });
    } catch (error) {
        console.error('Dashboard error:', error);
        res.render('admin/dashboard', { 
            products: [], 
            categories: [],
            error: 'Error loading dashboard'
        });
    }
};







module.exports = {
    getAdminLogin,
    postAdminLogin,
    getDashboard,
  
};