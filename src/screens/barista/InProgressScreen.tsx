import React from 'react';
import {View, Text, FlatList, StyleSheet} from 'react-native';
import {colors} from '../../theme/colors';
import {OrderCard, EmptyState} from '../../components';
import {useOrderStore} from '../../store/orderStore';

export function InProgressScreen() {
  const {getInProgressOrders, updateOrderStatus} = useOrderStore();
  const inProgressOrders = getInProgressOrders();

  const handleCompleteOrder = (orderId: string) => {
    updateOrderStatus(orderId, 'completed');
  };

  return (
    <View style={styles.container}>
      <View style={styles.header}>
        <Text style={styles.title}>Barista</Text>
        <View style={styles.iconPlaceholder}>
          <Text style={styles.iconText}>☕</Text>
        </View>
      </View>

      {inProgressOrders.length === 0 ? (
        <View style={styles.content}>
          <EmptyState
            title="Nenhum pedido em andamento"
            message="Pedidos em preparo aparecerao aqui."
            icon={<Text style={styles.emptyIcon}>⏳</Text>}
          />
        </View>
      ) : (
        <FlatList
          data={inProgressOrders}
          keyExtractor={item => item.id}
          renderItem={({item}) => (
            <OrderCard
              order={item}
              actionLabel="Marcar como Pronto"
              onAction={() => handleCompleteOrder(item.id)}
            />
          )}
          contentContainerStyle={styles.list}
          showsVerticalScrollIndicator={false}
        />
      )}
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  header: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingHorizontal: 16,
    paddingBottom: 12,
  },
  title: {
    fontSize: 28,
    fontWeight: '700',
    color: colors.text.primary,
  },
  iconPlaceholder: {
    width: 40,
    height: 40,
    borderRadius: 20,
    backgroundColor: colors.primaryLight,
    alignItems: 'center',
    justifyContent: 'center',
  },
  iconText: {
    fontSize: 20,
  },
  content: {
    flex: 1,
    paddingHorizontal: 16,
  },
  list: {
    paddingHorizontal: 16,
  },
  emptyIcon: {
    fontSize: 40,
  },
});
