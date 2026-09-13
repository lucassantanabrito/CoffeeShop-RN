import React from 'react';
import {View, Text, TouchableOpacity, ScrollView, StyleSheet} from 'react-native';
import {SafeAreaView} from 'react-native-safe-area-context';
import {colors} from '../../theme/colors';
import {StatusChip, DrinkItemCard} from '../../components';
import {useOrderStore} from '../../store/orderStore';
import type {ConfirmOrderScreenProps} from '../../types/navigation';

export function ConfirmOrderScreen({route, navigation}: ConfirmOrderScreenProps) {
  const {order} = route.params;
  const {submitOrder, clearCurrentOrder} = useOrderStore();

  const subtotal = order.items.reduce((sum, item) => sum + item.price, 0);
  const milkExtra = order.items.reduce((sum, item) => {
    if (item.milk === 'zero') {
      return sum + 2 * item.quantity;
    }
    if (item.milk === 'vegetal') {
      return sum + 4 * item.quantity;
    }
    return sum;
  }, 0);

  const handleConfirm = async () => {
    await submitOrder();
    clearCurrentOrder();
    navigation.navigate('OrdersList');
  };

  const handleBack = () => {
    navigation.goBack();
  };

  return (
    <SafeAreaView style={styles.safe} edges={['top']}>
      <View style={styles.container}>
        <View style={styles.header}>
          <TouchableOpacity onPress={handleBack}>
            <Text style={styles.backArrow}>←</Text>
          </TouchableOpacity>
          <Text style={styles.title}>Confirmar Pedido</Text>
        </View>

        <View style={styles.progressBar}>
          <View style={[styles.progressSegment, styles.progressActive]} />
          <View style={[styles.progressSegment, styles.progressActive]} />
          <View style={[styles.progressSegment, styles.progressActive]} />
          <View style={[styles.progressSegment, styles.progressActive]} />
        </View>

        <ScrollView style={styles.content} showsVerticalScrollIndicator={false}>
          <View style={styles.customerCard}>
            <View style={styles.avatar}>
              <Text style={styles.avatarText}>👤</Text>
            </View>
            <View>
              <Text style={styles.customerLabel}>Cliente</Text>
              <Text style={styles.customerName}>{order.customerName}</Text>
            </View>
          </View>

          <View style={styles.orderHeader}>
            <Text style={styles.sectionTitle}>Resumo do Pedido</Text>
            <StatusChip status={order.status} />
          </View>

          <View style={styles.itemsContainer}>
            {order.items.map(item => (
              <DrinkItemCard key={item.id} item={item} />
            ))}
          </View>

          <View style={styles.breakdown}>
            <View style={styles.breakdownRow}>
              <Text style={styles.breakdownLabel}>
                Subtotal ({order.items.length} bebida
                {order.items.length > 1 ? 's' : ''})
              </Text>
              <Text style={styles.breakdownValue}>R$ {subtotal.toFixed(2)}</Text>
            </View>
            {milkExtra > 0 && (
              <View style={styles.breakdownRow}>
                <Text style={styles.breakdownLabel}>Leite vegetal</Text>
                <Text style={[styles.breakdownValue, {color: colors.primary}]}>
                  + R$ {milkExtra.toFixed(2)}
                </Text>
              </View>
            )}
            <View style={styles.divider} />
            <View style={styles.breakdownRow}>
              <Text style={styles.totalLabel}>Total</Text>
              <Text style={styles.totalValue}>R$ {order.total.toFixed(2)}</Text>
            </View>
          </View>
        </ScrollView>

        <View style={styles.footer}>
          <TouchableOpacity style={styles.backButton} onPress={handleBack}>
            <Text style={styles.backButtonText}>← Voltar</Text>
          </TouchableOpacity>
          <TouchableOpacity style={styles.confirmButton} onPress={handleConfirm}>
            <Text style={styles.confirmButtonText}>✓ Finalizar</Text>
          </TouchableOpacity>
        </View>
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
    alignItems: 'center',
    paddingHorizontal: 16,
    paddingBottom: 12,
    gap: 12,
  },
  backArrow: {
    fontSize: 24,
    color: colors.text.primary,
    fontWeight: '600',
  },
  title: {
    fontSize: 22,
    fontWeight: '700',
    color: colors.text.primary,
  },
  progressBar: {
    flexDirection: 'row',
    paddingHorizontal: 16,
    gap: 6,
    marginBottom: 16,
  },
  progressSegment: {
    flex: 1,
    height: 4,
    borderRadius: 2,
    backgroundColor: colors.border,
  },
  progressActive: {
    backgroundColor: colors.primary,
  },
  content: {
    flex: 1,
    paddingHorizontal: 16,
  },
  customerCard: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: colors.surface,
    borderRadius: 16,
    padding: 16,
    gap: 12,
    marginBottom: 20,
    borderWidth: 1,
    borderColor: colors.border,
  },
  avatar: {
    width: 48,
    height: 48,
    borderRadius: 24,
    backgroundColor: colors.primaryLight,
    alignItems: 'center',
    justifyContent: 'center',
  },
  avatarText: {
    fontSize: 24,
  },
  customerLabel: {
    fontSize: 12,
    color: colors.text.secondary,
  },
  customerName: {
    fontSize: 18,
    fontWeight: '600',
    color: colors.text.primary,
  },
  orderHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 12,
  },
  sectionTitle: {
    fontSize: 16,
    fontWeight: '600',
    color: colors.text.primary,
  },
  itemsContainer: {
    gap: 8,
    marginBottom: 20,
  },
  breakdown: {
    backgroundColor: colors.surface,
    borderRadius: 16,
    padding: 16,
    borderWidth: 1,
    borderColor: colors.border,
  },
  breakdownRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginBottom: 8,
  },
  breakdownLabel: {
    fontSize: 14,
    color: colors.text.secondary,
  },
  breakdownValue: {
    fontSize: 14,
    color: colors.text.primary,
  },
  divider: {
    height: 1,
    backgroundColor: colors.border,
    marginVertical: 8,
  },
  totalLabel: {
    fontSize: 16,
    fontWeight: '600',
    color: colors.text.primary,
  },
  totalValue: {
    fontSize: 20,
    fontWeight: '700',
    color: colors.primary,
  },
  footer: {
    flexDirection: 'row',
    padding: 16,
    gap: 12,
    borderTopWidth: 1,
    borderTopColor: colors.border,
    backgroundColor: colors.surface,
  },
  backButton: {
    flex: 1,
    borderRadius: 26,
    paddingVertical: 14,
    alignItems: 'center',
    borderWidth: 1,
    borderColor: colors.border,
  },
  backButtonText: {
    fontSize: 16,
    fontWeight: '600',
    color: colors.text.primary,
  },
  confirmButton: {
    flex: 1,
    backgroundColor: colors.primary,
    borderRadius: 26,
    paddingVertical: 14,
    alignItems: 'center',
  },
  confirmButtonText: {
    fontSize: 16,
    fontWeight: '600',
    color: colors.text.inverse,
  },
});
