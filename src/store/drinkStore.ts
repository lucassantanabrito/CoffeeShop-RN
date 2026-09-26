import {create} from 'zustand';
import type {DrinkOption, MilkOption, NewDrinkInput} from '../services';
import type {IDrinkService} from '../services';
import {MemoryDrinkService} from '../services';

interface DrinkState {
  drinks: DrinkOption[];
  milkOptions: MilkOption[];
  isLoading: boolean;
  error: string | null;
  fetchDrinks: () => Promise<void>;
  addDrink: (input: NewDrinkInput) => Promise<DrinkOption>;
}

let drinkService: IDrinkService = new MemoryDrinkService();

export const setDrinkService = (service: IDrinkService) => {
  drinkService = service;
};

export const useDrinkStore = create<DrinkState>(set => ({
  drinks: [],
  milkOptions: [],
  isLoading: false,
  error: null,

  fetchDrinks: async () => {
    set({isLoading: true, error: null});
    try {
      const [drinks, milkOptions] = await Promise.all([
        drinkService.getDrinkOptions(),
        drinkService.getMilkOptions(),
      ]);
      set({drinks, milkOptions, isLoading: false});
    } catch (e) {
      set({isLoading: false, error: 'Erro ao buscar bebidas'});
      throw e;
    }
  },

  addDrink: async (input: NewDrinkInput) => {
    const drink = await drinkService.addDrink(input);
    set(state => ({drinks: [...state.drinks, drink]}));
    return drink;
  },
}));
