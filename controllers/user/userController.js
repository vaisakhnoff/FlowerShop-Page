const Product = require('../../model/products');
const Category = require('../../model/category');

const getHome = async (req, res) => {
    try {
        const categories = await Category.find({});
        const products = await Product.find({}).populate('categories');
        res.render('user/index', { 
            categories,
            products
        });
    } catch (error) {
        console.error('Home page error:', error);
        res.render('user/index', { 
            categories: [],
            products: [],
            error: 'Error loading data'
        });
    }
};

const getProductDetail = async (req, res) => {
    try {
        const productId = req.params.id;
        const product = await Product.findById(productId).populate('categories');
        
        if (!product) {
            return res.status(404).render('error', { 
                message: 'Product not found' 
            });
        }

        // Get similar products from same category
        const similarProducts = await Product.find({
            categories: { $in: product.categories },
            _id: { $ne: product._id }
        })
        .limit(4)
        .populate('categories')
        .lean(); // Use lean() for better performance

        // Map similar products to include required fields
        const mappedSimilarProducts = similarProducts.map(p => ({
            id: p._id,
            name: p.name,
            price: p.price,
            image: p.images && p.images.length > 0 ? 
                   `<img src="${p.images[0].path}" class="w-full h-full object-cover"/>` : 
                   '🌸'
        }));

        res.render('user/product', { 
            product,
            similarProducts: mappedSimilarProducts
        });
    } catch (error) {
        console.error('Product detail error:', error);
        res.render('error', { 
            message: 'Error loading product details' 
        });
    }
}

const getFavorites = async (req, res) => {
    res.render('favorites');
}

const getContact = async (req, res) => {
    res.render('contact');
}


const getshopPage = async (req, res) => {
    try {
        const { category } = req.query;
        let products;
        
        if (category && category !== 'all') {
            products = await Product.find({ 
                categories: { $in: [category] } 
            }).populate('categories');
        } else {
            products = await Product.find({}).populate('categories');
        }
        
        const categories = await Category.find({});
        
        res.render('user/shopPage', { 
            products, 
            categories,
            selectedCategory: category || 'all',
            error: null
        });
    } catch (error) {
        console.error('Shop page error:', error);
        res.render('user/shopPage', { 
            products: [], 
            categories: [],
            selectedCategory: null,
            error: 'Error loading products'
        });
    }
};

module.exports = {
    getHome,
    getProductDetail,
    getFavorites,
    getContact,
    getshopPage
};