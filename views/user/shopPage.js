<!DOCTYPE html>
<html lang="en">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>Anjali Flower Works - Shop</title>
    <script src="https://cdn.tailwindcss.com"></script>
    <script src="https://cdnjs.cloudflare.com/ajax/libs/gsap/3.11.4/gsap.min.js"></script>
    <link href="https://fonts.googleapis.com/css2?family=Poppins:wght@400;500;600;700&display=swap" rel="stylesheet">
    <style>
        body {
            background-color: #f9fafb;
            color: #374151;
            transition: background-color 0.3s, color 0.3s;
        }

        /* Removed dark mode styles */

        .product-card {
            transition: all 0.3s ease;
            opacity: 0;
            transform: translateY(20px);
        }

        .product-card:hover {
            transform: translateY(-5px);
            box-shadow: 0 10px 25px rgba(0, 0, 0, 0.1);
        }

        .filter-sidebar {
            transform: translateX(-100%);
            transition: transform 0.3s ease;
        }

        .filter-sidebar.active {
            transform: translateX(0);
        }

        .price-range {
            -webkit-appearance: none;
            appearance: none;
            height: 6px;
            border-radius: 3px;
            background: #ddd;
            outline: none;
        }

        .price-range::-webkit-slider-thumb {
            -webkit-appearance: none;
            appearance: none;
            width: 20px;
            height: 20px;
            border-radius: 50%;
            background: #14b8a6;
            cursor: pointer;
        }

        .fade-in {
            opacity: 0;
            transform: translateY(20px);
        }

        .heart-icon {
            transition: all 0.2s ease;
        }

        .heart-icon.active {
            color: #ef4444;
            transform: scale(1.2);
        }

        .sort-dropdown {
            max-height: 0;
            overflow: hidden;
            transition: max-height 0.3s ease;
        }

        .sort-dropdown.active {
            max-height: 300px;
        }

        .grid-transition {
            transition: all 0.3s ease;
        }

        @keyframes pulse-heart {
            0% { transform: scale(1); }
            50% { transform: scale(1.3); }
            100% { transform: scale(1); }
        }

        .pulse-heart {
            animation: pulse-heart 0.3s ease;
        }

        .badge {
            animation: badge-float 3s ease-in-out infinite;
        }

        @keyframes badge-float {
            0%, 100% { transform: translateY(0); }
            50% { transform: translateY(-5px); }
        }
    </style>
</head>
<body class="bg-gray-50 font-['Poppins'] transition-colors duration-300">
    <!-- Header -->
    <header class="bg-white shadow-sm fixed top-0 w-full z-50 transition-all duration-300">
        <div class="p-4 max-w-6xl mx-auto">
            <div class="flex items-center justify-between">
                <div class="flex items-center gap-3">
                    <button onclick="history.back()" class="p-2 hover:bg-gray-100 rounded-full transition-colors">
                        ←
                    </button>
                    <div>
                        <h1 class="text-xl font-bold text-teal-600">Anjali Flower Works</h1>
                        <p class="text-sm text-gray-500" id="categoryTitle">Bouquets Collection</p>
                    </div>
                </div>
                <div class="flex gap-2">
                    <button id="searchToggle" class="p-2 rounded-full hover:bg-gray-100 transition-colors">
                        🔍
                    </button>
                    <button id="darkModeToggle" class="p-2 rounded-full hover:bg-gray-100 transition-colors">
                        🌙
                    </button>
                    <button id="favoritesBtn" class="p-2 rounded-full hover:bg-gray-100 transition-colors relative">
                        ❤️
                        <span id="favCount" class="absolute -top-1 -right-1 bg-red-500 text-white text-xs rounded-full w-5 h-5 flex items-center justify-center hidden">0</span>
                    </button>
                </div>
            </div>
            
            <!-- Search Bar (Hidden by default) -->
            <div id="searchBar" class="mt-3 hidden">
                <div class="relative">
                    <input type="text" id="searchInput" placeholder="Search products..." 
                           class="w-full pl-10 pr-4 py-3 rounded-full border border-gray-200 focus:border-teal-500 focus:ring-1 focus:ring-teal-500 transition-all">
                    <span class="absolute left-3 top-3.5">🔍</span>
                    <button id="clearSearch" class="absolute right-3 top-3 text-gray-400 hover:text-gray-600 hidden">✖</button>
                </div>
            </div>
        </div>
    </header>

    <!-- Filters & Sort Bar -->
    <div class="mt-20 sticky top-16 bg-white shadow-sm z-40 border-b">
        <div class="p-4 max-w-6xl mx-auto">
            <div class="flex items-center justify-between">
                <div class="flex items-center gap-3">
                    <button id="filterToggle" class="flex items-center gap-2 px-4 py-2 border rounded-lg hover:bg-gray-50 transition-colors">
                        🔧 <span>Filters</span>
                        <span id="activeFiltersCount" class="hidden bg-teal-500 text-white text-xs px-2 py-0.5 rounded-full">0</span>
                    </button>
                    <div class="relative">
                        <button id="sortToggle" class="flex items-center gap-2 px-4 py-2 border rounded-lg hover:bg-gray-50 transition-colors">
                            📊 <span id="currentSort">Sort by</span> ↓
                        </button>
                        <div id="sortDropdown" class="sort-dropdown absolute top-full left-0 mt-1 w-48 bg-white border rounded-lg shadow-lg">
                            <div class="p-2">
                                <button class="sort-option w-full text-left px-3 py-2 hover:bg-gray-50 rounded" data-sort="popular">Popular</button>
                                <button class="sort-option w-full text-left px-3 py-2 hover:bg-gray-50 rounded" data-sort="price-low">Price: Low to High</button>
                                <button class="sort-option w-full text-left px-3 py-2 hover:bg-gray-50 rounded" data-sort="price-high">Price: High to Low</button>
                                <button class="sort-option w-full text-left px-3 py-2 hover:bg-gray-50 rounded" data-sort="name">Name A-Z</button>
                                <button class="sort-option w-full text-left px-3 py-2 hover:bg-gray-50 rounded" data-sort="rating">Highest Rated</button>
                                <button class="sort-option w-full text-left px-3 py-2 hover:bg-gray-50 rounded" data-sort="newest">Newest First</button>
                            </div>
                        </div>
                    </div>
                </div>
                <div class="flex items-center gap-3">
                    <span class="text-sm text-gray-500" id="productCount">20 products</span>
                    <div class="flex border rounded-lg">
                        <button id="gridView" class="p-2 hover:bg-gray-50 transition-colors border-r">⊞</button>
                        <button id="listView" class="p-2 hover:bg-gray-50 transition-colors">☰</button>
                    </div>
                </div>
            </div>
        </div>
    </div>

    <!-- Filter Sidebar -->
    <div id="filterSidebar" class="filter-sidebar fixed left-0 top-0 h-full w-80 bg-white shadow-lg z-50 overflow-y-auto">
        <div class="p-4 border-b">
            <div class="flex items-center justify-between">
                <h3 class="text-lg font-semibold">Filters</h3>
                <button id="closeFilters" class="p-2 hover:bg-gray-100 rounded-full">✖</button>
            </div>
        </div>
        
        <div class="p-4 space-y-6">
            <!-- Price Range -->
            <div>
                <h4 class="font-medium mb-3">Price Range</h4>
                <div class="space-y-3">
                    <div class="flex items-center justify-between">
                        <span class="text-sm">₹<span id="minPriceDisplay">0</span></span>
                        <span class="text-sm">₹<span id="maxPriceDisplay">5000</span></span>
                    </div>
                    <input type="range" id="priceRange" class="price-range w-full" min="0" max="5000" value="5000">
                </div>
            </div>

            <!-- Rating -->
            <div>
                <h4 class="font-medium mb-3">Rating</h4>
                <div class="space-y-2">
                    <label class="flex items-center">
                        <input type="checkbox" class="rating-filter mr-2" value="4">
                        <span class="text-sm">4⭐ & above</span>
                    </label>
                    <label class="flex items-center">
                        <input type="checkbox" class="rating-filter mr-2" value="3">
                        <span class="text-sm">3⭐ & above</span>
                    </label>
                </div>
            </div>

            <!-- Availability -->
            <div>
                <h4 class="font-medium mb-3">Availability</h4>
                <div class="space-y-2">
                    <label class="flex items-center">
                        <input type="checkbox" id="inStockFilter" class="mr-2">
                        <span class="text-sm">In Stock Only</span>
                    </label>
                    <label class="flex items-center">
                        <input type="checkbox" id="onSaleFilter" class="mr-2">
                        <span class="text-sm">On Sale</span>
                    </label>
                </div>
            </div>

            <!-- Occasion -->
            <div>
                <h4 class="font-medium mb-3">Occasion</h4>
                <div class="space-y-2">
                    <label class="flex items-center">
                        <input type="checkbox" class="occasion-filter mr-2" value="birthday">
                        <span class="text-sm">Birthday</span>
                    </label>
                    <label class="flex items-center">
                        <input type="checkbox" class="occasion-filter mr-2" value="anniversary">
                        <span class="text-sm">Anniversary</span>
                    </label>
                    <label class="flex items-center">
                        <input type="checkbox" class="occasion-filter mr-2" value="wedding">
                        <span class="text-sm">Wedding</span>
                    </label>
                    <label class="flex items-center">
                        <input type="checkbox" class="occasion-filter mr-2" value="valentine">
                        <span class="text-sm">Valentine's Day</span>
                    </label>
                </div>
            </div>

            <!-- Color -->
            <div>
                <h4 class="font-medium mb-3">Color</h4>
                <div class="grid grid-cols-4 gap-2">
                    <button class="color-filter w-8 h-8 rounded-full bg-red-500 border-2 border-gray-200" data-color="red"></button>
                    <button class="color-filter w-8 h-8 rounded-full bg-pink-500 border-2 border-gray-200" data-color="pink"></button>
                    <button class="color-filter w-8 h-8 rounded-full bg-yellow-500 border-2 border-gray-200" data-color="yellow"></button>
                    <button class="color-filter w-8 h-8 rounded-full bg-purple-500 border-2 border-gray-200" data-color="purple"></button>
                    <button class="color-filter w-8 h-8 rounded-full bg-blue-500 border-2 border-gray-200" data-color="blue"></button>
                    <button class="color-filter w-8 h-8 rounded-full bg-orange-500 border-2 border-gray-200" data-color="orange"></button>
                    <button class="color-filter w-8 h-8 rounded-full bg-green-500 border-2 border-gray-200" data-color="green"></button>
                    <button class="color-filter w-8 h-8 rounded-full bg-white border-2 border-gray-400" data-color="white"></button>
                </div>
            </div>
        </div>

        <div class="p-4 border-t">
            <div class="flex gap-2">
                <button id="clearAllFilters" class="flex-1 px-4 py-2 border rounded-lg hover:bg-gray-50">Clear All</button>
                <button id="applyFilters" class="flex-1 px-4 py-2 bg-teal-500 text-white rounded-lg hover:bg-teal-600">Apply</button>
            </div>
        </div>
    </div>

    <!-- Filter Overlay -->
    <div id="filterOverlay" class="fixed inset-0 bg-black bg-opacity-50 z-40 hidden"></div>

    <!-- Products Grid -->
    <div class="p-4 max-w-6xl mx-auto pb-24">
        <div id="productsGrid" class="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4 grid-transition">
            <!-- Products will be loaded here -->
        </div>

        <!-- Load More Button -->
        <div class="text-center mt-8">
            <button id="loadMore" class="px-6 py-3 bg-teal-500 text-white rounded-lg hover:bg-teal-600 transition-colors">
                Load More Products
            </button>
        </div>
    </div>

    <!-- Product Quick View Modal -->
    <div id="quickViewModal" class="fixed inset-0 bg-black bg-opacity-50 z-50 flex items-center justify-center hidden">
        <div class="bg-white rounded-xl mx-4 w-full max-w-2xl overflow-hidden">
            <div class="relative">
                <button id="closeQuickView" class="absolute top-4 right-4 bg-white rounded-full w-8 h-8 flex items-center justify-center hover:bg-gray-100 z-10">✖</button>
                <img id="quickViewImage" src="" alt="" class="w-full h-64 object-cover">
            </div>
            <div class="p-6">
                <div class="flex items-start justify-between mb-4">
                    <div>
                        <h3 id="quickViewTitle" class="text-xl font-bold mb-1"></h3>
                        <div class="flex items-center gap-2 mb-2">
                            <div id="quickViewRating" class="flex text-yellow-400"></div>
                            <span id="quickViewReviews" class="text-sm text-gray-500"></span>
                        </div>
                        <div class="flex items-center gap-2">
                            <span id="quickViewPrice" class="text-2xl font-bold text-teal-600"></span>
                            <span id="quickViewOriginalPrice" class="text-sm text-gray-500 line-through"></span>
                        </div>
                    </div>
                    <button id="quickViewFavorite" class="heart-icon text-2xl hover:scale-110 transition-transform">🤍</button>
                </div>
                <p id="quickViewDescription" class="text-gray-600 mb-4"></p>
                <div class="flex gap-3">
                    <button id="quickViewCart" class="flex-1 bg-teal-500 text-white py-3 rounded-lg hover:bg-teal-600 transition-colors">
                        Add to Cart
                    </button>
                    <button id="quickViewDetails" class="px-6 py-3 border border-teal-500 text-teal-500 rounded-lg hover:bg-teal-50 transition-colors">
                        View Details
                    </button>
                </div>
            </div>
        </div>
    </div>

    <!-- Bottom Navigation -->
    <div class="fixed bottom-0 w-full bg-white shadow-lg border-t z-20">
        <div class="flex justify-around items-center p-3 max-w-6xl mx-auto">
            <a href="/" class="flex flex-col items-center text-gray-500">
                <span class="text-xl">🏠</span>
                <span class="text-xs">Home</span>
            </a>
            <a href="/shop" class="flex flex-col items-center text-teal-600">
                <span class="text-xl">🛍️</span>
                <span class="text-xs">Shop</span>
            </a>
            <a href="/favorites" class="flex flex-col items-center text-gray-500">
                <span class="text-xl">❤️</span>
                <span class="text-xs">Favorites</span>
            </a>
            <a href="/cart" class="flex flex-col items-center text-gray-500">
                <span class="text-xl">🛒</span>
                <span class="text-xs">Cart</span>
            </a>
            <a href="/contact" class="flex flex-col items-center text-gray-500">
                <span class="text-xl">📞</span>
                <span class="text-xs">Contact</span>
            </a>
        </div>
    </div>

    <script>
        // Sample product data
        const productData = [
            {
                id: 1,
                name: "Red Rose Bouquet",
                price: 899,
                originalPrice: 1199,
                image: "data:image/svg+xml;base64,PHN2ZyB3aWR0aD0iMjAwIiBoZWlnaHQ9IjIwMCIgdmlld0JveD0iMCAwIDIwMCAyMDAiIGZpbGw9Im5vbmUiIHhtbG5zPSJodHRwOi8vd3d3LnczLm9yZy8yMDAwL3N2ZyI+CjxyZWN0IHdpZHRoPSIyMDAiIGhlaWdodD0iMjAwIiBmaWxsPSIjRkY5RDk1Ii8+Cjx0ZXh0IHg9IjEwMCIgeT0iMTEwIiBmb250LWZhbWlseT0iQXJpYWwiIGZvbnQtc2l6ZT0iNDAiIGZpbGw9IiNEQzI2MjYiIHRleHQtYW5jaG9yPSJtaWRkbGUiPvCfjY08L3RleHQ+CjwvdXZnPgo=",
                rating: 4.8,
                reviews: 156,
                category: "bouquets",
                occasion: ["anniversary", "valentine"],
                color: "red",
                inStock: true,
                onSale: true,
                popular: true,
                description: "Beautiful red roses arranged in an elegant bouquet, perfect for expressing love and affection."
            },
            {
                id: 2,
                name: "Mixed Flower Arrangement",
                price: 1299,
                originalPrice: 1599,
                image: "data:image/svg+xml;base64,PHN2ZyB3aWR0aD0iMjAwIiBoZWlnaHQ9IjIwMCIgdmlld0JveD0iMCAwIDIwMCAyMDAiIGZpbGw9Im5vbmUiIHhtbG5zPSJodHRwOi8vd3d3LnczLm9yZy8yMDAwL3N2ZyI+CjxyZWN0IHdpZHRoPSIyMDAiIGhlaWdodD0iMjAwIiBmaWxsPSIjRkZFREQ4Ii8+Cjx0ZXh0IHg9IjEwMCIgeT0iMTEwIiBmb250LWZhbWlseT0iQXJpYWwiIGZvbnQtc2l6ZT0iNDAiIGZpbGw9IiNGNTk3MDAiIHRleHQtYW5jaG9yPSJtaWRkbGUiPvCfjJo8L3RleHQ+CjwvdXZnPgo=",
                rating: 4.6,
                reviews: 89,
                category: "bouquets",
                occasion: ["birthday", "anniversary"],
                color: "mixed",
                inStock: true,
                onSale: true,
                popular: true,
                description: "A vibrant mix of seasonal flowers creating a colorful and cheerful arrangement."
            },
            {
                id: 3,
                name: "Pink Lily Bouquet",
                price: 1099,
                originalPrice: null,
                image: "data:image/svg+xml;base64,PHN2ZyB3aWR0aD0iMjAwIiBoZWlnaHQ9IjIwMCIgdmlld0JveD0iMCAwIDIwMCAyMDAiIGZpbGw9Im5vbmUiIHhtbG5zPSJodHRwOi8vd3d3LnczLm9yZy8yMDAwL3N2ZyI+CjxyZWN0IHdpZHRoPSIyMDAiIGhlaWdodD0iMjAwIiBmaWxsPSIjRkNFN0Y2Ii8+Cjx0ZXh0IHg9IjEwMCIgeT0iMTEwIiBmb250LWZhbWlseT0iQXJpYWwiIGZvbnQtc2l6ZT0iNDAiIGZpbGw9IiNFUzE5N0YiIHRleHQtYW5jaG9yPSJtaWRkbGUiPvCfjY08L3RleHQ+CjwvdXZnPgo=",
                rating: 4.7,
                reviews: 64,
                category: "bouquets",
                occasion: ["birthday", "wedding"],
                color: "pink",
                inStock: true,
                onSale: false,
                popular: false,
                description: "Elegant pink lilies arranged with baby's breath for a sophisticated look."
            },
            {
                id: 4,
                name: "Sunflower Surprise",
                price: 799,
                originalPrice: 999,
                image: "data:image/svg+xml;base64,PHN2ZyB3aWR0aD0iMjAwIiBoZWlnaHQ9IjIwMCIgdmlld0JveD0iMCAwIDIwMCAyMDAiIGZpbGw9Im5vbmUiIHhtbG5zPSJodHRwOi8vd3d3LnczLm9yZy8yMDAwL3N2ZyI+CjxyZWN0IHdpZHRoPSIyMDAiIGhlaWdodD0iMjAwIiBmaWxsPSIjRkVGM0M3Ii8+Cjx0ZXh0IHg9IjEwMCIgeT0iMTEwIiBmb250LWZhbWlseT0iQXJpYWwiIGZvbnQtc2l6ZT0iNDAiIGZpbGw9IiNGNTk1MDAiIHRleHQtYW5jaG9yPSJtaWRkbGUiPvCfjJs8L3RleHQ+CjwvdXZnPgo=",
                rating: 4.5,
                reviews: 132,
                category: "bouquets",
                occasion: ["birthday"],
                color: "yellow",
                inStock: true,
                onSale: true,
                popular: true,
                description: "Bright and cheerful sunflowers that bring sunshine to any occasion."
            },
            {
                id: 5,
                name: "White Orchid Elegance",
                price: 1899,
                originalPrice: null,
                image: "data:image/svg+xml;base64,PHN2ZyB3aWR0aD0iMjAwIiBoZWlnaHQ9IjIwMCIgdmlld0JveD0iMCAwIDIwMCAyMDAiIGZpbGw9Im5vbmUiIHhtbG5zPSJodHRwOi8vd3d3LnczLm9yZy8yMDAwL3N2ZyI+CjxyZWN0IHdpZHRoPSIyMDAiIGhlaWdodD0iMjAwIiBmaWxsPSIjRkFGQUZBIi8+Cjx0ZXh0IHg9IjEwMCIgeT0iMTEwIiBmb250LWZhbWlseT0iQXJpYWwiIGZvbnQtc2l6ZT0iNDAiIGZpbGw9IiM2QjdCODAiIHRleHQtYW5jaG9yPSJtaWRkbGUiPvCfjYo8L3RleHQ+CjwvdXZnPgo=",
                rating: 4.9,
                reviews: 45,
                category: "bouquets",
                occasion: ["wedding", "anniversary"],
                color: "white",
                inStock: true,
                onSale: false,
                popular: false,
                description: "Premium white orchids arranged for the most special occasions."
            },
            {
                id: 6,
                name: "Purple Tulip Bundle",
                price: 1199,
                originalPrice: 1399,
                image: "data:image/svg+xml;base64,PHN2ZyB3aWR0aD0iMjAwIiBoZWlnaHQ9IjIwMCIgdmlld0JveD0iMCAwIDIwMCAyMDAiIGZpbGw9Im5vbmUiIHhtbG5zPSJodHRwOi8vd3d3LnczLm9yZy8yMDAwL3N2ZyI+CjxyZWN0IHdpZHRoPSIyMDAiIGhlaWdodD0iMjAwIiBmaWxsPSIjRjNFOEZGIi8+Cjx0ZXh0IHg9IjEwMCIgeT0iMTEwIiBmb250LWZhbWlseT0iQXJpYWwiIGZvbnQtc2l6ZT0iNDAiIGZpbGw9IiM5MzMzRUEiIHRleHQtYW5jaG9yPSJtaWRkbGUiPvCfjLf8L3RleHQ+CjwvdXZnPgo=",
                rating: 4.4,
                reviews: 78,
                category: "bouquets",
                occasion: ["birthday", "anniversary"],
                color: "purple",
                inStock: true,
                onSale: true,
                popular: false,
                description: "Fresh purple tulips bundled together for a spring-like feel."
            },
            {
                id: 7,
                name: "Exotic Bird of Paradise",
                price: 2299,
                originalPrice: null,
                image: "data:image/svg+xml;base64,PHN2ZyB3aWR0aD0iMjAwIiBoZWlnaHQ9IjIwMCIgdmlld0JveD0iMCAwIDIwMCAyMDAiIGZpbGw9Im5vbmUiIHhtbG5zPSJodHRwOi8vd3d3LnczLm9yZy8yMDAwL3N2ZyI+CjxyZWN0IHdpZHRoPSIyMDAiIGhlaWdodD0iMjAwIiBmaWxsPSIjRjZGM0YwIi8+Cjx0ZXh0IHg9IjEwMCIgeT0iMTEwIiBmb250LWZhbWlseT0iQXJpYWwiIGZvbnQtc2l6ZT0iNDAiIGZpbGw9IiM5QjA4RjAiIHRleHQtYW5jaG9yPSJtaWRkbGUiPvCfjY08L3RleHQ+CjwvdXZnPgo=",
                rating: 4.3,
                reviews: 22,
                category: "bouquets",
                occasion: ["wedding"],
                color: "orange",
                inStock: false,
                onSale: true,
                popular: false,
                description: "A stunning arrangement of exotic flowers, including the unique bird of paradise."
            },
            {
                id: 8,
                name: "Classic White Rose",
                price: 699,
                originalPrice: 899,
                image: "data:image/svg+xml;base64,PHN2ZyB3aWR0aD0iMjAwIiBoZWlnaHQ9IjIwMCIgdmlld0JveD0iMCAwIDIwMCAyMDAiIGZpbGw9Im5vbmUiIHhtbG5zPSJodHRwOi8vd3d3LnczLm9yZy8yMDAwL3N2ZyI+CjxyZWN0IHdpZHRoPSIyMDAiIGhlaWdodD0iMjAwIiBmaWxsPSIjRkZGRjAwIi8+Cjx0ZXh0IHg9IjEwMCIgeT0iMTEwIiBmb250LWZhbWlseT0iQXJpYWwiIGZvbnQtc2l6ZT0iNDAiIGZpbGw9IiM2QjdCODAiIHRleHQtYW5jaG9yPSJtaWRkbGUiPvCfjYo8L3RleHQ+CjwvdXZnPgo=",
                rating: 4.9,
                reviews: 34,
                category: "bouquets",
                occasion: ["valentine"],
                color: "white",
                inStock: true,
                onSale: true,
                popular: true,
                description: "Timeless elegance of classic white roses, symbolizing purity and love."
            },
            {
                id: 9,
                name: "Lavender Dream",
                price: 1399,
                originalPrice: 1599,
                image: "data:image/svg+xml;base64,PHN2ZyB3aWR0aD0iMjAwIiBoZWlnaHQ9IjIwMCIgdmlld0JveD0iMCAwIDIwMCAyMDAiIGZpbGw9Im5vbmUiIHhtbG5zPSJodHRwOi8vd3d3LnczLm9yZy8yMDAwL3N2ZyI+CjxyZWN0IHdpZHRoPSIyMDAiIGhlaWdodD0iMjAwIiBmaWxsPSIjRjZGRjAwIi8+Cjx0ZXh0IHg9IjEwMCIgeT0iMTEwIiBmb250LWZhbWlseT0iQXJpYWwiIGZvbnQtc2l6ZT0iNDAiIGZpbGw9IiM2QjdCODAiIHRleHQtYW5jaG9yPSJtaWRkbGUiPvCfjYo8L3RleHQ+CjwvdXZnPgo=",
                rating: 4.6,
                reviews: 27,
                category: "bouquets",
                occasion: ["anniversary", "valentine"],
                color: "purple",
                inStock: true,
                onSale: false,
                popular: true,
                description: "Aromatic lavender flowers bundled in a dreamy bouquet, ideal for romantic occasions."
            },
            {
                id: 10,
                name: "Peach Blossom Basket",
                price: 1599,
                originalPrice: 1899,
                image: "data:image/svg+xml;base64,PHN2ZyB3aWR0aD0iMjAwIiBoZWlnaHQ9IjIwMCIgdmlld0JveD0iMCAwIDIwMCAyMDAiIGZpbGw9Im5vbmUiIHhtbG5zPSJodHRwOi8vd3d3LnczLm9yZy8yMDAwL3N2ZyI+CjxyZWN0IHdpZHRoPSIyMDAiIGhlaWdodD0iMjAwIiBmaWxsPSIjRjZGRjAwIi8+Cjx0ZXh0IHg9IjEwMCIgeT0iMTEwIiBmb250LWZhbWlseT0iQXJpYWwiIGZvbnQtc2l6ZT0iNDAiIGZpbGw9IiM2QjdCODAiIHRleHQtYW5jaG9yPSJtaWRkbGUiPvCfjYo8L3RleHQ+CjwvdXZnPgo=",
                rating: 4.8,
                reviews: 19,
                category: "bouquets",
                occasion: ["birthday", "anniversary"],
                color: "orange",
                inStock: true,
                onSale: true,
                popular: false,
                description: "Charming peach blossoms arranged in a delightful basket, perfect for celebrating new beginnings."
            }
        ];

        // DOM Elements
        const productsGrid = document.getElementById('productsGrid');
        const loadMoreBtn = document.getElementById('loadMore');
        const quickViewModal = document.getElementById('quickViewModal');
        const closeQuickViewBtn = document.getElementById('closeQuickView');
        const quickViewImage = document.getElementById('quickViewImage');
        const quickViewTitle = document.getElementById('quickViewTitle');
        const quickViewRating = document.getElementById('quickViewRating');
        const quickViewReviews = document.getElementById('quickViewReviews');
        const quickViewPrice = document.getElementById('quickViewPrice');
        const quickViewOriginalPrice = document.getElementById('quickViewOriginalPrice');
        const quickViewFavorite = document.getElementById('quickViewFavorite');
        const quickViewDescription = document.getElementById('quickViewDescription');
        const quickViewCart = document.getElementById('quickViewCart');
        const quickViewDetails = document.getElementById('quickViewDetails');

        // Load initial products
        let currentProducts = [];
        let displayedProductCount = 0;
        const productsPerPage = 8;

        function loadProducts() {
            const newProducts = productData.slice(displayedProductCount, displayedProductCount + productsPerPage);
            currentProducts = [...currentProducts, ...newProducts];
            displayedProductCount += newProducts.length;

            newProducts.forEach(product => {
                const productCard = document.createElement('div');
                productCard.className = 'product-card bg-white rounded-lg shadow-md overflow-hidden transition-all';
                productCard.innerHTML = `
                    <div class="relative">
                        <img src="${product.image}" alt="${product.name}" class="w-full h-40 object-cover">
                        <button class="absolute top-3 right-3 heart-icon text-xl" data-product-id="${product.id}">
                            🤍
                        </button>
                    </div>
                    <div class="p-4">
                        <h3 class="text-lg font-semibold text-gray-800">${product.name}</h3>
                        <div class="flex items-center gap-2 my-2">
                            <div class="flex text-yellow-400" id="rating-${product.id}"></div>
                            <span class="text-sm text-gray-500" id="reviews-${product.id}"></span>
                        </div>
                        <div class="flex items-center gap-4">
                            <span class="text-xl font-bold text-teal-600" id="price-${product.id}"></span>
                            <span class="text-sm text-gray-500 line-through" id="originalPrice-${product.id}"></span>
                        </div>
                    </div>
                `;

                // Set rating stars
                const ratingContainer = productCard.querySelector(`#rating-${product.id}`);
                for (let i = 0; i < 5; i++) {
                    const star = document.createElement('span');
                    star.className = 'text-yellow-400';
                    star.innerHTML = i < Math.floor(product.rating) ? '★' : '☆';
                    ratingContainer.appendChild(star);
                }

                // Set reviews count
                const reviewsElement = productCard.querySelector(`#reviews-${product.id}`);
                reviewsElement.textContent = `${product.reviews} reviews`;

                // Set price
                const priceElement = productCard.querySelector(`#price-${product.id}`);
                priceElement.textContent = `₹${product.price}`;

                // Set original price if available
                const originalPriceElement = productCard.querySelector(`#originalPrice-${product.id}`);
                if (product.originalPrice) {
                    originalPriceElement.textContent = `₹${product.originalPrice}`;
                    originalPriceElement.classList.remove('hidden');
                } else {
                    originalPriceElement.classList.add('hidden');
                }

                // Add to grid
                productsGrid.appendChild(productCard);
            });

            // Hide load more button if no more products
            if (displayedProductCount >= productData.length) {
                loadMoreBtn.classList.add('hidden');
            }
        }

        loadProducts();

        // Quick view functionality
        productsGrid.addEventListener('click', function (e) {
            if (e.target.classList.contains('heart-icon')) {
                const productId = e.target.getAttribute('data-product-id');
                const product = productData.find(p => p.id == productId);

                // Toggle favorite
                e.target.classList.toggle('active');
                updateFavoriteCount();

                // Quick view details
                quickViewImage.src = product.image;
                quickViewTitle.textContent = product.name;
                quickViewRating.innerHTML = '';
                for (let i = 0; i < 5; i++) {
                    const star = document.createElement('span');
                    star.className = 'text-yellow-400';
                    star.innerHTML = i < Math.floor(product.rating) ? '★' : '☆';
                    quickViewRating.appendChild(star);
                }
                quickViewReviews.textContent = `${product.reviews} reviews`;
                quickViewPrice.textContent = `₹${product.price}`;
                quickViewOriginalPrice.textContent = product.originalPrice ? `₹${product.originalPrice}` : '';
                quickViewDescription.textContent = product.description;

                quickViewModal.classList.remove('hidden');
            }
        });

        closeQuickViewBtn.addEventListener('click', function () {
            quickViewModal.classList.add('hidden');
        });

        // Update favorite count
        function updateFavoriteCount() {
            const favoriteCount = document.querySelectorAll('.heart-icon.active').length;
            const favCountElement = document.getElementById('favCount');
            favCountElement.textContent = favoriteCount;
            favCountElement.classList.toggle('hidden', favoriteCount === 0);
        }

        // Load more products
        loadMoreBtn.addEventListener('click', function () {
            loadProducts();
        });

        // Search functionality
        const searchToggle = document.getElementById('searchToggle');
        const searchBar = document.getElementById('searchBar');
        const searchInput = document.getElementById('searchInput');
        const clearSearch = document.getElementById('clearSearch');

        searchToggle.addEventListener('click', function () {
            searchBar.classList.toggle('hidden');
            searchInput.focus();
        });

        clearSearch.addEventListener('click', function () {
            searchInput.value = '';
            clearSearch.classList.add('hidden');
            filterProducts();
        });

        searchInput.addEventListener('input', function () {
            clearSearch.classList.toggle('hidden', !searchInput.value);
            filterProducts();
        });

        // Filter products based on search
        function filterProducts() {
            const searchTerm = searchInput.value.toLowerCase();
            displayedProductCount = 0;
            productsGrid.innerHTML = '';
            const filteredProducts = productData.filter(product => product.name.toLowerCase().includes(searchTerm));
            filteredProducts.forEach(product => {
                const productCard = document.createElement('div');
                productCard.className = 'product-card bg-white rounded-lg shadow-md overflow-hidden transition-all';
                productCard.innerHTML = `
                    <div class="relative">
                        <img src="${product.image}" alt="${product.name}" class="w-full h-40 object-cover">
                        <button class="absolute top-3 right-3 heart-icon text-xl" data-product-id="${product.id}">
                            🤍
                        </button>
                    </div>
                    <div class="p-4">
                        <h3 class="text-lg font-semibold text-gray-800">${product.name}</h3>
                        <div class="flex items-center gap-2 my-2">
                            <div class="flex text-yellow-400" id="rating-${product.id}"></div>
                            <span class="text-sm text-gray-500" id="reviews-${product.id}"></span>
                        </div>
                        <div class="flex items-center gap-4">
                            <span class="text-xl font-bold text-teal-600" id="price-${product.id}"></span>
                            <span class="text-sm text-gray-500 line-through" id="originalPrice-${product.id}"></span>
                        </div>
                    </div>
                `;

                // Set rating stars
                const ratingContainer = productCard.querySelector(`#rating-${product.id}`);
                for (let i = 0; i < 5; i++) {
                    const star = document.createElement('span');
                    star.className = 'text-yellow-400';
                    star.innerHTML = i < Math.floor(product.rating) ? '★' : '☆';
                    ratingContainer.appendChild(star);
                }

                // Set reviews count
                const reviewsElement = productCard.querySelector(`#reviews-${product.id}`);
                reviewsElement.textContent = `${product.reviews} reviews`;

                // Set price
                const priceElement = productCard.querySelector(`#price-${product.id}`);
                priceElement.textContent = `₹${product.price}`;

                // Set original price if available
                const originalPriceElement = productCard.querySelector(`#originalPrice-${product.id}`);
                if (product.originalPrice) {
                    originalPriceElement.textContent = `₹${product.originalPrice}`;
                    originalPriceElement.classList.remove('hidden');
                } else {
                    originalPriceElement.classList.add('hidden');
                }

                // Add to grid
                productsGrid.appendChild(productCard);
            });

            // Hide load more button if no more products
            if (displayedProductCount >= productData.length) {
                loadMoreBtn.classList.add('hidden');
            } else {
                loadMoreBtn.classList.remove('hidden');
            }
        }

        // Dark mode toggle (optional, remove if not needed)
        const darkModeToggle = document.getElementById('darkModeToggle');
        if (darkModeToggle) {
            darkModeToggle.addEventListener('click', function () {
                // Toggle dark mode class on body
                document.body.classList.toggle('dark-mode');
                // Optionally, update icon
                if (document.body.classList.contains('dark-mode')) {
                    darkModeToggle.textContent = '☀️';
                    localStorage.setItem('darkMode', 'true');
                } else {
                    darkModeToggle.textContent = '🌙';
                    localStorage.setItem('darkMode', 'false');
                }
            });

            // On page load, restore preference
            if (localStorage.getItem('darkMode') === 'true') {
                document.body.classList.add('dark-mode');
                darkModeToggle.textContent = '☀️';
            } else {
                document.body.classList.remove('dark-mode');
                darkModeToggle.textContent = '🌙';
            }
        }
    </script>
</body>
</html>