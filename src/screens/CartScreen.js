import React from 'react';
import { View, Text, StyleSheet, FlatList, TouchableOpacity, Image, Alert } from 'react-native';
import Icon from 'react-native-vector-icons/Ionicons';

const CartScreen = ({ route, navigation }) => {
    const { cartItems, setCartItems, restaurantName, tableNumber } = route.params;

    const updateQuantity = (itemId, newQuantity) => {
        if (newQuantity <= 0) {
            // Remove item if quantity is zero or less
            setCartItems(prevItems => prevItems.filter(item => item.id !== itemId));
        } else {
            // Update quantity
            setCartItems(prevItems =>
                prevItems.map(item =>
                    item.id === itemId
                        ? { ...item, quantity: newQuantity }
                        : item
                )
            );
        }
    };

    const getTotalPrice = () => {
        return cartItems.reduce((total, item) => {
            const itemPrice = item.totalPrice || (item.price * item.quantity);
            return total + itemPrice;
        }, 0).toFixed(2);
    };

    const renderCartItem = ({ item }) => {
        // Determine item price (either precalculated total or price * quantity)
        const itemTotalPrice = item.totalPrice || (item.price * item.quantity);

        return (
            <View style={styles.cartItem}>
                <Image
                    source={{ uri: item.image || 'https://via.placeholder.com/80' }}
                    style={styles.itemImage}
                />

                <View style={styles.itemDetails}>
                    <Text style={styles.itemName}>{item.name}</Text>

                    {item.selectedOptions && Object.keys(item.selectedOptions).length > 0 && (
                        <Text style={styles.itemOptions}>
                            {Object.entries(item.selectedOptions)
                                .map(([key, value]) => `${value}`)
                                .join(', ')}
                        </Text>
                    )}

                    <View style={styles.itemFooter}>
                        <View style={styles.quantityControl}>
                            <TouchableOpacity
                                style={styles.quantityButton}
                                onPress={() => updateQuantity(item.id, item.quantity - 1)}
                            >
                                <Icon name="remove" size={16} color="#666" />
                            </TouchableOpacity>

                            <Text style={styles.quantityText}>{item.quantity}</Text>

                            <TouchableOpacity
                                style={styles.quantityButton}
                                onPress={() => updateQuantity(item.id, item.quantity + 1)}
                            >
                                <Icon name="add" size={16} color="#666" />
                            </TouchableOpacity>
                        </View>

                        <Text style={styles.itemPrice}>${itemTotalPrice.toFixed(2)}</Text>
                    </View>
                </View>
            </View>
        );
    };

    return (
        <View style={styles.container}>
            <View style={styles.header}>
                <Text style={styles.restaurantName}>{restaurantName}</Text>
                <Text style={styles.tableNumber}>Table {tableNumber}</Text>
            </View>

            {cartItems.length > 0 ? (
                <>
                    <FlatList
                        data={cartItems}
                        renderItem={renderCartItem}
                        keyExtractor={item => item.id.toString()}
                        contentContainerStyle={styles.cartList}
                    />

                    <View style={styles.cartSummary}>
                        <View style={styles.summaryRow}>
                            <Text style={styles.summaryLabel}>Subtotal</Text>
                            <Text style={styles.summaryValue}>${getTotalPrice()}</Text>
                        </View>

                        <View style={styles.summaryRow}>
                            <Text style={styles.summaryLabel}>Tax</Text>
                            <Text style={styles.summaryValue}>${(parseFloat(getTotalPrice()) * 0.08).toFixed(2)}</Text>
                        </View>

                        <View style={styles.summaryRowTotal}>
                            <Text style={styles.totalLabel}>Total</Text>
                            <Text style={styles.totalValue}>
                                ${(parseFloat(getTotalPrice()) * 1.08).toFixed(2)}
                            </Text>
                        </View>
                    </View>

                    <TouchableOpacity
                        style={styles.checkoutButton}
                        onPress={() => navigation.navigate('Checkout', {
                            cartItems,
                            restaurantName,
                            tableNumber,
                            totalAmount: (parseFloat(getTotalPrice()) * 1.08).toFixed(2)
                        })}
                    >
                        <Text style={styles.checkoutButtonText}>Proceed to Checkout</Text>
                    </TouchableOpacity>

                    <TouchableOpacity
                        style={styles.clearButton}
                        onPress={() => {
                            Alert.alert(
                                "Clear Cart",
                                "Are you sure you want to remove all items?",
                                [
                                    { text: "Cancel", style: "cancel" },
                                    { text: "Clear", style: "destructive", onPress: () => setCartItems([]) }
                                ]
                            );
                        }}
                    >
                        <Text style={styles.clearButtonText}>Clear Cart</Text>
                    </TouchableOpacity>
                </>
            ) : (
                <View style={styles.emptyCart}>
                    <Icon name="cart-outline" size={60} color="#ccc" />
                    <Text style={styles.emptyCartText}>Your cart is empty</Text>
                    <TouchableOpacity
                        style={styles.continueShoppingButton}
                        onPress={() => navigation.goBack()}
                    >
                        <Text style={styles.continueShoppingText}>Continue Shopping</Text>
                    </TouchableOpacity>
                </View>
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
        padding: 15,
        backgroundColor: '#fff',
        borderBottomWidth: 1,
        borderBottomColor: '#eee',
    },
    restaurantName: {
        fontSize: 16,
        fontWeight: 'bold',
        color: '#333',
    },
    tableNumber: {
        fontSize: 14,
        color: '#666',
        marginTop: 5,
    },
    cartList: {
        padding: 15,
    },
    cartItem: {
        flexDirection: 'row',
        backgroundColor: '#fff',
        borderRadius: 10,
        padding: 10,
        marginBottom: 10,
        elevation: 2,
        shadowColor: '#000',
        shadowOffset: { width: 0, height: 1 },
        shadowOpacity: 0.1,
        shadowRadius: 2,
    },
    itemImage: {
        width: 80,
        height: 80,
        borderRadius: 5,
    },
    itemDetails: {
        flex: 1,
        marginLeft: 10,
        justifyContent: 'space-between',
    },
    itemName: {
        fontSize: 16,
        fontWeight: 'bold',
    },
    itemOptions: {
        fontSize: 12,
        color: '#666',
        marginTop: 5,
    },
    itemFooter: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center',
        marginTop: 5,
    },
    quantityControl: {
        flexDirection: 'row',
        alignItems: 'center',
        backgroundColor: '#f0f0f0',
        borderRadius: 15,
        paddingHorizontal: 5,
    },
    quantityButton: {
        width: 30,
        height: 30,
        justifyContent: 'center',
        alignItems: 'center',
    },
    quantityText: {
        fontSize: 14,
        fontWeight: 'bold',
        marginHorizontal: 8,
    },
    itemPrice: {
        fontSize: 16,
        fontWeight: 'bold',
        color: '#FF6B6B',
    },
    cartSummary: {
        backgroundColor: '#fff',
        borderRadius: 10,
        padding: 15,
        margin: 15,
        elevation: 2,
        shadowColor: '#000',
        shadowOffset: { width: 0, height: 1 },
        shadowOpacity: 0.1,
        shadowRadius: 2,
    },
    summaryRow: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        marginBottom: 10,
    },
    summaryLabel: {
        fontSize: 14,
        color: '#666',
    },
    summaryValue: {
        fontSize: 14,
        color: '#333',
    },
    summaryRowTotal: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        borderTopWidth: 1,
        borderTopColor: '#eee',
        paddingTop: 10,
        marginTop: 5,
    },
    totalLabel: {
        fontSize: 16,
        fontWeight: 'bold',
    },
    totalValue: {
        fontSize: 18,
        fontWeight: 'bold',
        color: '#FF6B6B',
    },
    checkoutButton: {
        backgroundColor: '#FF6B6B',
        padding: 15,
        margin: 15,
        borderRadius: 10,
        alignItems: 'center',
        elevation: 3,
        shadowColor: '#000',
        shadowOffset: { width: 0, height: 2 },
        shadowOpacity: 0.2,
        shadowRadius: 4,
    },
    checkoutButtonText: {
        color: 'white',
        fontSize: 16,
        fontWeight: 'bold',
    },
    clearButton: {
        padding: 10,
        marginHorizontal: 15,
        alignItems: 'center',
    },
    clearButtonText: {
        color: '#999',
    },
    emptyCart: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
        padding: 20,
    },
    emptyCartText: {
        fontSize: 18,
        color: '#999',
        marginTop: 10,
        marginBottom: 20,
    },
    continueShoppingButton: {
        backgroundColor: '#FF6B6B',
        padding: 15,
        borderRadius: 10,
        width: 200,
        alignItems: 'center',
    },
    continueShoppingText: {
        color: 'white',
        fontWeight: 'bold',
    },
});

export default CartScreen;
