import React from 'react';
import {View, Text, StyleSheet} from 'react-native';
import {colors} from '../theme/colors';
import type {OrderStatus} from '../types/order';

interface StatusChipProps {
  status: OrderStatus;
}

const STATUS_CONFIG = {
  pending: {label: 'Pendente', color: colors.status.pending},
  in_progress: {label: 'Fazendo', color: colors.status.inProgress},
  completed: {label: 'Feito', color: colors.status.completed},
};

export function StatusChip({status}: StatusChipProps) {
  const config = STATUS_CONFIG[status];

  return (
    <View style={styles.chip}>
      <View style={[styles.dot, {backgroundColor: config.color}]} />
      <Text style={[styles.label, {color: config.color}]}>{config.label}</Text>
    </View>
  );
}

const styles = StyleSheet.create({
  chip: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 6,
    alignSelf: 'flex-start',
  },
  dot: {
    width: 6,
    height: 6,
    borderRadius: 3,
  },
  label: {
    fontSize: 12,
    fontWeight: '600',
  },
});
