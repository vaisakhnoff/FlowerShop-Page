const Product = require('../../model/products');
const Category = require('../../model/category');




// Add methods for product management
const addProduct = async (req, res) => {
    try {
        // Validate required fields
        if (!req.body.name?.trim()) {
            return res.status(400).json({ error: 'Product name is required' });
        }

        if (!req.body.categories) {
            return res.status(400).json({ error: 'Product category is required' });
        }

        const productData = {
            name: req.body.name.trim(),
            price: parseFloat(req.body.price) || 0,
            description: req.body.description?.trim() || '',
            categories: Array.isArray(req.body.categories) ? 
                req.body.categories : [req.body.categories],
            quantity: parseInt(req.body.quantity) || 0
        };

        // Handle uploaded images
        if (req.files && req.files.length > 0) {
            productData.images = req.files.map(file => ({
                filename: file.filename,
                path: `/uploads/products/${file.filename}`,
                isDefault: false
            }));
            // Set first image as default
            if (productData.images.length > 0) {  // Fixed: Added missing opening parenthesis
                productData.images[0].isDefault = true;
            }
        }

        const newProduct = new Product(productData);
        await newProduct.save();
        
        // Update category item count
        if (productData.categories.length > 0) {
            await Category.updateMany(
                { _id: { $in: productData.categories } },
                { $inc: { itemCount: 1 } }
            );
        }
        
        res.status(201).json({ 
            success: true, 
            product: await newProduct.populate('categories')
        });
    } catch (error) {
        console.error('Add product error:', error);
        res.status(500).json({ 
            error: error.message || 'Error adding product'
        });
    }
};

// Update getProducts to populate categories
const getProducts = async (req, res) => {
    try {
        const products = await Product.find({}).populate('categories');
        res.json(products);
    } catch (error) {
        console.error('Error fetching products:', error);
        res.status(500).json({ error: 'Error fetching products' });
    }
};


const editProduct = async (req, res) => {
    try {
        const { id } = req.params;
        
        // Find existing product first
        const existingProduct = await Product.findById(id);
        if (!existingProduct) {
            return res.status(404).json({ error: 'Product not found' });
        }

        // Create updates object with null coalescing
        const updates = {
            name: req.body?.name ?? existingProduct.name,
            price: req.body?.price ? parseFloat(req.body.price) : existingProduct.price,
            description: req.body?.description ?? existingProduct.description,
            categories: req.body?.categories ? 
                [req.body.categories] : 
                existingProduct.categories,
            quantity: req.body?.quantity ? 
                parseInt(req.body.quantity) : 
                existingProduct.quantity,
            images: [...(existingProduct.images || [])]
        };

        // Handle new uploaded images
        if (req.files?.length > 0) {
            const newImages = req.files.map(file => ({
                filename: file.filename,
                path: `/uploads/products/${file.filename}`,
                isDefault: false
            }));
            updates.images = [...updates.images, ...newImages];
        }

        // Handle deleted images
        if (req.body?.deletedImages) {
            try {
                const deletedImages = JSON.parse(req.body.deletedImages);
                updates.images = updates.images.filter(
                    img => !deletedImages.includes(img.filename)
                );
            } catch (error) {
                console.error('Error parsing deletedImages:', error);
            }
        }

        // Ensure at least one image is marked as default
        if (updates.images.length > 0 && !updates.images.some(img => img.isDefault)) {
            updates.images[0].isDefault = true;
        }

        const updatedProduct = await Product.findByIdAndUpdate(
            id, 
            updates,
            { new: true, runValidators: true }
        ).populate('categories');

        res.json(updatedProduct);
    } catch (error) {
        console.error('Edit product error:', error);
        res.status(500).json({ 
            error: 'Error updating product',
            details: error.message 
        });
    }
};

const deleteProduct = async (req, res) => {
    try {
        const { id } = req.params;
        const product = await Product.findById(id);
        
        if (!product) {
            return res.status(404).json({ error: 'Product not found' });
        }

        // Decrease category item count
        if (product.categories && product.categories.length > 0) {
            await Category.updateMany(
                { _id: { $in: product.categories } },
                { $inc: { itemCount: -1 } }
            );
        }

        await Product.findByIdAndDelete(id);
        res.json({ success: true });
    } catch (error) {
        console.error('Delete product error:', error);
        res.status(500).json({ error: 'Error deleting product' });
    }
};

module.exports = {
    getProducts,
    addProduct,
    editProduct,
    deleteProduct
};