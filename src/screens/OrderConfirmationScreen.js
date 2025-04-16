import React, { useState, useEffect } from 'react';
import { View, Text, StyleSheet, TouchableOpacity, Image, ActivityIndicator } from 'react-native';
import Icon from 'react-native-vector-icons/Ionicons';

const OrderConfirmationScreen = ({ route, navigation }) => {
    const { orderNumber, restaurantName, tableNumber, totalAmount, paymentMethod } = route.params;
    const [estimatedTime, setEstimatedTime] = useState(null);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        // Simulate server request for estimated time
        const timer = setTimeout(() => {
            // Random estimated time between 15-30 minutes
            const minutes = Math.floor(Math.random() * 16) + 15;
            setEstimatedTime(minutes);
            setLoading(false);
        }, 2000);

        return () => clearTimeout(timer);
    }, []);

    return (
        <View style={styles.container}>
            <View style={styles.card}>
                <View style={styles.successIcon}>
                    <Icon name="checkmark-circle" size={60} color="#4CAF50" />
                </View>

                <Text style={styles.title}>Order Confirmed!</Text>
                <Text style={styles.message}>
                    Thank you for your order. We have received your order and it is being processed.
                </Text>

                <View style={styles.orderDetails}>
                    <View style={styles.orderInfoRow}>
                        <Text style={styles.orderInfoLabel}>Order Number:</Text>
                        <Text style={styles.orderInfoValue}>{orderNumber}</Text>
                    </View>

                    <View style={styles.orderInfoRow}>
                        <Text style={styles.orderInfoLabel}>Restaurant:</Text>
                        <Text style={styles.orderInfoValue}>{restaurantName}</Text>
                    </View>

                    <View style={styles.orderInfoRow}>
                        <Text style={styles.orderInfoLabel}>Table:</Text>
                        <Text style={styles.orderInfoValue}>{tableNumber}</Text>
                    </View>

                    <View style={styles.orderInfoRow}>
                        <Text style={styles.orderInfoLabel}>Total Amount:</Text>
                        <Text style={styles.orderInfoValue}>${totalAmount}</Text>
                    </View>

                    <View style={styles.orderInfoRow}>
                        <Text style={styles.orderInfoLabel}>Payment Method:</Text>
                        <Text style={styles.orderInfoValue}>
                            {paymentMethod === 'card' ? 'Credit Card' :
                                paymentMethod === 'cash' ? 'Cash' : 'Mobile Payment'}
                        </Text>
                    </View>
                </View>

                <View style={styles.divider} />

                <View style={styles.estimatedTimeSection}>
                    <Text style={styles.estimatedTimeLabel}>Estimated Preparation Time:</Text>
                    {loading ? (
                        <ActivityIndicator size="small" color="#FF6B6B" style={styles.loader} />
                    ) : (
                        <Text style={styles.estimatedTimeValue}>{estimatedTime} minutes</Text>
                    )}
                </View>
            </View>

            <TouchableOpacity
                style={styles.trackOrderButton}
                onPress={() => navigation.navigate('OrderStatus', {
                    orderNumber,
                    restaurantName,
                    tableNumber,
                    estimatedTime
                })}
            >
                <Text style={styles.trackOrderButtonText}>Track Order Status</Text>
            </TouchableOpacity>

            <TouchableOpacity
                style={styles.backButton}
                onPress={() => navigation.navigate('Home')}
            >
                <Text style={styles.backButtonText}>Back to Home</Text>
            </TouchableOpacity>
        </View>
    );
};

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: '#f8f8f8',
        padding: 20,
        justifyContent: 'center',
    },
    card: {
        backgroundColor: '#fff',
        borderRadius: 15,
        padding: 20,
        elevation: 4,
        shadowColor: '#000',
        shadowOffset: { width: 0, height: 2 },
        shadowOpacity: 0.1,
        shadowRadius: 4,
        alignItems: 'center',
    },
    successIcon: {
        marginBottom: 20,
    },
    title: {
        fontSize: 24,
        fontWeight: 'bold',
        color: '#333',
        marginBottom: 10,
        textAlign: 'center',
    },
    message: {
        fontSize: 14,
        color: '#666',
        textAlign: 'center',
        marginBottom: 20,
        lineHeight: 20,
    },
    orderDetails: {
        width: '100%',
        marginBottom: 20,
    },
    orderInfoRow: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        marginBottom: 10,
    },
    orderInfoLabel: {
        fontSize: 14,
        color: '#666',
    },
    orderInfoValue: {
        fontSize: 14,
        fontWeight: '500',
        color: '#333',
    },
    divider: {
        width: '100%',
        height: 1,
        backgroundColor: '#eee',
        marginVertical: 15,
    },
    estimatedTimeSection: {
        width: '100%',
        alignItems: 'center',
    },
    estimatedTimeLabel: {
        fontSize: 14,
        color: '#666',
        marginBottom: 5,
    },
    estimatedTimeValue: {
        fontSize: 24,
        fontWeight: 'bold',
        color: '#FF6B6B',
    },
    loader: {
        marginTop: 10,
    },
    trackOrderButton: {
        backgroundColor: '#FF6B6B',
        padding: 15,
        borderRadius: 10,
        alignItems: 'center',
        marginTop: 20,
        elevation: 3,
        shadowColor: '#000',
        shadowOffset: { width: 0, height: 2 },
        shadowOpacity: 0.2,
        shadowRadius: 4,
    },
    trackOrderButtonText: {
        color: 'white',
        fontSize: 16,
        fontWeight: 'bold',
    },
    backButton: {
        padding: 15,
        borderRadius: 10,
        alignItems: 'center',
        marginTop: 10,
    },
    backButtonText: {
        color: '#666',
        fontSize: 14,
    },
});

export default OrderConfirmationScreen;
