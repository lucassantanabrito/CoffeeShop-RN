import {create} from 'zustand';
import type {DrinkOption, MilkOption, NewDrinkInput} from '../services';
import type {IDrinkService} from '../services';
import {MemoryDrinkService} from '../services';

interface DrinkState {
  drinks: DrinkOption[];
  milkOptions: MilkOption[];
  fetchDrinks: () => void;
  addDrink: (input: NewDrinkInput) => DrinkOption;
}

let drinkService: IDrinkService = new MemoryDrinkService();

export const setDrinkService = (service: IDrinkService) => {
  drinkService = service;
};

export const useDrinkStore = create<DrinkState>(set => ({
  drinks: drinkService.getDrinkOptions(),
  milkOptions: drinkService.getMilkOptions(),

  fetchDrinks: () => set({drinks: drinkService.getDrinkOptions()}),

  addDrink: (input: NewDrinkInput) => {
    const drink = drinkService.addDrink(input);
    set({drinks: drinkService.getDrinkOptions()});
    return drink;
  },
}));
