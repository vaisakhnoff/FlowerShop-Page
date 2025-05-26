
const mongoose = require('mongoose');

const productSchema = new mongoose.Schema(
  {
    name: {
      type: String,
      required: true,
      trim: true,
    },
    
    price: {
      type: Number,
      required: true,
    },
    categories: [
      {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Category',
        required: true,
      },
    ],
    description: {
      type: String,
      required: true,
    },
    specifications: {
      type: Map,
      of: String, // Ex: { Length: "3 feet", Freshness: "24 hours" }
    },
    customizations: {
      type: Object, // Flexible format
    },
    imageUrls: {
      type: [String], // Will store uploaded image file paths or URLs
      required: true,
    },
    quantity: {
      type: Number,
      default: 1,
    },
  },
  { timestamps: true }
);

module.exports = mongoose.model('Product', productSchema);
