import React, { useState, useEffect } from 'react';
import { View, Text, StyleSheet, ScrollView, TouchableOpacity } from 'react-native';
import Icon from 'react-native-vector-icons/Ionicons';

const OrderStatusScreen = ({ route, navigation }) => {
    const { orderNumber, restaurantName, tableNumber, estimatedTime } = route.params;
    const [currentStatus, setCurrentStatus] = useState('received');
    const [progress, setProgress] = useState(0);
    const [remainingTime, setRemainingTime] = useState(estimatedTime || 20);

    // Status steps
    const statuses = [
        { id: 'received', label: 'Order Received', icon: 'receipt-outline', complete: true },
        { id: 'preparing', label: 'Preparing Your Order', icon: 'restaurant-outline', complete: false },
        { id: 'ready', label: 'Ready to Serve', icon: 'checkmark-circle-outline', complete: false },
        { id: 'delivered', label: 'Delivered to Table', icon: 'happy-outline', complete: false },
    ];

    // Simulate order status progression
    useEffect(() => {
        // Order received -> preparing (after 5 seconds)
        const preparingTimer = setTimeout(() => {
            setCurrentStatus('preparing');
            setProgress(33);
        }, 5000);

        // If we have estimated time, calculate progress based on time intervals
        if (estimatedTime) {
            const interval = setInterval(() => {
                setRemainingTime(prev => {
                    if (prev <= 1) {
                        clearInterval(interval);
                        return 0;
                    }
                    return prev - 1;
                });
            }, 60000); // Update every minute

            // Cleanup
            return () => {
                clearTimeout(preparingTimer);
                clearInterval(interval);
            };
        }

        return () => clearTimeout(preparingTimer);
    }, []);

    // Update status based on current status
    const getStatusDetails = () => {
        const updatedStatuses = statuses.map(status => ({
            ...status,
            complete: getCurrentStatusIndex() > getStatusIndex(status.id),
            active: getCurrentStatusIndex() === getStatusIndex(status.id),
        }));

        return updatedStatuses;
    };

    const getStatusIndex = (statusId) => {
        return statuses.findIndex(s => s.id === statusId);
    };

    const getCurrentStatusIndex = () => {
        return getStatusIndex(currentStatus);
    };

    // Simulate updating order status (for demo purposes)
    const handleUpdateStatus = () => {
        const currentIndex = getCurrentStatusIndex();

        if (currentIndex < statuses.length - 1) {
            const nextStatus = statuses[currentIndex + 1].id;
            setCurrentStatus(nextStatus);
            setProgress((currentIndex + 1) * (100 / (statuses.length - 1)));
        }
    };

    return (
        <ScrollView style={styles.container}>
            <View style={styles.card}>
                <Text style={styles.title}>Order Status</Text>

                <View style={styles.orderInfo}>
                    <View style={styles.orderInfoRow}>
                        <Text style={styles.orderInfoLabel}>Order #:</Text>
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
                </View>

                <View style={styles.progressContainer}>
                    <View style={styles.progressBar}>
                        <View style={[styles.progressFill, { width: `${progress}%` }]} />
                    </View>

                    {remainingTime > 0 && (
                        <Text style={styles.estimatedTime}>
                            Estimated time: <Text style={styles.estimatedTimeValue}>{remainingTime} minutes</Text>
                        </Text>
                    )}
                </View>

                <View style={styles.statusSteps}>
                    {getStatusDetails().map((status, index) => (
                        <View key={status.id} style={styles.statusStep}>
                            <View style={[
                                styles.statusIcon,
                                status.complete && styles.completeStatusIcon,
                                status.active && styles.activeStatusIcon,
                            ]}>
                                <Icon
                                    name={status.icon}
                                    size={20}
                                    color={status.complete || status.active ? '#fff' : '#999'}
                                />
                            </View>

                            <View style={styles.statusLine}>
                                {index < getStatusDetails().length - 1 && (
                                    <View style={[
                                        styles.statusLineFill,
                                        {
                                            backgroundColor: status.complete ? '#4CAF50' : '#eee',
                                        }
                                    ]} />
                                )}
                            </View>

                            <View style={styles.statusContent}>
                                <Text style={[
                                    styles.statusLabel,
                                    status.active && styles.activeStatusLabel,
                                    status.complete && styles.completeStatusLabel,
                                ]}>
                                    {status.label}
                                </Text>

                                {status.active && (
                                    <Text style={styles.statusMessage}>
                                        {status.id === 'received' && "We've received your order and are sending it to the kitchen."}
                                        {status.id === 'preparing' && "Our chefs are preparing your delicious meal."}
                                        {status.id === 'ready' && "Your order is ready and will be served shortly."}
                                        {status.id === 'delivered' && "Enjoy your meal!"}
                                    </Text>
                                )}

                                {status.complete && (
                                    <View style={styles.statusTimestamp}>
                                        <Icon name="time-outline" size={12} color="#666" />
                                        <Text style={styles.statusTimestampText}>
                                            {new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })}
                                        </Text>
                                    </View>
                                )}
                            </View>
                        </View>
                    ))}
                </View>
            </View>

            {/* Demo button to advance status - would not exist in a real app */}
            {getCurrentStatusIndex() < statuses.length - 1 && (
                <TouchableOpacity
                    style={styles.demoButton}
                    onPress={handleUpdateStatus}
                >
                    <Text style={styles.demoButtonText}>Demo: Update Status</Text>
                </TouchableOpacity>
            )}

            <TouchableOpacity
                style={styles.homeButton}
                onPress={() => navigation.navigate('Home')}
            >
                <Text style={styles.homeButtonText}>Return to Home</Text>
            </TouchableOpacity>
        </ScrollView>
    );
};

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: '#f8f8f8',
    },
    card: {
        backgroundColor: '#fff',
        borderRadius: 15,
        padding: 20,
        margin: 15,
        elevation: 4,
        shadowColor: '#000',
        shadowOffset: { width: 0, height: 2 },
        shadowOpacity: 0.1,
        shadowRadius: 4,
    },
    title: {
        fontSize: 20,
        fontWeight: 'bold',
        color: '#333',
        marginBottom: 15,
        textAlign: 'center',
    },
    orderInfo: {
        marginBottom: 20,
        backgroundColor: '#f8f8f8',
        padding: 15,
        borderRadius: 10,
    },
    orderInfoRow: {
        flexDirection: 'row',
        marginBottom: 5,
    },
    orderInfoLabel: {
        fontSize: 14,
        color: '#666',
        width: 90,
    },
    orderInfoValue: {
        fontSize: 14,
        fontWeight: '500',
        color: '#333',
        flex: 1,
    },
    progressContainer: {
        marginBottom: 20,
    },
    progressBar: {
        height: 8,
        backgroundColor: '#eee',
        borderRadius: 4,
        overflow: 'hidden',
        marginBottom: 10,
    },
    progressFill: {
        height: '100%',
        backgroundColor: '#4CAF50',
        borderRadius: 4,
    },
    estimatedTime: {
        fontSize: 14,
        color: '#666',
        textAlign: 'center',
    },
    estimatedTimeValue: {
        fontWeight: 'bold',
        color: '#FF6B6B',
    },
    statusSteps: {
        marginTop: 10,
    },
    statusStep: {
        flexDirection: 'row',
        marginBottom: 15,
    },
    statusIcon: {
        width: 36,
        height: 36,
        borderRadius: 18,
        backgroundColor: '#eee',
        justifyContent: 'center',
        alignItems: 'center',
        zIndex: 2,
    },
    activeStatusIcon: {
        backgroundColor: '#FF6B6B',
    },
    completeStatusIcon: {
        backgroundColor: '#4CAF50',
    },
    statusLine: {
        position: 'absolute',
        left: 18,
        top: 36,
        bottom: -15,
        width: 2,
        zIndex: 1,
    },
    statusLineFill: {
        width: '100%',
        height: '100%',
    },
    statusContent: {
        marginLeft: 15,
        flex: 1,
    },
    statusLabel: {
        fontSize: 16,
        fontWeight: '500',
        color: '#666',
        marginBottom: 5,
    },
    activeStatusLabel: {
        color: '#FF6B6B',
        fontWeight: 'bold',
    },
    completeStatusLabel: {
        color: '#4CAF50',
    },
    statusMessage: {
        fontSize: 14,
        color: '#666',
        marginBottom: 5,
    },
    statusTimestamp: {
        flexDirection: 'row',
        alignItems: 'center',
    },
    statusTimestampText: {
        fontSize: 12,
        color: '#666',
        marginLeft: 5,
    },
    demoButton: {
        backgroundColor: '#ddd',
        padding: 15,
        borderRadius: 10,
        alignItems: 'center',
        marginHorizontal: 15,
    },
    demoButtonText: {
        color: '#333',
    },
    homeButton: {
        backgroundColor: '#FF6B6B',
        padding: 15,
        borderRadius: 10,
        alignItems: 'center',
        margin: 15,
        marginTop: 5,
    },
    homeButtonText: {
        color: '#fff',
        fontWeight: 'bold',
    },
});

export default OrderStatusScreen;
