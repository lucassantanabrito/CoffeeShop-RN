import React, {useState} from 'react';
import {
  View,
  Text,
  TextInput,
  TouchableOpacity,
  ScrollView,
  Switch,
  StyleSheet,
} from 'react-native';
import {SafeAreaView} from 'react-native-safe-area-context';
import {ChevronLeft} from 'lucide-react-native';
import {colors} from '../../theme/colors';
import {useDrinkStore} from '../../store/drinkStore';
import type {AddDrinkScreenProps} from '../../types/navigation';

function parsePrice(value: string): number | null {
  const normalized = value.trim().replace(',', '.').replace(/[^0-9.]/g, '');
  if (!normalized) return null;
  const parsed = Number(normalized);
  return Number.isFinite(parsed) && parsed > 0 ? parsed : null;
}

export function AddDrinkScreen({navigation}: AddDrinkScreenProps) {
  const addDrink = useDrinkStore(state => state.addDrink);

  const [name, setName] = useState('');
  const [priceText, setPriceText] = useState('');
  const [hasMilk, setHasMilk] = useState(true);

  const price = parsePrice(priceText);
  const isValid = name.trim().length > 0 && price !== null;

  const handleSave = () => {
    if (!isValid || price === null) return;
    addDrink({label: name.trim(), price, hasMilk});
    navigation.goBack();
  };

  return (
    <SafeAreaView style={styles.safe} edges={['top']}>
      <View style={styles.container}>
        <View style={styles.header}>
          <TouchableOpacity onPress={() => navigation.goBack()}>
            <ChevronLeft size={24} color={colors.text.secondary} />
          </TouchableOpacity>
          <Text style={styles.title}>Nova Bebida</Text>
        </View>

        <ScrollView style={styles.content} showsVerticalScrollIndicator={false}>
          <Text style={styles.sectionLabel}>Nome</Text>
          <TextInput
            style={styles.input}
            placeholder="Ex: Chai Latte"
            placeholderTextColor={colors.text.secondary}
            value={name}
            onChangeText={setName}
          />

          <Text style={styles.sectionLabel}>Valor</Text>
          <TextInput
            style={styles.input}
            placeholder="R$ 0,00"
            placeholderTextColor={colors.text.secondary}
            value={priceText}
            onChangeText={setPriceText}
            keyboardType="decimal-pad"
          />

          <View style={styles.milkRow}>
            <View style={styles.milkInfo}>
              <Text style={styles.milkTitle}>Tem leite?</Text>
              <Text style={styles.milkDesc}>
                Habilita a escolha de tipo de leite no pedido
              </Text>
            </View>
            <Switch
              value={hasMilk}
              onValueChange={setHasMilk}
              trackColor={{false: colors.border, true: colors.primary}}
              thumbColor={colors.surface}
            />
          </View>
        </ScrollView>

        <View style={styles.footer}>
          <TouchableOpacity
            style={[styles.saveButton, !isValid && styles.saveButtonDisabled]}
            onPress={handleSave}
            disabled={!isValid}>
            <Text style={styles.saveButtonText}>Salvar Bebida</Text>
          </TouchableOpacity>
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
    alignItems: 'center',
    paddingHorizontal: 16,
    paddingBottom: 12,
    gap: 12,
  },
  title: {
    fontSize: 22,
    fontWeight: '700',
    color: colors.text.primary,
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
  milkRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    gap: 12,
    marginBottom: 20,
  },
  milkInfo: {
    flex: 1,
    gap: 2,
  },
  milkTitle: {
    fontSize: 14,
    fontWeight: '500',
    color: colors.text.primary,
  },
  milkDesc: {
    fontSize: 12,
    color: colors.text.secondary,
  },
  footer: {
    padding: 16,
    borderTopWidth: 1,
    borderTopColor: colors.border,
    backgroundColor: colors.surface,
  },
  saveButton: {
    backgroundColor: colors.primary,
    borderRadius: 26,
    paddingVertical: 16,
    alignItems: 'center',
  },
  saveButtonDisabled: {
    opacity: 0.5,
  },
  saveButtonText: {
    color: colors.text.inverse,
    fontSize: 16,
    fontWeight: '600',
  },
});
