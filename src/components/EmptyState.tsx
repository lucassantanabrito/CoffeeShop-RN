import React from 'react';
import {View, Text, TouchableOpacity, StyleSheet} from 'react-native';
import {Receipt, Clock3, Coffee, PartyPopper, Plus} from 'lucide-react-native';
import type {LucideIcon} from 'lucide-react-native';
import {colors} from '../theme/colors';

export type EmptyStateIcon = 'receipt' | 'clock3' | 'coffee' | 'partypopper';

interface EmptyStateProps {
  title: string;
  message: string;
  icon?: EmptyStateIcon;
  iconColor?: string;
  iconBackgroundColor?: string;
  actionLabel?: string;
  onAction?: () => void;
}

const iconMap: Record<EmptyStateIcon, LucideIcon> = {
  receipt: Receipt,
  clock3: Clock3,
  coffee: Coffee,
  partypopper: PartyPopper,
};

export function EmptyState({
  title,
  message,
  icon,
  iconColor = colors.primary,
  iconBackgroundColor = colors.primaryLight,
  actionLabel,
  onAction,
}: EmptyStateProps) {
  const IconComponent = icon ? iconMap[icon] : null;

  return (
    <View style={styles.card}>
      {IconComponent && (
        <View testID="empty-state-icon" style={[styles.iconCircle, {backgroundColor: iconBackgroundColor}]}>
          <IconComponent size={36} color={iconColor} />
        </View>
      )}
      <Text style={styles.title}>{title}</Text>
      <Text style={styles.message}>{message}</Text>
      {actionLabel && onAction && (
        <TouchableOpacity style={styles.actionButton} onPress={onAction}>
          <Plus size={16} color={colors.text.inverse} />
          <Text style={styles.actionButtonText}>{actionLabel}</Text>
        </TouchableOpacity>
      )}
    </View>
  );
}

const styles = StyleSheet.create({
  card: {
    backgroundColor: colors.surface,
    borderRadius: 24,
    padding: 40,
    alignItems: 'center',
    gap: 16,
    shadowColor: '#000000',
    shadowOffset: {width: 0, height: 2},
    shadowOpacity: 0.04,
    shadowRadius: 4,
    elevation: 2,
  },
  iconCircle: {
    width: 80,
    height: 80,
    borderRadius: 40,
    alignItems: 'center',
    justifyContent: 'center',
  },
  title: {
    fontSize: 18,
    fontWeight: '600',
    color: colors.text.primary,
    textAlign: 'center',
  },
  message: {
    fontSize: 14,
    color: colors.text.secondary,
    textAlign: 'center',
    lineHeight: 20,
  },
  actionButton: {
    flexDirection: 'row',
    gap: 6,
    alignItems: 'center',
    backgroundColor: colors.primary,
    borderRadius: 24,
    paddingHorizontal: 24,
    paddingVertical: 12,
    marginTop: 8,
  },
  actionButtonText: {
    color: colors.text.inverse,
    fontSize: 14,
    fontWeight: '600',
  },
});
