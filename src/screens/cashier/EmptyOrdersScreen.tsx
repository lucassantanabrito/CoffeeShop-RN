import React from 'react';
import {View, Text, TouchableOpacity, StyleSheet} from 'react-native';
import {SafeAreaView} from 'react-native-safe-area-context';
import {colors} from '../../theme/colors';
import {EmptyState} from '../../components';
import type {OrdersListScreenProps} from '../../types/navigation';

export function EmptyOrdersScreen({navigation}: OrdersListScreenProps) {
  return (
    <SafeAreaView style={styles.safe} edges={['top']}>
      <View style={styles.container}>
        <View style={styles.header}>
          <Text style={styles.title}>Pedidos</Text>
          <TouchableOpacity
            style={styles.addButton}
            onPress={() => navigation.navigate('NewOrder')}>
            <Text style={styles.addButtonText}>+</Text>
          </TouchableOpacity>
        </View>

        <View style={styles.content}>
          <EmptyState
            title="Nenhum pedido ainda"
            message="Quando voce criar pedidos, eles aparecerao aqui."
            icon="receipt"
            iconBackgroundColor={colors.primaryLight}
            actionLabel="Criar Pedido"
            onAction={() => navigation.navigate('NewOrder')}
          />
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
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingHorizontal: 16,
    paddingBottom: 16,
  },
  title: {
    fontSize: 28,
    fontWeight: '700',
    color: colors.text.primary,
  },
  addButton: {
    width: 36,
    height: 36,
    borderRadius: 18,
    backgroundColor: colors.primary,
    alignItems: 'center',
    justifyContent: 'center',
  },
  addButtonText: {
    color: colors.text.inverse,
    fontSize: 20,
    fontWeight: '600',
  },
  content: {
    flex: 1,
    paddingHorizontal: 16,
    paddingTop: 40,
  },
});
