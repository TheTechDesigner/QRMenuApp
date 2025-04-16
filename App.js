import React, { useState } from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';
import { StatusBar } from 'react-native';

// Import screens
import HomeScreen from './screens/HomeScreen';
import ScanScreen from './screens/ScanScreen';
import MenuScreen from './screens/MenuScreen';
import ItemDetailScreen from './screens/ItemDetailScreen';
import CartScreen from './screens/CartScreen';
import CheckoutScreen from './screens/CheckoutScreen';
import OrderConfirmationScreen from './screens/OrderConfirmationScreen';
import OrderStatusScreen from './screens/OrderStatusScreen';

const Stack = createStackNavigator();

export default function App() {
  return (
    <NavigationContainer>
      <StatusBar barStyle="dark-content" />
      <Stack.Navigator
        initialRouteName="Home"
        screenOptions={{
          headerStyle: {
            backgroundColor: '#f8f8f8',
            elevation: 0,
            shadowOpacity: 0,
          },
          headerTintColor: '#333',
          headerTitleStyle: {
            fontWeight: 'bold',
          },
        }}
      >
        <Stack.Screen
          name="Home"
          component={HomeScreen}
          options={{ headerShown: false }}
        />
        <Stack.Screen
          name="Scan"
          component={ScanScreen}
          options={{ title: 'Scan QR Code' }}
        />
        <Stack.Screen
          name="Menu"
          component={MenuScreen}
          options={({ route }) => ({ title: route.params.restaurantName || 'Menu' })}
        />
        <Stack.Screen
          name="ItemDetail"
          component={ItemDetailScreen}
          options={({ route }) => ({ title: route.params.item.name || 'Item Details' })}
        />
        <Stack.Screen
          name="Cart"
          component={CartScreen}
          options={{ title: 'Your Cart' }}
        />
        <Stack.Screen
          name="Checkout"
          component={CheckoutScreen}
          options={{ title: 'Checkout' }}
        />
        <Stack.Screen
          name="OrderConfirmation"
          component={OrderConfirmationScreen}
          options={{ title: 'Order Confirmed', headerLeft: null }}
        />
        <Stack.Screen
          name="OrderStatus"
          component={OrderStatusScreen}
          options={{ title: 'Order Status' }}
        />
      </Stack.Navigator>
    </NavigationContainer>
  );
}