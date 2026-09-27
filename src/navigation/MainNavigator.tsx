import React from 'react';
import {createBottomTabNavigator} from '@react-navigation/bottom-tabs';
import {getFocusedRouteNameFromRoute} from '@react-navigation/native';
import type {RouteProp} from '@react-navigation/native';
import {Wallet, Coffee} from 'lucide-react-native';
import {CashierStack} from './CashierStack';
import {BaristaTabs} from './BaristaTabs';
import {colors} from '../theme/colors';
import {useOrderStore} from '../store/orderStore';
import type {MainTabParamList} from '../types/navigation';

const Tab = createBottomTabNavigator<MainTabParamList>();

const TAB_BAR_STYLE = {
  backgroundColor: colors.surface,
  borderTopColor: colors.border,
  height: 60,
  paddingBottom: 8,
};

const CASHIER_ROUTES_WITHOUT_TAB_BAR = [
  'NewOrder',
  'ConfirmOrder',
  'DrinksList',
  'AddDrink',
];

function getCashierTabBarStyle(route: RouteProp<MainTabParamList, 'CashierTab'>) {
  const focusedRouteName = getFocusedRouteNameFromRoute(route) ?? 'OrdersList';
  if (CASHIER_ROUTES_WITHOUT_TAB_BAR.includes(focusedRouteName)) {
    return {display: 'none' as const};
  }
  return TAB_BAR_STYLE;
}

function CaixaIcon({color}: {color: string}) {
  return <Wallet color={color} size={20} />;
}

function BaristaIcon({color}: {color: string}) {
  return <Coffee color={color} size={20} />;
}

export function MainNavigator() {
  const pendingCount = useOrderStore(
    state => state.orders.filter(o => o.status === 'pending').length,
  );

  return (
    <Tab.Navigator
      screenOptions={{
        headerShown: false,
        tabBarActiveTintColor: colors.primary,
        tabBarInactiveTintColor: colors.text.secondary,
        tabBarStyle: TAB_BAR_STYLE,
      }}>
      <Tab.Screen
        name="CashierTab"
        component={CashierStack}
        options={({route}) => ({
          title: 'Caixa',
          tabBarIcon: CaixaIcon,
          tabBarStyle: getCashierTabBarStyle(route),
        })}
      />
      <Tab.Screen
        name="BaristaTab"
        component={BaristaTabs}
        options={{
          title: 'Barista',
          tabBarIcon: BaristaIcon,
          tabBarBadge: pendingCount > 0 ? pendingCount : undefined,
          tabBarBadgeStyle: {backgroundColor: colors.primary},
        }}
      />
    </Tab.Navigator>
  );
}
