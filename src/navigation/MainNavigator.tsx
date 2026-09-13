import React from 'react';
import {Text, StyleSheet} from 'react-native';
import {createBottomTabNavigator} from '@react-navigation/bottom-tabs';
import {CashierStack} from './CashierStack';
import {BaristaTabs} from './BaristaTabs';
import {colors} from '../theme/colors';
import type {MainTabParamList} from '../types/navigation';

const Tab = createBottomTabNavigator<MainTabParamList>();

function CaixaIcon({color}: {color: string}) {
  return <Text style={[styles.icon, {color}]}>💰</Text>;
}

function BaristaIcon({color}: {color: string}) {
  return <Text style={[styles.icon, {color}]}>☕</Text>;
}

export function MainNavigator() {
  return (
    <Tab.Navigator
      screenOptions={{
        headerShown: false,
        tabBarActiveTintColor: colors.primary,
        tabBarInactiveTintColor: colors.text.secondary,
        tabBarStyle: {
          backgroundColor: colors.surface,
          borderTopColor: colors.border,
          height: 60,
          paddingBottom: 8,
        },
      }}>
      <Tab.Screen
        name="CashierTab"
        component={CashierStack}
        options={{
          title: 'Caixa',
          tabBarIcon: ({color}) => <CaixaIcon color={color} />,
        }}
      />
      <Tab.Screen
        name="BaristaTab"
        component={BaristaTabs}
        options={{
          title: 'Barista',
          tabBarIcon: ({color}) => <BaristaIcon color={color} />,
        }}
      />
    </Tab.Navigator>
  );
}

const styles = StyleSheet.create({
  icon: {
    fontSize: 20,
  },
});
