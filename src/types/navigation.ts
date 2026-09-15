import type { NativeStackScreenProps } from '@react-navigation/native-stack';
import type { CompositeScreenProps, NavigatorScreenParams } from '@react-navigation/native';
import type { BottomTabScreenProps } from '@react-navigation/bottom-tabs';
import type { DrinkItem } from './order';

export type CashierStackParamList = {
  OrdersList: undefined;
  NewOrder: undefined;
  ConfirmOrder: { customerName: string; items: DrinkItem[]; total: number };
  OrderDetail: { orderId: string };
};

export type BaristaTabParamList = {
  Pending: undefined;
  InProgress: undefined;
  Completed: undefined;
};

export type BaristaTabKey = 'pending' | 'in_progress' | 'completed';

export type MainTabParamList = {
  CashierTab: NavigatorScreenParams<CashierStackParamList>;
  BaristaTab: NavigatorScreenParams<BaristaTabParamList>;
};

export type OrdersListScreenProps = NativeStackScreenProps<CashierStackParamList, 'OrdersList'>;
export type NewOrderScreenProps = NativeStackScreenProps<CashierStackParamList, 'NewOrder'>;
export type ConfirmOrderScreenProps = NativeStackScreenProps<CashierStackParamList, 'ConfirmOrder'>;
export type OrderDetailScreenProps = NativeStackScreenProps<CashierStackParamList, 'OrderDetail'>;

export type PendingScreenProps = CompositeScreenProps<
  BottomTabScreenProps<BaristaTabParamList, 'Pending'>,
  BottomTabScreenProps<MainTabParamList>
>;

export type InProgressScreenProps = CompositeScreenProps<
  BottomTabScreenProps<BaristaTabParamList, 'InProgress'>,
  BottomTabScreenProps<MainTabParamList>
>;

export type CompletedScreenProps = CompositeScreenProps<
  BottomTabScreenProps<BaristaTabParamList, 'Completed'>,
  BottomTabScreenProps<MainTabParamList>
>;
