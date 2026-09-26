import React, {useState} from 'react';
import {
  Alert,
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

const MAX_PRICE_CENTS = 99_999_99; // R$ 99.999,99

function centsFromText(text: string): number {
  const digits = text.replace(/\D/g, '').replace(/^0+(?=\d)/, '');
  if (!digits) return 0;
  return Math.min(parseInt(digits, 10), MAX_PRICE_CENTS);
}

function formatCentsAsBRL(cents: number): string {
  const [reais, centavos] = (cents / 100).toFixed(2).split('.');
  const reaisWithThousands = reais.replace(/\B(?=(\d{3})+(?!\d))/g, '.');
  return `R$ ${reaisWithThousands},${centavos}`;
}

export function AddDrinkScreen({navigation}: AddDrinkScreenProps) {
  const addDrink = useDrinkStore(state => state.addDrink);

  const [name, setName] = useState('');
  const [priceCents, setPriceCents] = useState(0);
  const [hasMilk, setHasMilk] = useState(true);
  const [isSaving, setIsSaving] = useState(false);

  const handlePriceChange = (text: string) => {
    setPriceCents(centsFromText(text));
  };

  const price = priceCents > 0 ? priceCents / 100 : null;
  const isValid = name.trim().length > 0 && price !== null;

  const handleSave = async () => {
    if (!isValid || price === null) return;
    setIsSaving(true);
    try {
      await addDrink({label: name.trim(), price, hasMilk});
      navigation.goBack();
    } catch {
      Alert.alert('Erro', 'Não foi possível salvar a bebida. Tente novamente.');
    } finally {
      setIsSaving(false);
    }
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
            value={formatCentsAsBRL(priceCents)}
            onChangeText={handlePriceChange}
            keyboardType="number-pad"
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
            style={[styles.saveButton, (!isValid || isSaving) && styles.saveButtonDisabled]}
            onPress={handleSave}
            disabled={!isValid || isSaving}>
            <Text style={styles.saveButtonText}>
              {isSaving ? 'Salvando...' : 'Salvar Bebida'}
            </Text>
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
