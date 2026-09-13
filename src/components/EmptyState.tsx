import React from 'react';
import {View, Text, TouchableOpacity, StyleSheet} from 'react-native';
import {colors} from '../theme/colors';

export type EmptyStateIcon = 'receipt' | 'clock' | 'hourglass' | 'checkcircle';

interface EmptyStateProps {
  title: string;
  message: string;
  icon?: EmptyStateIcon;
  iconBackgroundColor?: string;
  actionLabel?: string;
  onAction?: () => void;
}

const iconMap: Record<EmptyStateIcon, string> = {
  receipt: '🧾',
  clock: '⏰',
  hourglass: '⏳',
  checkcircle: '✅',
};

export function EmptyState({
  title,
  message,
  icon,
  iconBackgroundColor = colors.primaryLight,
  actionLabel,
  onAction,
}: EmptyStateProps) {
  const iconEmoji = icon ? iconMap[icon] : null;

  return (
    <View style={styles.card}>
      {iconEmoji && (
        <View style={[styles.iconCircle, {backgroundColor: iconBackgroundColor}]}>
          <Text style={styles.iconText}>{iconEmoji}</Text>
        </View>
      )}
      <Text style={styles.title}>{title}</Text>
      <Text style={styles.message}>{message}</Text>
      {actionLabel && onAction && (
        <TouchableOpacity style={styles.actionButton} onPress={onAction}>
          <Text style={styles.actionButtonText}>+ {actionLabel}</Text>
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
  iconText: {
    fontSize: 36,
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
