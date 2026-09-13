import React from 'react';
import {View, Text, StyleSheet} from 'react-native';
import {colors} from '../theme/colors';
import type {OrderStatus} from '../types/order';

interface StatusChipProps {
  status: OrderStatus;
}

const STATUS_CONFIG = {
  pending: {label: 'Pendente', bg: colors.status.pendingBg, text: colors.status.pending},
  in_progress: {label: 'Fazendo', bg: colors.status.inProgressBg, text: colors.status.inProgress},
  completed: {label: 'Feito', bg: colors.status.completedBg, text: colors.status.completed},
};

export function StatusChip({status}: StatusChipProps) {
  const config = STATUS_CONFIG[status];

  return (
    <View style={[styles.chip, {backgroundColor: config.bg}]}>
      <Text style={[styles.label, {color: config.text}]}>{config.label}</Text>
    </View>
  );
}

const styles = StyleSheet.create({
  chip: {
    paddingHorizontal: 12,
    paddingVertical: 4,
    borderRadius: 12,
    alignSelf: 'flex-start',
  },
  label: {
    fontSize: 12,
    fontWeight: '600',
  },
});
