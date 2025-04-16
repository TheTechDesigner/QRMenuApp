import React, { useState } from 'react';
import { View, Text, StyleSheet, TextInput, TouchableOpacity, ScrollView, Alert } from 'react-native';
import Icon from 'react-native-vector-icons/Ionicons';

const CheckoutScreen = ({ route, navigation }) => {
    const { cartItems, restaurantName, tableNumber, totalAmount } = route.params;

    const [paymentMethod, setPaymentMethod] = useState('card'); // 'card', 'cash', 'mobile'
    const [name, setName] = useState('');
    const [email, setEmail] = useState('');
    const [phone, setPhone] = useState('');
    const [cardNumber, setCardNumber] = useState('');
    const [expiryDate, setExpiryDate] = useState('');
    const [cvv, setCvv] = useState('');
    const [specialInstructions, setSpecialInstructions] = useState('');

    const validateForm = () => {
        if (!name.trim()) {
            Alert.alert('Error', 'Please enter your name');
            return false;
        }

        if (!email.trim() || !email.includes('@')) {
            Alert.alert('Error', 'Please enter a valid email');
            return false;
        }

        if (paymentMethod === 'card') {
            if (!cardNumber.trim() || cardNumber.replace(/\s/g, '').length !== 16) {
                Alert.alert('Error', 'Please enter a valid 16-digit card number');
                return false;
            }

            if (!expiryDate.trim() || !expiryDate.includes('/')) {
                Alert.alert('Error', 'Please enter a valid expiry date (MM/YY)');
                return false;
            }

            if (!cvv.trim() || cvv.length < 3) {
                Alert.alert('Error', 'Please enter a valid CVV');
                return false;
            }
        }

        return true;
    };

    const handleCheckout = () => {
        if (!validateForm()) return;

        // In a real app, this would perform payment processing
        // For demo purposes, we'll just simulate a successful order

        // Generate a random order number
        const orderNumber = Math.floor(100000 + Math.random() * 900000).toString();

        navigation.navigate('OrderConfirmation', {
            orderNumber,
            restaurantName,
            tableNumber,
            totalAmount,
            paymentMethod
        });
    };

    const formatCardNumber = (text) => {
        const cleaned = text.replace(/\s/g, '');
        const formatted = cleaned.match(/.{1,4}/g)?.join(' ') || cleaned;
        return formatted.slice(0, 19); // Limit to 16 digits + 3 spaces
    };

    const formatExpiryDate = (text) => {
        const cleaned = text.replace(/[^\d]/g, '');
        if (cleaned.length >= 3) {
            return `${cleaned.slice(0, 2)}/${cleaned.slice(2, 4)}`;
        }
        return cleaned;
    };

    return (
        <ScrollView style={styles.container}>
            <View style={styles.section}>
                <Text style={styles.sectionTitle}>Order Details</Text>
                <View style={styles.infoRow}>
                    <Text style={styles.infoLabel}>Restaurant:</Text>
                    <Text style={styles.infoValue}>{restaurantName}</Text>
                </View>
                <View style={styles.infoRow}>
                    <Text style={styles.infoLabel}>Table:</Text>
                    <Text style={styles.infoValue}>{tableNumber}</Text>
                </View>
                <View style={styles.infoRow}>
                    <Text style={styles.infoLabel}>Items:</Text>
                    <Text style={styles.infoValue}>{cartItems.length}</Text>
                </View>
                <View style={styles.infoRow}>
                    <Text style={styles.infoLabel}>Total:</Text>
                    <Text style={styles.infoValue}>${totalAmount}</Text>
                </View>
            </View>

            <View style={styles.section}>
                <Text style={styles.sectionTitle}>Contact Information</Text>

                <Text style={styles.inputLabel}>Name</Text>
                <TextInput
                    style={styles.input}
                    value={name}
                    onChangeText={setName}
                    placeholder="Enter your name"
                />

                <Text style={styles.inputLabel}>Email</Text>
                <TextInput
                    style={styles.input}
                    value={email}
                    onChangeText={setEmail}
                    placeholder="Enter your email"
                    keyboardType="email-address"
                    autoCapitalize="none"
                />

                <Text style={styles.inputLabel}>Phone (optional)</Text>
                <TextInput
                    style={styles.input}
                    value={phone}
                    onChangeText={setPhone}
                    placeholder="Enter your phone number"
                    keyboardType="phone-pad"
                />
            </View>

            <View style={styles.section}>
                <Text style={styles.sectionTitle}>Payment Method</Text>

                <View style={styles.paymentOptions}>
                    <TouchableOpacity
                        style={[
                            styles.paymentOption,
                            paymentMethod === 'card' && styles.selectedPaymentOption
                        ]}
                        onPress={() => setPaymentMethod('card')}
                    >
                        <Ionicons
                            name="card-outline"
                            size={24}
                            color={paymentMethod === 'card' ? '#fff' : '#666'}
                        />
                        <Text style={[
                            styles.paymentOptionText,
                            paymentMethod === 'card' && styles.selectedPaymentOptionText
                        ]}>
                            Credit Card
                        </Text>
                    </TouchableOpacity>

                    <TouchableOpacity
                        style={[
                            styles.paymentOption,
                            paymentMethod === 'cash' && styles.selectedPaymentOption
                        ]}
                        onPress={() => setPaymentMethod('cash')}
                    >
                        <Ionicons
                            name="cash-outline"
                            size={24}
                            color={paymentMethod === 'cash' ? '#fff' : '#666'}
                        />
                        <Text style={[
                            styles.paymentOptionText,
                            paymentMethod === 'cash' && styles.selectedPaymentOptionText
                        ]}>
                            Cash
                        </Text>
                    </TouchableOpacity>

                    <TouchableOpacity
                        style={[
                            styles.paymentOption,
                            paymentMethod === 'mobile' && styles.selectedPaymentOption
                        ]}
                        onPress={() => setPaymentMethod('mobile')}
                    >
                        <Ionicons
                            name="phone-portrait-outline"
                            size={24}
                            color={paymentMethod === 'mobile' ? '#fff' : '#666'}
                        />
                        <Text style={[
                            styles.paymentOptionText,
                            paymentMethod === 'mobile' && styles.selectedPaymentOptionText
                        ]}>
                            Mobile Pay
                        </Text>
                    </TouchableOpacity>
                </View>

                {paymentMethod === 'card' && (
                    <View style={styles.cardDetails}>
                        <Text style={styles.inputLabel}>Card Number</Text>
                        <TextInput
                            style={styles.input}
                            value={cardNumber}
                            onChangeText={(text) => setCardNumber(formatCardNumber(text))}
                            placeholder="1234 5678 9012 3456"
                            keyboardType="number-pad"
                            maxLength={19}
                        />

                        <View style={styles.cardSecurityRow}>
                            <View style={styles.expiryContainer}>
                                <Text style={styles.inputLabel}>Expiry Date</Text>
                                <TextInput
                                    style={styles.input}
                                    value={expiryDate}
                                    onChangeText={(text) => setExpiryDate(formatExpiryDate(text))}
                                    placeholder="MM/YY"
                                    keyboardType="number-pad"
                                    maxLength={5}
                                />
                            </View>

                            <View style={styles.cvvContainer}>
                                <Text style={styles.inputLabel}>CVV</Text>
                                <TextInput
                                    style={styles.input}
                                    value={cvv}
                                    onChangeText={setCvv}
                                    placeholder="123"
                                    keyboardType="number-pad"
                                    maxLength={4}
                                    secureTextEntry
                                />
                            </View>
                        </View>
                    </View>
                )}

                {paymentMethod === 'mobile' && (
                    <View style={styles.mobilePayInfo}>
                        <Text style={styles.mobilePayText}>
                            You will be able to use your preferred mobile payment app when your order is confirmed.
                        </Text>
                    </View>
                )}

                {paymentMethod === 'cash' && (
                    <View style={styles.cashInfo}>
                        <Text style={styles.cashInfoText}>
                            Please have the exact amount ready. Our staff will collect payment at your table.
                        </Text>
                    </View>
                )}
            </View>

            <View style={styles.section}>
                <Text style={styles.sectionTitle}>Special Instructions (optional)</Text>
                <TextInput
                    style={[styles.input, styles.textArea]}
                    value={specialInstructions}
                    onChangeText={setSpecialInstructions}
                    placeholder="Any special requests or dietary restrictions?"
                    multiline
                    numberOfLines={4}
                    textAlignVertical="top"
                />
            </View>

            <TouchableOpacity
                style={styles.placeOrderButton}
                onPress={handleCheckout}
            >
                <Text style={styles.placeOrderButtonText}>Place Order - ${totalAmount}</Text>
            </TouchableOpacity>
        </ScrollView>
    );
};

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: '#f8f8f8',
    },
    section: {
        backgroundColor: '#fff',
        borderRadius: 10,
        padding: 15,
        margin: 15,
        marginBottom: 5,
        elevation: 2,
        shadowColor: '#000',
        shadowOffset: { width: 0, height: 1 },
        shadowOpacity: 0.1,
        shadowRadius: 2,
    },
    sectionTitle: {
        fontSize: 18,
        fontWeight: 'bold',
        marginBottom: 15,
        color: '#333',
    },
    infoRow: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        marginBottom: 10,
    },
    infoLabel: {
        fontSize: 14,
        color: '#666',
    },
    infoValue: {
        fontSize: 14,
        fontWeight: '500',
        color: '#333',
    },
    inputLabel: {
        fontSize: 14,
        color: '#666',
        marginBottom: 5,
    },
    input: {
        backgroundColor: '#f8f8f8',
        borderRadius: 8,
        padding: 12,
        marginBottom: 15,
        borderWidth: 1,
        borderColor: '#eee',
    },
    textArea: {
        height: 100,
    },
    paymentOptions: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        marginBottom: 15,
    },
    paymentOption: {
        flex: 1,
        alignItems: 'center',
        justifyContent: 'center',
        padding: 15,
        backgroundColor: '#f8f8f8',
        borderRadius: 8,
        marginHorizontal: 5,
        borderWidth: 1,
        borderColor: '#eee',
    },
    selectedPaymentOption: {
        backgroundColor: '#FF6B6B',
        borderColor: '#FF6B6B',
    },
    paymentOptionText: {
        fontSize: 12,
        marginTop: 5,
        color: '#666',
    },
    selectedPaymentOptionText: {
        color: '#fff',
    },
    cardSecurityRow: {
        flexDirection: 'row',
    },
    expiryContainer: {
        flex: 1,
        marginRight: 10,
    },
    cvvContainer: {
        flex: 1,
    },
    mobilePayInfo: {
        backgroundColor: '#f8f8f8',
        padding: 15,
        borderRadius: 8,
        marginBottom: 15,
    },
    mobilePayText: {
        fontSize: 14,
        color: '#666',
        textAlign: 'center',
    },
    cashInfo: {
        backgroundColor: '#f8f8f8',
        padding: 15,
        borderRadius: 8,
        marginBottom: 15,
    },
    cashInfoText: {
        fontSize: 14,
        color: '#666',
        textAlign: 'center',
    },
    placeOrderButton: {
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
        marginBottom: 30,
    },
    placeOrderButtonText: {
        color: 'white',
        fontSize: 16,
        fontWeight: 'bold',
    },
});

export default CheckoutScreen;
