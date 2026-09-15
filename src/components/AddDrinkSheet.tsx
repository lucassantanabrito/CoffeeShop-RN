import React from 'react';
import {
  View,
  Text,
  Modal,
  TouchableOpacity,
  StyleSheet,
  ScrollView,
  TextInput,
} from 'react-native';
import {colors} from '../theme/colors';
import type {DrinkType, MilkType, DrinkItem} from '../types/order';

interface AddDrinkSheetProps {
  visible: boolean;
  onClose: () => void;
  onAdd: (item: DrinkItem) => void;
  drinkOptions: {type: DrinkType; label: string; price: number}[];
  milkOptions: {type: MilkType; label: string; priceAdd: number}[];
}

export function AddDrinkSheet({
  visible,
  onClose,
  onAdd,
  drinkOptions,
  milkOptions,
}: AddDrinkSheetProps) {
  const [selectedDrink, setSelectedDrink] = React.useState<DrinkType | null>(null);
  const [selectedMilk, setSelectedMilk] = React.useState<MilkType>('normal');
  const [quantity, setQuantity] = React.useState(1);
  const [notes, setNotes] = React.useState('');

  const selectedPrice = drinkOptions.find(d => d.type === selectedDrink)?.price ?? 0;
  const milkAdd = milkOptions.find(m => m.type === selectedMilk)?.priceAdd ?? 0;
  const subtotal = (selectedPrice + milkAdd) * quantity;

  const handleAdd = () => {
    if (!selectedDrink) return;
    const item: DrinkItem = {
      id: `${Date.now()}-${Math.random().toString(36).slice(2, 8)}`,
      type: selectedDrink,
      quantity,
      milk: selectedMilk,
      notes,
      price: subtotal,
    };
    onAdd(item);
    setSelectedDrink(null);
    setSelectedMilk('normal');
    setQuantity(1);
    setNotes('');
    onClose();
  };

  return (
    <Modal visible={visible} transparent animationType="slide">
      <View style={styles.overlay}>
        <View style={styles.sheet}>
          <View style={styles.handle} />

          <View style={styles.header}>
            <Text style={styles.title}>Adicionar Bebida</Text>
            <TouchableOpacity onPress={onClose}>
              <Text style={styles.close}>✕</Text>
            </TouchableOpacity>
          </View>

          <ScrollView style={styles.content} showsVerticalScrollIndicator={false}>
            <Text style={styles.sectionTitle}>Tipo de Bebida</Text>
            <View style={styles.optionsGrid}>
              {drinkOptions.map(option => (
                <TouchableOpacity
                  key={option.type}
                  style={[
                    styles.optionButton,
                    selectedDrink === option.type && styles.optionSelected,
                  ]}
                  onPress={() => setSelectedDrink(option.type)}>
                  <Text
                    style={[
                      styles.optionLabel,
                      selectedDrink === option.type && styles.optionLabelSelected,
                    ]}>
                    {option.label}
                  </Text>
                </TouchableOpacity>
              ))}
            </View>

            <Text style={styles.sectionTitle}>Tipo de Leite</Text>
            <View style={styles.milkRow}>
              {milkOptions.map(option => (
                <TouchableOpacity
                  key={option.type}
                  style={[
                    styles.milkButton,
                    selectedMilk === option.type && styles.milkSelected,
                  ]}
                  onPress={() => setSelectedMilk(option.type)}>
                  <Text
                    style={[
                      styles.milkLabel,
                      selectedMilk === option.type && styles.milkLabelSelected,
                    ]}>
                    {option.label}
                  </Text>
                  {option.priceAdd > 0 && (
                    <Text
                      style={[
                        styles.milkPrice,
                        selectedMilk === option.type && styles.milkPriceSelected,
                      ]}>
                      +R$ {option.priceAdd.toFixed(2)}
                    </Text>
                  )}
                </TouchableOpacity>
              ))}
            </View>

            <Text style={styles.sectionTitle}>Quantidade</Text>
            <View style={styles.quantityRow}>
              <TouchableOpacity
                style={styles.quantityButton}
                onPress={() => setQuantity(Math.max(1, quantity - 1))}>
                <Text style={styles.quantityButtonText}>−</Text>
              </TouchableOpacity>
              <Text style={styles.quantityValue}>{quantity}</Text>
              <TouchableOpacity
                style={styles.quantityButton}
                onPress={() => setQuantity(quantity + 1)}>
                <Text style={styles.quantityButtonText}>+</Text>
              </TouchableOpacity>
            </View>

            <Text style={styles.sectionTitle}>Observações</Text>
            <TextInput
              style={styles.notesInput}
              placeholder="Ex: Sem açúcar, menos espuma, aquecer mais..."
              placeholderTextColor={colors.text.secondary}
              value={notes}
              onChangeText={setNotes}
              multiline
            />
          </ScrollView>

          <View style={styles.footer}>
            <View style={styles.subtotalRow}>
              <Text style={styles.subtotalLabel}>Subtotal</Text>
              <Text style={styles.subtotalValue}>R$ {subtotal.toFixed(2)}</Text>
            </View>
            <TouchableOpacity
              style={[styles.addButton, !selectedDrink && styles.addButtonDisabled]}
              onPress={handleAdd}
              disabled={!selectedDrink}>
              <Text style={styles.addButtonText}>+ Adicionar ao Pedido</Text>
            </TouchableOpacity>
          </View>
        </View>
      </View>
    </Modal>
  );
}

const styles = StyleSheet.create({
  overlay: {
    flex: 1,
    backgroundColor: 'rgba(0,0,0,0.5)',
    justifyContent: 'flex-end',
  },
  sheet: {
    backgroundColor: colors.surface,
    borderTopLeftRadius: 24,
    borderTopRightRadius: 24,
    maxHeight: '85%',
  },
  handle: {
    width: 40,
    height: 4,
    borderRadius: 2,
    backgroundColor: colors.border,
    alignSelf: 'center',
    marginTop: 12,
    marginBottom: 8,
  },
  header: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingHorizontal: 20,
    paddingBottom: 16,
    borderBottomWidth: 1,
    borderBottomColor: colors.border,
  },
  title: {
    fontSize: 18,
    fontWeight: '600',
    color: colors.text.primary,
  },
  close: {
    fontSize: 20,
    color: colors.text.secondary,
    fontWeight: '600',
  },
  content: {
    paddingHorizontal: 20,
    paddingTop: 16,
  },
  sectionTitle: {
    fontSize: 14,
    fontWeight: '600',
    color: colors.text.primary,
    marginBottom: 12,
  },
  optionsGrid: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    gap: 8,
    marginBottom: 20,
  },
  optionButton: {
    paddingHorizontal: 16,
    paddingVertical: 12,
    borderRadius: 12,
    borderWidth: 1,
    borderColor: colors.border,
    backgroundColor: colors.surface,
    minWidth: '30%',
  },
  optionSelected: {
    borderColor: colors.primary,
    backgroundColor: colors.primaryLight,
  },
  optionLabel: {
    fontSize: 14,
    color: colors.text.primary,
    textAlign: 'center',
  },
  optionLabelSelected: {
    color: colors.primary,
    fontWeight: '600',
  },
  milkRow: {
    flexDirection: 'row',
    gap: 8,
    marginBottom: 20,
  },
  milkButton: {
    flex: 1,
    paddingVertical: 12,
    borderRadius: 12,
    borderWidth: 1,
    borderColor: colors.border,
    alignItems: 'center',
    backgroundColor: colors.surface,
  },
  milkSelected: {
    borderColor: colors.primary,
    backgroundColor: colors.primary,
  },
  milkLabel: {
    fontSize: 14,
    color: colors.text.primary,
  },
  milkLabelSelected: {
    color: colors.text.inverse,
    fontWeight: '600',
  },
  milkPrice: {
    fontSize: 11,
    color: colors.text.secondary,
    marginTop: 2,
  },
  milkPriceSelected: {
    color: colors.text.inverse,
  },
  quantityRow: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    gap: 16,
    marginBottom: 20,
  },
  quantityButton: {
    width: 36,
    height: 36,
    borderRadius: 18,
    backgroundColor: colors.primary,
    alignItems: 'center',
    justifyContent: 'center',
  },
  quantityButtonText: {
    color: colors.text.inverse,
    fontSize: 20,
    fontWeight: '600',
  },
  quantityValue: {
    fontSize: 18,
    fontWeight: '600',
    color: colors.text.primary,
  },
  notesInput: {
    borderWidth: 1,
    borderColor: colors.border,
    borderRadius: 12,
    padding: 12,
    fontSize: 14,
    color: colors.text.primary,
    minHeight: 60,
    textAlignVertical: 'top',
    marginBottom: 20,
  },
  footer: {
    padding: 20,
    borderTopWidth: 1,
    borderTopColor: colors.border,
  },
  subtotalRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginBottom: 16,
  },
  subtotalLabel: {
    fontSize: 16,
    color: colors.text.secondary,
  },
  subtotalValue: {
    fontSize: 20,
    fontWeight: '700',
    color: colors.primary,
  },
  addButton: {
    backgroundColor: colors.primary,
    borderRadius: 26,
    paddingVertical: 14,
    alignItems: 'center',
  },
  addButtonDisabled: {
    opacity: 0.5,
  },
  addButtonText: {
    color: colors.text.inverse,
    fontSize: 16,
    fontWeight: '600',
  },
});
