import React from 'react';
import {View, Text, FlatList, StyleSheet} from 'react-native';
import {colors} from '../../theme/colors';
import {OrderCard, EmptyState} from '../../components';
import {useOrderStore} from '../../store/orderStore';

export function CompletedScreen() {
  const {getCompletedOrders, getCompletedCount} = useOrderStore();
  const completedOrders = getCompletedOrders();
  const completedCount = getCompletedCount();

  return (
    <View style={styles.container}>
      <View style={styles.header}>
        <Text style={styles.title}>Barista</Text>
        <View style={styles.iconPlaceholder}>
          <Text style={styles.iconText}>☕</Text>
        </View>
      </View>

      {completedOrders.length === 0 ? (
        <View style={styles.content}>
          <EmptyState
            title="Nenhum pedido concluido"
            message="Os pedidos finalizados aparecerao aqui."
            icon={<Text style={styles.emptyIcon}>✅</Text>}
          />
        </View>
      ) : (
        <>
          <FlatList
            data={completedOrders}
            keyExtractor={item => item.id}
            renderItem={({item}) => <OrderCard order={item} showItems={false} />}
            contentContainerStyle={styles.list}
            showsVerticalScrollIndicator={false}
          />
          <View style={styles.summaryCard}>
            <View style={styles.summaryIcon}>
              <Text style={styles.summaryIconText}>🎉</Text>
            </View>
            <View style={styles.summaryInfo}>
              <Text style={styles.summaryTitle}>Bom trabalho!</Text>
              <Text style={styles.summaryText}>
                {completedCount} pedido{completedCount !== 1 ? 's' : ''} concluido
                {completedCount !== 1 ? 's' : ''} hoje
              </Text>
            </View>
          </View>
        </>
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
  summaryCard: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: colors.status.completedBg,
    borderRadius: 16,
    padding: 16,
    margin: 16,
    gap: 12,
  },
  summaryIcon: {
    width: 40,
    height: 40,
    borderRadius: 20,
    backgroundColor: colors.surface,
    alignItems: 'center',
    justifyContent: 'center',
  },
  summaryIconText: {
    fontSize: 20,
  },
  summaryInfo: {
    flex: 1,
  },
  summaryTitle: {
    fontSize: 16,
    fontWeight: '600',
    color: colors.text.primary,
  },
  summaryText: {
    fontSize: 13,
    color: colors.text.secondary,
  },
});
