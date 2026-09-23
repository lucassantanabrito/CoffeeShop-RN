import React from 'react';
import {View, Text, TouchableOpacity, StyleSheet} from 'react-native';
import type {LucideIcon} from 'lucide-react-native';
import {colors} from '../theme/colors';
import {StatusChip} from './StatusChip';
import type {Order} from '../types/order';

interface OrderCardProps {
  order: Order;
  onPress?: () => void;
  actionLabel?: string;
  actionIcon?: LucideIcon;
  onAction?: () => void;
  showItems?: boolean;
}

export function OrderCard({
  order,
  onPress,
  actionLabel,
  actionIcon: ActionIcon,
  onAction,
  showItems = true,
}: OrderCardProps) {
  return (
    <TouchableOpacity
      style={styles.card}
      onPress={onPress}
      disabled={!onPress}
      activeOpacity={onPress ? 0.7 : 1}>
      <View style={styles.header}>
        <Text style={styles.orderId}>#{order.id}</Text>
        <Text style={styles.customerName}>{order.customerName}</Text>
        <StatusChip status={order.status} />
      </View>

      {showItems && (
        <View style={styles.itemsContainer}>
          {order.items.map(item => (
            <View key={item.id} style={styles.itemRow}>
              <Text style={styles.itemText}>
                {item.quantity}x {item.label}
                {item.milk !== 'normal' ? ` (${item.milk})` : ''}
              </Text>
              {item.notes ? (
                <Text style={styles.itemNotes}>{item.notes}</Text>
              ) : null}
            </View>
          ))}
        </View>
      )}

      <View style={styles.footer}>
        <Text style={styles.totalLabel}>Total</Text>
        <Text style={styles.totalValue}>R$ {order.total.toFixed(2)}</Text>
      </View>

      {actionLabel && onAction && (
        <TouchableOpacity style={styles.actionButton} onPress={onAction}>
          {ActionIcon && <ActionIcon size={16} color={colors.text.inverse} />}
          <Text style={styles.actionLabel}>{actionLabel}</Text>
        </TouchableOpacity>
      )}
    </TouchableOpacity>
  );
}

const styles = StyleSheet.create({
  card: {
    backgroundColor: colors.surface,
    borderRadius: 16,
    padding: 16,
    marginBottom: 12,
    borderWidth: 1,
    borderColor: colors.border,
  },
  header: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 8,
    marginBottom: 12,
  },
  orderId: {
    fontSize: 16,
    fontWeight: '700',
    color: colors.primary,
  },
  customerName: {
    fontSize: 16,
    fontWeight: '500',
    color: colors.text.primary,
    flex: 1,
  },
  itemsContainer: {
    gap: 4,
    marginBottom: 12,
  },
  itemRow: {
    backgroundColor: colors.divider,
    borderRadius: 8,
    paddingHorizontal: 12,
    paddingVertical: 8,
  },
  itemText: {
    fontSize: 14,
    color: colors.text.secondary,
  },
  itemNotes: {
    fontSize: 12,
    color: colors.text.secondary,
    fontStyle: 'italic',
    marginTop: 2,
  },
  footer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  totalLabel: {
    fontSize: 14,
    color: colors.text.secondary,
  },
  totalValue: {
    fontSize: 16,
    fontWeight: '600',
    color: colors.text.primary,
  },
  actionButton: {
    flexDirection: 'row',
    gap: 6,
    justifyContent: 'center',
    marginTop: 12,
    backgroundColor: colors.primary,
    borderRadius: 26,
    paddingVertical: 12,
    alignItems: 'center',
  },
  actionLabel: {
    color: colors.text.inverse,
    fontSize: 16,
    fontWeight: '600',
  },
});
