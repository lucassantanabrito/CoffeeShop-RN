import React from 'react';
import {View, Text, TouchableOpacity, FlatList, StyleSheet} from 'react-native';
import {SafeAreaView} from 'react-native-safe-area-context';
import {List, CirclePlus} from 'lucide-react-native';
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
          <View style={styles.headerActions}>
            <TouchableOpacity onPress={() => navigation.navigate('DrinksList')}>
              <List size={20} color={colors.text.secondary} />
            </TouchableOpacity>
            <TouchableOpacity onPress={handleNewOrder}>
              <CirclePlus size={24} color={colors.primary} />
            </TouchableOpacity>
          </View>
        </View>

        {sortedOrders.length === 0 ? (
          <View style={styles.content}>
            <EmptyState
              title="Nenhum pedido ainda"
              message="Quando voce criar pedidos, eles aparecerao aqui."
              icon="receipt"
              iconBackgroundColor={colors.primaryLight}
              actionLabel="Criar Pedido"
              onAction={handleNewOrder}
            />
          </View>
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
  headerActions: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 16,
  },
  content: {
    flex: 1,
    paddingHorizontal: 16,
    paddingTop: 40,
  },
  list: {
    paddingHorizontal: 16,
  },
});
