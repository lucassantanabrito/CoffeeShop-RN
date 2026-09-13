import React from 'react';
import {View, Text, FlatList, StyleSheet} from 'react-native';
import {SafeAreaView} from 'react-native-safe-area-context';
import {colors} from '../../theme/colors';
import {OrderCard, EmptyState} from '../../components';
import {useOrderStore} from '../../store/orderStore';

export function PendingScreen() {
  const {getPendingOrders, updateOrderStatus} = useOrderStore();
  const pendingOrders = getPendingOrders();

  const handleStartOrder = (orderId: string) => {
    updateOrderStatus(orderId, 'in_progress');
  };

  return (
    <SafeAreaView style={styles.safe} edges={['top']}>
      <View style={styles.container}>
        <View style={styles.header}>
          <Text style={styles.title}>Barista</Text>
          <View style={styles.iconPlaceholder}>
            <Text style={styles.iconText}>☕</Text>
          </View>
        </View>

        {pendingOrders.length === 0 ? (
          <View style={styles.content}>
            <EmptyState
              title="Nenhum pedido pendente"
              message="Novos pedidos aparecerao aqui."
              icon={<Text style={styles.emptyIcon}>📋</Text>}
            />
          </View>
        ) : (
          <FlatList
            data={pendingOrders}
            keyExtractor={item => item.id}
            renderItem={({item}) => (
              <OrderCard
                order={item}
                actionLabel="Fazendo"
                onAction={() => handleStartOrder(item.id)}
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
