import React, { useState, useContext } from 'react';
import { View, Text, StyleSheet, FlatList, TouchableOpacity, Image, ScrollView } from 'react-native';
import Icon from 'react-native-vector-icons/Ionicons';
import { MENU_DATA } from '../data/menuData';

const MenuScreen = ({ route, navigation }) => {
    const { restaurantId, restaurantName, tableNumber } = route.params;
    const [selectedCategory, setSelectedCategory] = useState('All');
    const [cartItems, setCartItems] = useState([]);

    // Get categories from menu data
    const categories = ['All', ...new Set(MENU_DATA.map(item => item.category))];

    // Filter menu items based on selected category
    const filteredItems = selectedCategory === 'All'
        ? MENU_DATA
        : MENU_DATA.filter(item => item.category === selectedCategory);

    const getTotalItemsInCart = () => {
        return cartItems.reduce((total, item) => total + item.quantity, 0);
    };

    const getTotalPrice = () => {
        return cartItems.reduce((total, item) => total + (item.price * item.quantity), 0).toFixed(2);
    };

    const addToCart = (item) => {
        setCartItems(prevItems => {
            const existingItem = prevItems.find(i => i.id === item.id);

            if (existingItem) {
                // Item exists, increment quantity
                return prevItems.map(i =>
                    i.id === item.id
                        ? { ...i, quantity: i.quantity + 1 }
                        : i
                );
            } else {
                // Item doesn't exist, add to cart
                return [...prevItems, { ...item, quantity: 1 }];
            }
        });
    };

    const renderCategory = ({ item }) => (
        <TouchableOpacity
            style={[
                styles.categoryItem,
                selectedCategory === item && styles.selectedCategory,
            ]}
            onPress={() => setSelectedCategory(item)}
        >
            <Text
                style={[
                    styles.categoryText,
                    selectedCategory === item && styles.selectedCategoryText,
                ]}
            >
                {item}
            </Text>
        </TouchableOpacity>
    );

    const renderMenuItem = ({ item }) => (
        <TouchableOpacity
            style={styles.menuItem}
            onPress={() => navigation.navigate('ItemDetail', { item, addToCart })}
        >
            <Image
                source={{ uri: item.image || 'https://via.placeholder.com/100' }}
                style={styles.menuItemImage}
            />
            <View style={styles.menuItemContent}>
                <Text style={styles.menuItemName}>{item.name}</Text>
                <Text style={styles.menuItemDescription} numberOfLines={2}>
                    {item.description}
                </Text>
                <View style={styles.menuItemFooter}>
                    <Text style={styles.menuItemPrice}>${item.price.toFixed(2)}</Text>
                    <TouchableOpacity
                        style={styles.addButton}
                        onPress={() => addToCart(item)}
                    >
                        <Icon name="add" size={20} color="white" />
                    </TouchableOpacity>
                </View>
            </View>
        </TouchableOpacity>
    );

    return (
        <View style={styles.container}>
            <View style={styles.header}>
                <Text style={styles.tableInfo}>Table {tableNumber}</Text>
            </View>

            <View style={styles.categoriesContainer}>
                <FlatList
                    data={categories}
                    renderItem={renderCategory}
                    keyExtractor={item => item}
                    horizontal
                    showsHorizontalScrollIndicator={false}
                />
            </View>

            <FlatList
                data={filteredItems}
                renderItem={renderMenuItem}
                keyExtractor={item => item.id.toString()}
                contentContainerStyle={styles.menuList}
            />

            {cartItems.length > 0 && (
                <TouchableOpacity
                    style={styles.cartButton}
                    onPress={() => navigation.navigate('Cart', { cartItems, setCartItems, restaurantName, tableNumber })}
                >
                    <View style={styles.cartContent}>
                        <View style={styles.cartInfo}>
                            <View style={styles.cartBadge}>
                                <Text style={styles.cartBadgeText}>{getTotalItemsInCart()}</Text>
                            </View>
                            <Text style={styles.cartText}>View Cart</Text>
                        </View>
                        <Text style={styles.cartPrice}>${getTotalPrice()}</Text>
                    </View>
                </TouchableOpacity>
            )}
        </View>
    );
};

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: '#f8f8f8',
    },
    header: {
        padding: 10,
        backgroundColor: '#fff',
        borderBottomWidth: 1,
        borderBottomColor: '#eee',
        flexDirection: 'row',
        justifyContent: 'center',
    },
    tableInfo: {
        fontSize: 14,
        color: '#666',
    },
    categoriesContainer: {
        backgroundColor: '#fff',
        paddingVertical: 10,
    },
    categoryItem: {
        paddingHorizontal: 20,
        paddingVertical: 8,
        marginHorizontal: 5,
        borderRadius: 20,
        backgroundColor: '#f0f0f0',
    },
    selectedCategory: {
        backgroundColor: '#FF6B6B',
    },
    categoryText: {
        fontSize: 14,
        fontWeight: '500',
        color: '#666',
    },
    selectedCategoryText: {
        color: '#fff',
    },
    menuList: {
        paddingHorizontal: 15,
        paddingVertical: 10,
    },
    menuItem: {
        flexDirection: 'row',
        backgroundColor: '#fff',
        borderRadius: 10,
        marginBottom: 15,
        overflow: 'hidden',
        elevation: 2,
        shadowColor: '#000',
        shadowOffset: { width: 0, height: 2 },
        shadowOpacity: 0.1,
        shadowRadius: 4,
    },
    menuItemImage: {
        width: 100,
        height: 100,
    },
    menuItemContent: {
        flex: 1,
        padding: 10,
        justifyContent: 'space-between',
    },
    menuItemName: {
        fontSize: 16,
        fontWeight: 'bold',
        marginBottom: 5,
    },
    menuItemDescription: {
        fontSize: 13,
        color: '#666',
        marginBottom: 10,
    },
    menuItemFooter: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center',
    },
    menuItemPrice: {
        fontSize: 16,
        fontWeight: 'bold',
        color: '#333',
    },
    addButton: {
        backgroundColor: '#FF6B6B',
        width: 30,
        height: 30,
        borderRadius: 15,
        justifyContent: 'center',
        alignItems: 'center',
    },
    cartButton: {
        backgroundColor: '#FF6B6B',
        padding: 15,
        margin: 15,
        borderRadius: 10,
        elevation: 3,
        shadowColor: '#000',
        shadowOffset: { width: 0, height: 2 },
        shadowOpacity: 0.2,
        shadowRadius: 4,
    },
    cartContent: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center',
    },
    cartInfo: {
        flexDirection: 'row',
        alignItems: 'center',
    },
    cartBadge: {
        backgroundColor: 'white',
        width: 24,
        height: 24,
        borderRadius: 12,
        justifyContent: 'center',
        alignItems: 'center',
        marginRight: 10,
    },
    cartBadgeText: {
        color: '#FF6B6B',
        fontWeight: 'bold',
        fontSize: 12,
    },
    cartText: {
        color: 'white',
        fontWeight: 'bold',
        fontSize: 16,
    },
    cartPrice: {
        color: 'white',
        fontWeight: 'bold',
        fontSize: 16,
    },
});

export default MenuScreen;
