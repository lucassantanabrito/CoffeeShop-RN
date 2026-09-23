import React from 'react';
import {View, Text, TouchableOpacity, StyleSheet} from 'react-native';
import {Coffee, X} from 'lucide-react-native';
import {colors} from '../theme/colors';
import type {DrinkItem} from '../types/order';

interface DrinkItemCardProps {
  item: DrinkItem;
  onRemove?: () => void;
}

const MILK_LABELS = {
  normal: 'Normal',
  zero: 'Zero',
  vegetal: 'Vegetal',
};

export function DrinkItemCard({item, onRemove}: DrinkItemCardProps) {
  return (
    <View style={styles.container}>
      <View style={styles.iconCircle}>
        <Coffee size={20} color={colors.primary} />
      </View>

      <View style={styles.info}>
        <Text style={styles.name}>{item.label}</Text>
        <View style={styles.tags}>
          <View style={styles.tag}>
            <Text style={styles.tagText}>{item.quantity}x</Text>
          </View>
          {item.milk !== 'normal' && (
            <View style={[styles.tag, styles.milkTag]}>
              <Text style={[styles.tagText, styles.milkTagText]}>
                {MILK_LABELS[item.milk]}
              </Text>
            </View>
          )}
        </View>
        {item.notes ? (
          <Text style={styles.notes}>{item.notes}</Text>
        ) : null}
      </View>

      <View style={styles.right}>
        <Text style={styles.price}>R$ {item.price.toFixed(2)}</Text>
        {onRemove && (
          <TouchableOpacity onPress={onRemove} hitSlop={8} testID="drink-item-remove">
            <X size={18} color={colors.text.secondary} />
          </TouchableOpacity>
        )}
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: colors.divider,
    borderRadius: 12,
    padding: 12,
    marginBottom: 8,
    gap: 12,
  },
  iconCircle: {
    width: 44,
    height: 44,
    borderRadius: 22,
    backgroundColor: colors.primaryLight,
    alignItems: 'center',
    justifyContent: 'center',
  },
  info: {
    flex: 1,
    gap: 4,
  },
  name: {
    fontSize: 16,
    fontWeight: '600',
    color: colors.text.primary,
  },
  tags: {
    flexDirection: 'row',
    gap: 6,
  },
  tag: {
    backgroundColor: colors.primary,
    paddingHorizontal: 8,
    paddingVertical: 2,
    borderRadius: 8,
  },
  tagText: {
    color: colors.text.inverse,
    fontSize: 11,
    fontWeight: '600',
  },
  milkTag: {
    backgroundColor: colors.milk.vegetal,
  },
  milkTagText: {
    color: colors.text.inverse,
  },
  right: {
    alignItems: 'flex-end',
    gap: 4,
  },
  price: {
    fontSize: 16,
    fontWeight: '600',
    color: colors.text.primary,
  },
  notes: {
    fontSize: 12,
    color: colors.text.secondary,
    fontStyle: 'italic',
    marginTop: 2,
  },
});
