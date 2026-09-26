import {apiClient} from './apiClient';
import {MILK_OPTIONS} from './memoryService';
import type {IDrinkService, DrinkOption, MilkOption, NewDrinkInput} from './drinkService';
import type {DrinkType, MilkType} from '../types/order';

export class ApiDrinkService implements IDrinkService {
  // Cache local só pra permitir que getDrinkPrice continue síncrono (é
  // chamado em vários lugares da UI que não esperam uma Promise).
  // Preenchido pela última chamada a getDrinkOptions()/addDrink().
  private cachedDrinks: DrinkOption[] = [];

  async getDrinkOptions(): Promise<DrinkOption[]> {
    const drinks = await apiClient.get<DrinkOption[]>('/drinks');
    this.cachedDrinks = drinks;
    return drinks;
  }

  async getMilkOptions(): Promise<MilkOption[]> {
    // Não existe endpoint de CRUD pra opções de leite no backend ainda —
    // são fixas, então usamos a mesma lista estática do serviço em memória.
    return MILK_OPTIONS;
  }

  getDrinkPrice(type: DrinkType, milk: MilkType): number {
    const drink = this.cachedDrinks.find(d => d.type === type);
    const basePrice = drink?.price ?? 0;
    const milkAdd = drink?.hasMilk
      ? MILK_OPTIONS.find(m => m.type === milk)?.priceAdd ?? 0
      : 0;
    return basePrice + milkAdd;
  }

  async addDrink(input: NewDrinkInput): Promise<DrinkOption> {
    const drink = await apiClient.post<DrinkOption>('/drinks', input);
    this.cachedDrinks.push(drink);
    return drink;
  }
}
