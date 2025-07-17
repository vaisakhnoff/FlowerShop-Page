const allProducts = [
            { id: 1, name: "Red Roses Bouquet", category: "roses", price: 499, image: "🌹", description: "Beautiful red roses arrangement" },
            { id: 2, name: "White Roses", category: "roses", price: 549, image: "🌹", description: "Elegant white roses bouquet" },
            { id: 3, name: "Pink Rose Bouquet", category: "roses", price: 599, image: "🌹", description: "Soft pink roses for special moments" },
            { id: 4, name: "Orchid Plant", category: "plants", price: 799, image: "🪴", description: "Beautiful orchid plant for your home" },
            { id: 5, name: "Snake Plant", category: "plants", price: 399, image: "🌿", description: "Low maintenance snake plant" },
            { id: 6, name: "Peace Lily", category: "plants", price: 599, image: "🌱", description: "Elegant peace lily plant" },
            { id: 7, name: "Monstera Plant", category: "plants", price: 899, image: "🌿", description: "Popular monstera deliciosa" },
            { id: 8, name: "Birthday Balloon Bouquet", category: "birthdays", price: 599, image: "🎂", description: "Colorful birthday arrangement" },
            { id: 9, name: "Birthday Special Box", category: "birthdays", price: 899, image: "🎁", description: "Special birthday gift box" },
            { id: 10, name: "Cake & Flowers Combo", category: "birthdays", price: 1299, image: "🎂", description: "Perfect birthday celebration combo" },
            { id: 11, name: "Bridal Bouquet", category: "weddings", price: 999, image: "💍", description: "Elegant bridal bouquet" },
            { id: 12, name: "Wedding Centerpiece", category: "weddings", price: 1299, image: "💐", description: "Beautiful wedding centerpiece" },
            { id: 13, name: "Wedding Arch Decoration", category: "weddings", price: 2499, image: "🌸", description: "Stunning wedding arch flowers" },
            { id: 14, name: "Exotic Orchid Mix", category: "exotic", price: 1199, image: "🌺", description: "Rare exotic orchid arrangement" },
            { id: 15, name: "Bird of Paradise", category: "exotic", price: 899, image: "🦜", description: "Stunning bird of paradise flower" },
            { id: 16, name: "Anthurium Arrangement", category: "exotic", price: 799, image: "🌺", description: "Beautiful anthurium flowers" },
            { id: 17, name: "Mixed Flower Bouquet", category: "bouquets", price: 699, image: "💐", description: "Beautiful mixed flower arrangement" },
            { id: 18, name: "Sunflower Bouquet", category: "bouquets", price: 599, image: "🌻", description: "Bright sunflower bouquet" },
            { id: 19, name: "Lily Bouquet", category: "bouquets", price: 799, image: "🌸", description: "Elegant lily flower bouquet" },
            { id: 20, name: "Corporate Desk Plant", category: "corporate", price: 449, image: "🏢", description: "Perfect plant for office desk" },
            { id: 21, name: "Executive Gift Hamper", category: "corporate", price: 1499, image: "🎁", description: "Premium corporate gift hamper" },
            { id: 22, name: "Chocolate & Flowers", category: "gifts", price: 799, image: "🍫", description: "Perfect combination of flowers and chocolates" },
            { id: 23, name: "Teddy & Roses", category: "gifts", price: 899, image: "🧸", description: "Cute teddy bear with roses" },
            { id: 24, name: "Premium Gift Basket", category: "gifts", price: 1299, image: "🎁", description: "Luxury gift basket with flowers" }
        ];

        

const getHome = async (req,res) => {
    res.render('index');
}

const getProductDetail = async(req,res)=>{
    res.render('product')
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
        console.log('Category requested:', category);
        
        let products = allProducts;
        if (category && category !== 'all') {
            products = allProducts.filter(p => p.category.toLowerCase() === category.toLowerCase());
            console.log(`Filtered ${products.length} products for category: ${category}`);
        }
        
        if (!products || products.length === 0) {
            console.log('No products found for category:', category);
        }
        
        res.render('shopPage', { 
            products, 
            selectedCategory: category || 'all',
            error: null
        });
    } catch (error) {
        console.error('Shop page error:', error);
        res.status(500).render('shopPage', { 
            products: [], 
            selectedCategory: null,
            error: 'Error loading products'
        });
    }
};

module.exports ={
    getHome,
    getProductDetail,
    getFavorites,
    getContact,
    getshopPage
}