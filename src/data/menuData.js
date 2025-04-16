export const MENU_DATA = [
    {
        id: 1,
        name: "Classic Cheeseburger",
        description: "Juicy beef patty with melted cheddar cheese, lettuce, tomato, and our special sauce.",
        price: 12.99,
        category: "Burgers",
        image: "https://via.placeholder.com/300?text=Cheeseburger",
        nutritionInfo: {
            calories: 650,
            protein: 35,
            carbs: 40,
            fat: 38
        },
        allergens: ["Gluten", "Dairy", "Soy"],
        options: {
            "Cooking Preference": [
                { name: "Medium Rare", additionalPrice: 0 },
                { name: "Medium", additionalPrice: 0 },
                { name: "Well Done", additionalPrice: 0 }
            ],
            "Add-ons": [
                { name: "Extra Cheese", additionalPrice: 1.50 },
                { name: "Bacon", additionalPrice: 2.00 },
                { name: "Avocado", additionalPrice: 2.50 }
            ]
        }
    },
    {
        id: 2,
        name: "Margherita Pizza",
        description: "Traditional pizza with tomato sauce, fresh mozzarella, and basil.",
        price: 14.99,
        category: "Pizza",
        image: "https://via.placeholder.com/300?text=Pizza",
        nutritionInfo: {
            calories: 740,
            protein: 28,
            carbs: 86,
            fat: 32
        },
        allergens: ["Gluten", "Dairy"],
        options: {
            "Size": [
                { name: "Small (10\")", additionalPrice: -2.00 },
                { name: "Medium (12\")", additionalPrice: 0 },
                { name: "Large (14\")", additionalPrice: 3.00 }
            ],
            "Crust": [
                { name: "Thin", additionalPrice: 0 },
                { name: "Regular", additionalPrice: 0 },
                { name: "Thick", additionalPrice: 1.00 }
            ]
        }
    },
    {
        id: 3,
        name: "Caesar Salad",
        description: "Crisp romaine lettuce with Caesar dressing, croutons, and parmesan cheese.",
        price: 9.99,
        category: "Salads",
        image: "https://via.placeholder.com/300?text=Salad",
        nutritionInfo: {
            calories: 320,
            protein: 10,
            carbs: 15,
            fat: 25
        },
        allergens: ["Gluten", "Dairy", "Eggs"],
        options: {
            "Protein": [
                { name: "No Protein", additionalPrice: 0 },
                { name: "Grilled Chicken", additionalPrice: 4.00 },
                { name: "Grilled Shrimp", additionalPrice: 5.00 }
            ],
            "Dressing": [
                { name: "Regular", additionalPrice: 0 },
                { name: "Light", additionalPrice: 0 },
                { name: "On the Side", additionalPrice: 0 }
            ]
        }
    },
    {
        id: 4,
        name: "Chicken Fettuccine Alfredo",
        description: "Fettuccine pasta with creamy Alfredo sauce and grilled chicken breast.",
        price: 16.99,
        category: "Pasta",
        image: "https://via.placeholder.com/300?text=Pasta",
        nutritionInfo: {
            calories: 860,
            protein: 42,
            carbs: 72,
            fat: 48
        },
        allergens: ["Gluten", "Dairy", "Eggs"],
        options: {
            "Pasta Type": [
                { name: "Fettuccine", additionalPrice: 0 },
                { name: "Penne", additionalPrice: 0 },
                { name: "Whole Wheat", additionalPrice: 1.00 }
            ],
            "Add-ons": [
                { name: "Extra Chicken", additionalPrice: 3.50 },
                { name: "Broccoli", additionalPrice: 1.50 },
                { name: "Mushrooms", additionalPrice: 1.50 }
            ]
        }
    },
    {
        id: 5,
        name: "Veggie Wrap",
        description: "Whole wheat wrap with hummus, mixed greens, roasted vegetables, and feta cheese.",
        price: 10.99,
        category: "Sandwiches",
        image: "https://via.placeholder.com/300?text=Wrap",
        nutritionInfo: {
            calories: 420,
            protein: 12,
            carbs: 58,
            fat: 18
        },
        allergens: ["Gluten", "Dairy"],
        options: {
            "Wrap Type": [
                { name: "Whole Wheat", additionalPrice: 0 },
                { name: "Spinach", additionalPrice: 0 },
                { name: "Gluten-Free", additionalPrice: 1.50 }
            ],
            "Add-ons": [
                { name: "Avocado", additionalPrice: 2.00 },
                { name: "Extra Feta", additionalPrice: 1.00 }
            ]
        }
    },
    {
        id: 6,
        name: "French Fries",
        description: "Crispy golden French fries served with ketchup.",
        price: 4.99,
        category: "Sides",
        image: "https://via.placeholder.com/300?text=Fries",
        nutritionInfo: {
            calories: 380,
            protein: 4,
            carbs: 48,
            fat: 20
        },
        allergens: ["None"],
        options: {
            "Size": [
                { name: "Small", additionalPrice: -1.00 },
                { name: "Regular", additionalPrice: 0 },
                { name: "Large", additionalPrice: 1.50 }
            ],
            "Seasoning": [
                { name: "Regular Salt", additionalPrice: 0 },
                { name: "Garlic Parmesan", additionalPrice: 1.00 },
                { name: "Cajun", additionalPrice: 1.00 }
            ]
        }
    },
    {
        id: 7,
        name: "Chocolate Milkshake",
        description: "Rich and creamy chocolate milkshake topped with whipped cream.",
        price: 6.99,
        category: "Beverages",
        image: "https://via.placeholder.com/300?text=Milkshake",
        nutritionInfo: {
            calories: 550,
            protein: 10,
            carbs: 72,
            fat: 28
        },
        allergens: ["Dairy"],
        options: {
            "Size": [
                { name: "Regular", additionalPrice: 0 },
                { name: "Large", additionalPrice: 1.50 }
            ],
            "Add-ons": [
                { name: "No Whipped Cream", additionalPrice: 0 },
                { name: "Extra Whipped Cream", additionalPrice: 0.50 },
                { name: "Chocolate Syrup", additionalPrice: 0.50 },
                { name: "Cherry on Top", additionalPrice: 0.25 }
            ]
        }
    },
    {
        id: 8,
        name: "Grilled Salmon",
        description: "Fresh Atlantic salmon fillet grilled to perfection with lemon herb butter.",
        price: 19.99,
        category: "Main Courses",
        image: "https://via.placeholder.com/300?text=Salmon",
        nutritionInfo: {
            calories: 480,
            protein: 42,
            carbs: 2,
            fat: 34
        },
        allergens: ["Fish", "Dairy"],
        options: {
            "Side Options": [
                { name: "Steamed Vegetables", additionalPrice: 0 },
                { name: "Mashed Potatoes", additionalPrice: 0 },
                { name: "Rice Pilaf", additionalPrice: 0 },
                { name: "House Salad", additionalPrice: 1.50 }
            ],
            "Cooking Preference": [
                { name: "Medium Rare", additionalPrice: 0 },
                { name: "Medium", additionalPrice: 0 },
                { name: "Well Done", additionalPrice: 0 }
            ]
        }
    },
    {
        id: 9,
        name: "BBQ Chicken Wings",
        description: "Tender chicken wings tossed in our signature BBQ sauce.",
        price: 13.99,
        category: "Appetizers",
        image: "https://via.placeholder.com/300?text=Wings",
        nutritionInfo: {
            calories: 620,
            protein: 38,
            carbs: 18,
            fat: 44
        },
        allergens: ["None"],
        options: {
            "Size": [
                { name: "6 pieces", additionalPrice: -3.00 },
                { name: "12 pieces", additionalPrice: 0 },
                { name: "18 pieces", additionalPrice: 6.00 }
            ],
            "Sauce": [
                { name: "BBQ", additionalPrice: 0 },
                { name: "Buffalo", additionalPrice: 0 },
                { name: "Honey Garlic", additionalPrice: 0 },
                { name: "Teriyaki", additionalPrice: 0.50 }
            ]
        }
    },
    {
        id: 10,
        name: "Vegetable Stir Fry",
        description: "Fresh mixed vegetables stir-fried in a savory sauce, served over steamed rice.",
        price: 12.99,
        category: "Main Courses",
        image: "https://via.placeholder.com/300?text=StirFry",
        nutritionInfo: {
            calories: 380,
            protein: 8,
            carbs: 64,
            fat: 12
        },
        allergens: ["Soy", "Gluten"],
        options: {
            "Base": [
                { name: "White Rice", additionalPrice: 0 },
                { name: "Brown Rice", additionalPrice: 1.00 },
                { name: "Noodles", additionalPrice: 1.50 }
            ],
            "Protein": [
                { name: "No Protein", additionalPrice: 0 },
                { name: "Tofu", additionalPrice: 2.00 },
                { name: "Chicken", additionalPrice: 3.00 },
                { name: "Beef", additionalPrice: 4.00 }
            ]
        }
    },
    {
        id: 11,
        name: "Apple Pie",
        description: "Homemade apple pie with a flaky crust, served warm with vanilla ice cream.",
        price: 7.99,
        category: "Desserts",
        image: "https://via.placeholder.com/300?text=ApplePie",
        nutritionInfo: {
            calories: 430,
            protein: 4,
            carbs: 58,
            fat: 22
        },
        allergens: ["Gluten", "Dairy"],
        options: {
            "Serving": [
                { name: "Plain", additionalPrice: 0 },
                { name: "With Whipped Cream", additionalPrice: 1.00 },
                { name: "With Ice Cream", additionalPrice: 2.00 }
            ]
        }
    },
    {
        id: 12,
        name: "Iced Tea",
        description: "Refreshing house-brewed iced tea.",
        price: 2.99,
        category: "Beverages",
        image: "https://via.placeholder.com/300?text=IcedTea",
        nutritionInfo: {
            calories: 0,
            protein: 0,
            carbs: 0,
            fat: 0
        },
        allergens: ["None"],
        options: {
            "Type": [
                { name: "Unsweetened", additionalPrice: 0 },
                { name: "Sweetened", additionalPrice: 0 }
            ],
            "Flavor": [
                { name: "Regular", additionalPrice: 0 },
                { name: "Peach", additionalPrice: 0.50 },
                { name: "Raspberry", additionalPrice: 0.50 }
            ]
        }
    }
];
