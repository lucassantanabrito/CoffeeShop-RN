import React, {useState} from 'react';
import {
  View,
  Text,
  TextInput,
  TouchableOpacity,
  ScrollView,
  StyleSheet,
} from 'react-native';
import {SafeAreaView} from 'react-native-safe-area-context';
import {colors} from '../../theme/colors';
import {DrinkItemCard, AddDrinkSheet} from '../../components';
import {useOrderStore} from '../../store/orderStore';
import {MemoryDrinkService} from '../../services/memoryService';
import type {NewOrderScreenProps} from '../../types/navigation';

const drinkService = new MemoryDrinkService();

export function NewOrderScreen({navigation}: NewOrderScreenProps) {
  const {
    customerName,
    setCustomerName,
    currentOrderItems,
    addDrinkToOrder,
    removeDrinkFromOrder,
  } = useOrderStore();

  const [showSheet, setShowSheet] = useState(false);

  const total = currentOrderItems.reduce((sum, item) => sum + item.price, 0);

  const handleVerPedido = () => {
    if (!customerName.trim() || currentOrderItems.length === 0) return;

    navigation.navigate('ConfirmOrder', {
      customerName: customerName.trim(),
      items: currentOrderItems,
      total,
    });
  };

  return (
    <SafeAreaView style={styles.safe} edges={['top']}>
      <View style={styles.container}>
        <View style={styles.header}>
          <TouchableOpacity onPress={() => navigation.goBack()}>
            <Text style={styles.backArrow}>←</Text>
          </TouchableOpacity>
          <Text style={styles.title}>Novo Pedido</Text>
        </View>

        <View style={styles.progressBar}>
          <View style={[styles.progressSegment, styles.progressActive]} />
          <View style={styles.progressSegment} />
        </View>

        <ScrollView style={styles.content} showsVerticalScrollIndicator={false}>
          <Text style={styles.sectionLabel}>Cliente</Text>
          <TextInput
            style={styles.input}
            placeholder="Nome do cliente"
            placeholderTextColor={colors.text.secondary}
            value={customerName}
            onChangeText={setCustomerName}
          />

          <View style={styles.drinksHeader}>
            <Text style={styles.sectionLabel}>Bebidas</Text>
            {currentOrderItems.length > 0 && (
              <View style={styles.countBadge}>
                <Text style={styles.countText}>
                  {currentOrderItems.length} item
                  {currentOrderItems.length > 1 ? 's' : ''}
                </Text>
              </View>
            )}
          </View>

          {currentOrderItems.map(item => (
            <DrinkItemCard
              key={item.id}
              item={item}
              onRemove={() => removeDrinkFromOrder(item.id)}
            />
          ))}

          <TouchableOpacity
            style={styles.addDrinkButton}
            onPress={() => setShowSheet(true)}>
            <Text style={styles.addDrinkText}>+ Adicionar Bebida</Text>
          </TouchableOpacity>
        </ScrollView>

        <View style={styles.footer}>
          <View style={styles.totalRow}>
            <Text style={styles.totalLabel}>Total do Pedido</Text>
            <Text style={styles.totalValue}>R$ {total.toFixed(2)}</Text>
          </View>
          <TouchableOpacity
            style={[
              styles.goButton,
              (!customerName.trim() || currentOrderItems.length === 0) &&
                styles.goButtonDisabled,
            ]}
            onPress={handleVerPedido}
            disabled={!customerName.trim() || currentOrderItems.length === 0}>
            <Text style={styles.goButtonText}>Ver Pedido →</Text>
          </TouchableOpacity>
        </View>
      </View>

      <AddDrinkSheet
        visible={showSheet}
        onClose={() => setShowSheet(false)}
        onAdd={addDrinkToOrder}
        drinkOptions={drinkService.getDrinkOptions()}
        milkOptions={drinkService.getMilkOptions()}
      />
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
  sectionLabel: {
    fontSize: 14,
    fontWeight: '600',
    color: colors.text.primary,
    marginBottom: 8,
  },
  input: {
    backgroundColor: colors.surface,
    borderRadius: 12,
    borderWidth: 1,
    borderColor: colors.border,
    paddingHorizontal: 16,
    paddingVertical: 14,
    fontSize: 16,
    color: colors.text.primary,
    marginBottom: 20,
  },
  drinksHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 12,
  },
  countBadge: {
    backgroundColor: colors.primaryLight,
    paddingHorizontal: 10,
    paddingVertical: 4,
    borderRadius: 10,
  },
  countText: {
    fontSize: 12,
    fontWeight: '600',
    color: colors.primary,
  },
  addDrinkButton: {
    borderWidth: 1,
    borderColor: colors.border,
    borderStyle: 'dashed',
    borderRadius: 12,
    paddingVertical: 14,
    alignItems: 'center',
    marginTop: 4,
  },
  addDrinkText: {
    fontSize: 14,
    fontWeight: '600',
    color: colors.primary,
  },
  footer: {
    padding: 16,
    borderTopWidth: 1,
    borderTopColor: colors.border,
    backgroundColor: colors.surface,
  },
  totalRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 12,
  },
  totalLabel: {
    fontSize: 16,
    color: colors.text.secondary,
  },
  totalValue: {
    fontSize: 22,
    fontWeight: '700',
    color: colors.primary,
  },
  goButton: {
    backgroundColor: colors.primary,
    borderRadius: 26,
    paddingVertical: 16,
    alignItems: 'center',
  },
  goButtonDisabled: {
    opacity: 0.5,
  },
  goButtonText: {
    color: colors.text.inverse,
    fontSize: 16,
    fontWeight: '600',
  },
});
