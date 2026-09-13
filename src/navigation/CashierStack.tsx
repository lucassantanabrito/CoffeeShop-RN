import React from 'react';
import {createNativeStackNavigator} from '@react-navigation/native-stack';
import {OrdersListScreen} from '../screens/cashier/OrdersListScreen';
import {NewOrderScreen} from '../screens/cashier/NewOrderScreen';
import {ConfirmOrderScreen} from '../screens/cashier/ConfirmOrderScreen';
import type {CashierStackParamList} from '../types/navigation';

const Stack = createNativeStackNavigator<CashierStackParamList>();

export function CashierStack() {
  return (
    <Stack.Navigator screenOptions={{headerShown: false}}>
      <Stack.Screen name="OrdersList" component={OrdersListScreen} />
      <Stack.Screen name="NewOrder" component={NewOrderScreen} />
      <Stack.Screen name="ConfirmOrder" component={ConfirmOrderScreen} />
    </Stack.Navigator>
  );
}
