import React from 'react';
import {View, Text, TouchableOpacity, StyleSheet} from 'react-native';
import {colors} from '../theme/colors';
import type {BaristaTabKey} from '../types/navigation';

interface BaristaTabBarProps {
  activeTab: BaristaTabKey;
  onTabChange: (tab: BaristaTabKey) => void;
}

const TABS: {key: BaristaTabKey; label: string}[] = [
  {key: 'pending', label: 'Pendentes'},
  {key: 'in_progress', label: 'Fazendo'},
  {key: 'completed', label: 'Concluidos'},
];

export function BaristaTabBar({activeTab, onTabChange}: BaristaTabBarProps) {
  return (
    <View style={styles.container}>
      <View style={styles.tabBar}>
        {TABS.map(tab => {
          const isActive = tab.key === activeTab;
          return (
            <TouchableOpacity
              key={tab.key}
              style={[styles.tab, isActive && styles.tabActive]}
              onPress={() => onTabChange(tab.key)}>
              <Text style={[styles.tabText, isActive && styles.tabTextActive]}>
                {tab.label}
              </Text>
            </TouchableOpacity>
          );
        })}
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    paddingHorizontal: 16,
    paddingVertical: 8,
  },
  tabBar: {
    flexDirection: 'row',
    backgroundColor: colors.divider,
    borderRadius: 20,
    padding: 4,
  },
  tab: {
    flex: 1,
    paddingVertical: 8,
    alignItems: 'center',
    borderRadius: 16,
  },
  tabActive: {
    backgroundColor: colors.surface,
    shadowColor: '#000',
    shadowOffset: {width: 0, height: 1},
    shadowOpacity: 0.1,
    shadowRadius: 2,
    elevation: 2,
  },
  tabText: {
    fontSize: 14,
    fontWeight: '500',
    color: colors.text.secondary,
  },
  tabTextActive: {
    fontWeight: '600',
    color: colors.text.primary,
  },
});
