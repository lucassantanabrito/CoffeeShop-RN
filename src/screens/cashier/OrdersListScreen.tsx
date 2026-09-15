import React from 'react';
import {View, Text, TouchableOpacity, FlatList, StyleSheet} from 'react-native';
import {SafeAreaView} from 'react-native-safe-area-context';
import {colors} from '../../theme/colors';
import {OrderCard, EmptyState} from '../../components';
import {useOrderStore} from '../../store/orderStore';
import type {OrdersListScreenProps} from '../../types/navigation';

export function OrdersListScreen({navigation}: OrdersListScreenProps) {
  const {orders} = useOrderStore();
  const sortedOrders = [...orders].sort((a, b) => b.createdAt - a.createdAt);

  const handleNewOrder = () => {
    navigation.navigate('NewOrder');
  };

  const handleOrderPress = (orderId: string) => {
    navigation.navigate('OrderDetail', {orderId});
  };

  return (
    <SafeAreaView style={styles.safe} edges={['top']}>
      <View style={styles.container}>
        <View style={styles.header}>
          <Text style={styles.title}>Pedidos</Text>
          <TouchableOpacity style={styles.addButton} onPress={handleNewOrder}>
            <Text style={styles.addButtonText}>+</Text>
          </TouchableOpacity>
        </View>

        {sortedOrders.length === 0 ? (
          <EmptyState
            title="Nenhum pedido ainda"
            message="Quando voce criar pedidos, eles aparecerao aqui."
            icon="receipt"
            iconBackgroundColor={colors.primaryLight}
            actionLabel="Criar Pedido"
            onAction={handleNewOrder}
          />
        ) : (
          <FlatList
            data={sortedOrders}
            keyExtractor={item => item.id}
            renderItem={({item}) => (
              <OrderCard
                order={item}
                onPress={() => handleOrderPress(item.id)}
              />
            )}
            contentContainerStyle={styles.list}
            showsVerticalScrollIndicator={false}
          />
        )}
      </View>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  safe: {
    flex: 1,
    backgroundColor: colors.background,
  },
  container: {
    flex: 1,
  },
  header: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingHorizontal: 16,
    paddingBottom: 16,
  },
  title: {
    fontSize: 28,
    fontWeight: '700',
    color: colors.text.primary,
  },
  addButton: {
    width: 36,
    height: 36,
    borderRadius: 18,
    backgroundColor: colors.primary,
    alignItems: 'center',
    justifyContent: 'center',
  },
  addButtonText: {
    color: colors.text.inverse,
    fontSize: 20,
    fontWeight: '600',
  },
  list: {
    paddingHorizontal: 16,
  },
  emptyIcon: {
    fontSize: 40,
  },
});
