const mongoose = require('mongoose');

const productSchema = new mongoose.Schema({
    name: {
        type: String,
        required: true,
        trim: true,
    },
    price: {
        type: Number,
        required: true,
    },
    categories: [{
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Category',
        required: true,
        validate: {
            validator: async function(value) {
                const category = await mongoose.model('Category').findById(value);
                return category !== null;
            },
            message: 'Invalid category'
        }
    }],
    description: {
        type: String,
        required: true,
    },
    images: [{
        filename: String,
        path: String,
        isDefault: {
            type: Boolean,
            default: false
        }
    }],
    specifications: {
        type: Map,
        of: String,
    },
    quantity: {
        type: Number,
        default: 1,
    }
}, { timestamps: true });

module.exports = mongoose.model('Product', productSchema);
