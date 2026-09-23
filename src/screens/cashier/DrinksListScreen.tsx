import React, {useState} from 'react';
import {View, Text, TouchableOpacity, ScrollView, StyleSheet} from 'react-native';
import {SafeAreaView} from 'react-native-safe-area-context';
import {ChevronLeft, CirclePlus, Coffee, Milk} from 'lucide-react-native';
import {colors} from '../../theme/colors';
import {SearchField} from '../../components';
import {useDrinkStore} from '../../store/drinkStore';
import type {DrinksListScreenProps} from '../../types/navigation';

export function DrinksListScreen({navigation}: DrinksListScreenProps) {
  const drinks = useDrinkStore(state => state.drinks);
  const [searchQuery, setSearchQuery] = useState('');

  const filteredDrinks = drinks.filter(d =>
    d.label.toLowerCase().includes(searchQuery.trim().toLowerCase()),
  );

  return (
    <SafeAreaView style={styles.safe} edges={['top']}>
      <View style={styles.container}>
        <View style={styles.header}>
          <View style={styles.headerLeft}>
            <TouchableOpacity onPress={() => navigation.goBack()}>
              <ChevronLeft size={24} color={colors.text.secondary} />
            </TouchableOpacity>
            <Text style={styles.title}>Bebidas</Text>
          </View>
          <TouchableOpacity onPress={() => navigation.navigate('AddDrink')}>
            <CirclePlus size={24} color={colors.primary} />
          </TouchableOpacity>
        </View>

        <View style={styles.searchWrapper}>
          <SearchField value={searchQuery} onChangeText={setSearchQuery} />
        </View>

        <ScrollView style={styles.content} showsVerticalScrollIndicator={false}>
          <View style={styles.list}>
            {filteredDrinks.map((drink, index) => (
              <View
                key={drink.type}
                style={[
                  styles.row,
                  index < filteredDrinks.length - 1 && styles.rowDivider,
                ]}>
                <View style={styles.rowLeft}>
                  <Coffee size={14} color={colors.text.secondary} />
                  <Text style={styles.rowName}>{drink.label}</Text>
                </View>
                <View style={styles.rowRight}>
                  {drink.hasMilk && <Milk size={14} color={colors.text.secondary} />}
                  <Text style={styles.rowPrice}>R$ {drink.price.toFixed(2)}</Text>
                </View>
              </View>
            ))}
            {filteredDrinks.length === 0 && (
              <Text style={styles.noResults}>Nenhuma bebida encontrada.</Text>
            )}
          </View>
        </ScrollView>
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
  headerLeft: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 12,
  },
  title: {
    fontSize: 22,
    fontWeight: '700',
    color: colors.text.primary,
  },
  searchWrapper: {
    paddingHorizontal: 16,
    marginBottom: 12,
  },
  content: {
    flex: 1,
    paddingHorizontal: 16,
  },
  list: {
    backgroundColor: colors.surface,
    borderRadius: 16,
    paddingHorizontal: 16,
    borderWidth: 1,
    borderColor: colors.border,
  },
  row: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    height: 56,
  },
  rowDivider: {
    borderBottomWidth: 1,
    borderBottomColor: colors.divider,
  },
  rowLeft: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 10,
  },
  rowName: {
    fontSize: 14,
    fontWeight: '500',
    color: colors.text.primary,
  },
  rowRight: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 8,
  },
  rowPrice: {
    fontSize: 13,
    color: colors.text.secondary,
  },
  noResults: {
    fontSize: 13,
    color: colors.text.secondary,
    paddingVertical: 16,
    textAlign: 'center',
  },
});
