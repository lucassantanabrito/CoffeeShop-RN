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
import {X, Coffee, Check, Minus, Plus} from 'lucide-react-native';
import {colors} from '../theme/colors';
import type {MilkType, DrinkItem} from '../types/order';
import type {DrinkOption} from '../services';
import {useDrinkStore} from '../store/drinkStore';
import {SearchField} from './SearchField';

interface AddDrinkSheetProps {
  visible: boolean;
  onClose: () => void;
  onAdd: (item: DrinkItem) => void;
}

export function AddDrinkSheet({visible, onClose, onAdd}: AddDrinkSheetProps) {
  const drinks = useDrinkStore(state => state.drinks);
  const milkOptions = useDrinkStore(state => state.milkOptions);

  const [searchQuery, setSearchQuery] = React.useState('');
  const [selectedDrink, setSelectedDrink] = React.useState<string | null>(null);
  const [selectedMilk, setSelectedMilk] = React.useState<MilkType>('normal');
  const [quantity, setQuantity] = React.useState(1);
  const [notes, setNotes] = React.useState('');

  const selectedOption = drinks.find(d => d.type === selectedDrink) ?? null;
  const filteredDrinks = drinks.filter(d =>
    d.label.toLowerCase().includes(searchQuery.trim().toLowerCase()),
  );

  const milkAdd =
    selectedOption?.hasMilk
      ? milkOptions.find(m => m.type === selectedMilk)?.priceAdd ?? 0
      : 0;
  const subtotal = ((selectedOption?.price ?? 0) + milkAdd) * quantity;

  const handleSelectDrink = (option: DrinkOption) => {
    setSelectedDrink(option.type);
    if (!option.hasMilk) {
      setSelectedMilk('normal');
    }
  };

  const resetForm = () => {
    setSearchQuery('');
    setSelectedDrink(null);
    setSelectedMilk('normal');
    setQuantity(1);
    setNotes('');
  };

  const handleClose = () => {
    resetForm();
    onClose();
  };

  const handleAdd = () => {
    if (!selectedOption) return;
    const item: DrinkItem = {
      id: `${Date.now()}-${Math.random().toString(36).slice(2, 8)}`,
      type: selectedOption.type,
      label: selectedOption.label,
      quantity,
      milk: selectedOption.hasMilk ? selectedMilk : 'normal',
      notes,
      price: subtotal,
    };
    onAdd(item);
    resetForm();
    onClose();
  };

  return (
    <Modal visible={visible} transparent animationType="slide">
      <View style={styles.overlay}>
        <View style={styles.sheet}>
          <View style={styles.handle} />

          <View style={styles.header}>
            <Text style={styles.title}>Adicionar Bebida</Text>
            <TouchableOpacity onPress={handleClose}>
              <X size={20} color={colors.text.secondary} />
            </TouchableOpacity>
          </View>

          <ScrollView style={styles.content} showsVerticalScrollIndicator={false}>
            <Text style={styles.sectionTitle}>Tipo de Bebida</Text>
            <View style={styles.searchWrapper}>
              <SearchField value={searchQuery} onChangeText={setSearchQuery} />
            </View>

            <View style={styles.drinkList}>
              {filteredDrinks.map((option, index) => {
                const selected = option.type === selectedDrink;
                return (
                  <TouchableOpacity
                    key={option.type}
                    style={[
                      styles.drinkRow,
                      selected && styles.drinkRowSelected,
                      !selected &&
                        index < filteredDrinks.length - 1 &&
                        styles.drinkRowDivider,
                    ]}
                    onPress={() => handleSelectDrink(option)}>
                    <View style={styles.drinkRowLeft}>
                      <Coffee
                        size={14}
                        color={selected ? colors.primary : colors.text.secondary}
                      />
                      <Text
                        style={[
                          styles.drinkRowName,
                          selected && styles.drinkRowNameSelected,
                        ]}>
                        {option.label}
                      </Text>
                    </View>
                    <View style={styles.drinkRowRight}>
                      <Text
                        style={[
                          styles.drinkRowPrice,
                          selected && styles.drinkRowPriceSelected,
                        ]}>
                        R$ {option.price.toFixed(2)}
                      </Text>
                      {selected && <Check size={14} color={colors.primary} />}
                    </View>
                  </TouchableOpacity>
                );
              })}
              {filteredDrinks.length === 0 && (
                <Text style={styles.noResults}>Nenhuma bebida encontrada.</Text>
              )}
            </View>

            {selectedOption?.hasMilk && (
              <>
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
              </>
            )}

            <Text style={styles.sectionTitle}>Quantidade</Text>
            <View style={styles.quantityRow}>
              <TouchableOpacity
                style={styles.quantityButton}
                onPress={() => setQuantity(Math.max(1, quantity - 1))}>
                <Minus size={20} color={colors.text.inverse} />
              </TouchableOpacity>
              <Text style={styles.quantityValue}>{quantity}</Text>
              <TouchableOpacity
                style={[styles.quantityButton, styles.quantityButtonPrimary]}
                onPress={() => setQuantity(quantity + 1)}>
                <Plus size={20} color={colors.text.inverse} />
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
              <Plus size={16} color={colors.text.inverse} />
              <Text style={styles.addButtonText}>Adicionar ao Pedido</Text>
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
  searchWrapper: {
    marginBottom: 12,
  },
  drinkList: {
    marginBottom: 20,
  },
  drinkRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingHorizontal: 12,
    height: 52,
    borderRadius: 12,
  },
  drinkRowDivider: {
    borderBottomWidth: 1,
    borderBottomColor: colors.divider,
  },
  drinkRowSelected: {
    backgroundColor: colors.primaryLight,
  },
  drinkRowLeft: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 10,
  },
  drinkRowName: {
    fontSize: 14,
    fontWeight: '500',
    color: colors.text.primary,
  },
  drinkRowNameSelected: {
    color: colors.primary,
    fontWeight: '600',
  },
  drinkRowRight: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 8,
  },
  drinkRowPrice: {
    fontSize: 13,
    color: colors.text.secondary,
  },
  drinkRowPriceSelected: {
    color: colors.primary,
  },
  noResults: {
    fontSize: 13,
    color: colors.text.secondary,
    paddingVertical: 16,
    textAlign: 'center',
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
    color: colors.primary,
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
    backgroundColor: colors.text.secondary,
    alignItems: 'center',
    justifyContent: 'center',
  },
  quantityButtonPrimary: {
    backgroundColor: colors.primary,
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
    flexDirection: 'row',
    gap: 8,
    backgroundColor: colors.primary,
    borderRadius: 26,
    paddingVertical: 14,
    alignItems: 'center',
    justifyContent: 'center',
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
