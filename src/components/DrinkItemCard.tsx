import React from 'react';
import {View, Text, StyleSheet} from 'react-native';
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
        <Text style={styles.iconText}>☕</Text>
      </View>

      <View style={styles.info}>
        <Text style={styles.name}>{item.type.replace('_', ' ')}</Text>
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
      </View>

      <View style={styles.right}>
        <Text style={styles.price}>R$ {item.price.toFixed(2)}</Text>
        {onRemove && (
          <Text style={styles.remove} onPress={onRemove}>
            ×
          </Text>
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
  iconText: {
    fontSize: 20,
  },
  info: {
    flex: 1,
    gap: 4,
  },
  name: {
    fontSize: 16,
    fontWeight: '600',
    color: colors.text.primary,
    textTransform: 'capitalize',
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
  remove: {
    fontSize: 20,
    color: colors.text.secondary,
    fontWeight: '600',
  },
});
