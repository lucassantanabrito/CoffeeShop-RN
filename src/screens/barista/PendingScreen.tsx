import React from 'react';
import {View, Text, FlatList, StyleSheet} from 'react-native';
import {colors} from '../../theme/colors';
import {OrderCard, EmptyState, BaristaTabBar} from '../../components';
import {useOrderStore} from '../../store/orderStore';
import type {BaristaTabKey} from '../../types/navigation';

interface PendingScreenProps {
  activeTab: BaristaTabKey;
  onTabChange: (tab: BaristaTabKey) => void;
}

export function PendingScreen({activeTab, onTabChange}: PendingScreenProps) {
  const {getPendingOrders, updateOrderStatus} = useOrderStore();
  const pendingOrders = getPendingOrders();

  const handleStartOrder = (orderId: string) => {
    updateOrderStatus(orderId, 'in_progress');
  };

  return (
    <View style={styles.container}>
      <View style={styles.header}>
        <Text style={styles.title}>Barista</Text>
        <View style={styles.iconPlaceholder}>
          <Text style={styles.iconText}>☕</Text>
        </View>
      </View>

      <BaristaTabBar activeTab={activeTab} onTabChange={onTabChange} />

      {pendingOrders.length === 0 ? (
        <View style={styles.content}>
          <EmptyState
            title="Nenhum pedido pendente"
            message="Todos os pedidos foram iniciados!"
            icon="clock"
            iconBackgroundColor="#FEF3C7"
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
    paddingTop: 60,
  },
  list: {
    paddingHorizontal: 16,
  },
});
