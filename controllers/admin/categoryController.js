const Category = require('../../model/category');

// Get all categories
const getCategories = async (req, res) => {
    try {
        const categories = await Category.find({}).sort({ name: 1 });
        res.json(categories);
    } catch (error) {
        console.error('Error fetching categories:', error);
        res.status(500).json({ 
            error: 'Error fetching categories',
            details: error.message 
        });
    }
};

// Add this function to update item counts
const updateCategoryItemCounts = async () => {
    const Product = require('../../model/products');
    const categories = await Category.find({});
    
    for (const category of categories) {
        const count = await Product.countDocuments({ categories: category._id });
        await Category.findByIdAndUpdate(category._id, { itemCount: count });
    }
};

// Add a category
const addCategory = async (req, res) => {
    try {
        const category = new Category({
            name: req.body.name,
            emoji: req.body.emoji || '📦',
            bgColor: req.body.bgColor || 'bg-gray-100',
            description: req.body.description
        });
        await category.save();
        await updateCategoryItemCounts();
        res.status(201).json(category);
    } catch (error) {
        res.status(500).json({ error: 'Error adding category' });
    }
};

// Edit a category
const editCategory = async (req, res) => {
    try {
        const updated = await Category.findByIdAndUpdate(
            req.params.id, 
            {
                name: req.body.name,
                emoji: req.body.emoji,
                bgColor: req.body.bgColor,
                description: req.body.description
            },
            { new: true }
        );
        await updateCategoryItemCounts();
        res.json(updated);
    } catch (error) {
        res.status(500).json({ error: 'Error editing category' });
    }
};

// Delete a category
const deleteCategory = async (req, res) => {
    try {
        await Category.findByIdAndDelete(req.params.id);
        res.json({ success: true });
    } catch (error) {
        res.status(500).json({ error: 'Error deleting category' });
    }
};

module.exports = {
   
    getCategories,
    addCategory,
    editCategory,
    deleteCategory
};