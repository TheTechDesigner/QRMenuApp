import React, { useState } from 'react';
import { View, Text, StyleSheet, Image, TouchableOpacity, ScrollView } from 'react-native';
import Icon from 'react-native-vector-icons/Ionicons';

const ItemDetailScreen = ({ route, navigation }) => {
    const { item, addToCart } = route.params;
    const [quantity, setQuantity] = useState(1);
    const [selectedOptions, setSelectedOptions] = useState({});

    // Calculate total price based on quantity and selected options
    const calculateTotalPrice = () => {
        let total = item.price;

        // Add cost of options
        if (item.options) {
            Object.keys(selectedOptions).forEach(optionGroup => {
                const option = item.options[optionGroup].find(
                    opt => opt.name === selectedOptions[optionGroup]
                );
                if (option && option.additionalPrice) {
                    total += option.additionalPrice;
                }
            });
        }

        return (total * quantity).toFixed(2);
    };

    const handleAddToCart = () => {
        // Create a new item object with selected options and quantity
        const cartItem = {
            ...item,
            selectedOptions,
            quantity,
            totalPrice: parseFloat(calculateTotalPrice())
        };

        // Call the addToCart function from MenuScreen
        addToCart(cartItem);

        // Navigate back to the menu
        navigation.goBack();
    };
};

const renderOptionsSection = () => {
    if (!item.options) return null;

    return Object.keys(item.options).map(optionGroup => (
        <View style={styles.optionSection} key={optionGroup}>
            <Text style={styles.optionTitle}>{optionGroup}</Text>
            {item.options[optionGroup].map(option => (
                <TouchableOpacity
                    key={option.name}
                    style={[
                        styles.optionItem,
                        selectedOptions[optionGroup] === option.name && styles.selectedOptionItem
                    ]}
                    onPress={() => setSelectedOptions({
                        ...selectedOptions,
                        [optionGroup]: option.name
                    })}
                >
                    <Text style={[
                        styles.optionName,
                        selectedOptions[optionGroup] === option.name && styles.selectedOptionText
                    ]}>
                        {option.name}
                    </Text>
                    {option.additionalPrice > 0 && (
                        <Text style={[
                            styles.optionPrice,
                            selectedOptions[optionGroup] === option.name && styles.selectedOptionText
                        ]}>
                            +${option.additionalPrice.toFixed(2)}
                        </Text>
                    )}
                </TouchableOpacity>
            ))}
        </View>
    ));
};

return (
    <ScrollView style={styles.container}>
        <Image
            source={{ uri: item.image || 'https://via.placeholder.com/400' }}
            style={styles.image}
        />

        <View style={styles.content}>
            <View style={styles.header}>
                <Text style={styles.name}>{item.name}</Text>
                <Text style={styles.price}>${item.price.toFixed(2)}</Text>
            </View>

            <Text style={styles.description}>{item.description}</Text>

            {renderOptionsSection()}

            <View style={styles.quantitySection}>
                <Text style={styles.quantityTitle}>Quantity</Text>
                <View style={styles.quantityControl}>
                    <TouchableOpacity
                        style={styles.quantityButton}
                        onPress={() => setQuantity(Math.max(1, quantity - 1))}
                    >
                        <Icon name="remove" size={20} color="#666" />
                    </TouchableOpacity>

                    <Text style={styles.quantityText}>{quantity}</Text>

                    <TouchableOpacity
                        style={styles.quantityButton}
                        onPress={() => setQuantity(quantity + 1)}
                    >
                        <Icon name="add" size={20} color="#666" />
                    </TouchableOpacity>
                </View>
            </View>

            <View style={styles.nutritionInfo}>
                <Text style={styles.nutritionTitle}>Nutrition Information</Text>
                <View style={styles.nutritionGrid}>
                    <View style={styles.nutritionItem}>
                        <Text style={styles.nutritionValue}>{item.nutritionInfo?.calories || '---'}</Text>
                        <Text style={styles.nutritionLabel}>Calories</Text>
                    </View>
                    <View style={styles.nutritionItem}>
                        <Text style={styles.nutritionValue}>{item.nutritionInfo?.protein || '---'}g</Text>
                        <Text style={styles.nutritionLabel}>Protein</Text>
                    </View>
                    <View style={styles.nutritionItem}>
                        <Text style={styles.nutritionValue}>{item.nutritionInfo?.carbs || '---'}g</Text>
                        <Text style={styles.nutritionLabel}>Carbs</Text>
                    </View>
                    <View style={styles.nutritionItem}>
                        <Text style={styles.nutritionValue}>{item.nutritionInfo?.fat || '---'}g</Text>
                        <Text style={styles.nutritionLabel}>Fat</Text>
                    </View>
                </View>
            </View>

            {item.allergens && (
                <View style={styles.allergensSection}>
                    <Text style={styles.allergensTitle}>Allergens</Text>
                    <Text style={styles.allergensText}>{item.allergens.join(', ')}</Text>
                </View>
            )}
        </View>

        <TouchableOpacity
            style={styles.addToCartButton}
            onPress={handleAddToCart}
        >
            <Text style={styles.addToCartText}>
                Add to Cart - ${calculateTotalPrice()}
            </Text>
        </TouchableOpacity>
    </ScrollView>
);

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: '#fff',
    },
    image: {
        width: '100%',
        height: 250,
    },
    content: {
        padding: 20,
    },
    header: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center',
        marginBottom: 15,
    },
    name: {
        fontSize: 24,
        fontWeight: 'bold',
        flex: 1,
    },
    price: {
        fontSize: 20,
        fontWeight: 'bold',
        color: '#FF6B6B',
    },
    description: {
        fontSize: 16,
        color: '#555',
        lineHeight: 22,
        marginBottom: 20,
    },
    optionSection: {
        marginBottom: 20,
    },
    optionTitle: {
        fontSize: 18,
        fontWeight: 'bold',
        marginBottom: 10,
    },
    optionItem: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        paddingVertical: 12,
        paddingHorizontal: 15,
        backgroundColor: '#f8f8f8',
        borderRadius: 8,
        marginBottom: 8,
    },
    selectedOptionItem: {
        backgroundColor: '#FF6B6B',
    },
    optionName: {
        fontSize: 16,
        color: '#333',
    },
    optionPrice: {
        fontSize: 16,
        color: '#666',
    },
    selectedOptionText: {
        color: '#fff',
    },
    quantitySection: {
        marginBottom: 20,
    },
    quantityTitle: {
        fontSize: 18,
        fontWeight: 'bold',
        marginBottom: 10,
    },
    quantityControl: {
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'center',
        backgroundColor: '#f8f8f8',
        borderRadius: 8,
        padding: 10,
    },
    quantityButton: {
        width: 40,
        height: 40,
        justifyContent: 'center',
        alignItems: 'center',
        backgroundColor: '#eee',
        borderRadius: 20,
    },
    quantityText: {
        fontSize: 18,
        fontWeight: 'bold',
        marginHorizontal: 20,
    },
    nutritionInfo: {
        marginBottom: 20,
    },
    nutritionTitle: {
        fontSize: 18,
        fontWeight: 'bold',
        marginBottom: 10,
    },
    nutritionGrid: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        backgroundColor: '#f8f8f8',
        borderRadius: 8,
        padding: 15,
    },
    nutritionItem: {
        alignItems: 'center',
    },
    nutritionValue: {
        fontSize: 16,
        fontWeight: 'bold',
        color: '#333',
    },
    nutritionLabel: {
        fontSize: 14,
        color: '#666',
        marginTop: 5,
    },
    allergensSection: {
        marginBottom: 20,
    },
    allergensTitle: {
        fontSize: 18,
        fontWeight: 'bold',
        marginBottom: 10,
    },
    allergensText: {
        fontSize: 16,
        color: '#555',
    },
    addToCartButton: {
        backgroundColor: '#FF6B6B',
        padding: 15,
        margin: 20,
        borderRadius: 10,
        alignItems: 'center',
        elevation: 3,
        shadowColor: '#000',
        shadowOffset: { width: 0, height: 2 },
        shadowOpacity: 0.2,
        shadowRadius: 4,
    },
    addToCartText: {
        color: 'white',
        fontSize: 16,
        fontWeight: 'bold',
    },
});

export default ItemDetailScreen;