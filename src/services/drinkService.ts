import type {DrinkType, MilkType} from '../types/order';

export interface DrinkOption {
  type: DrinkType;
  label: string;
  price: number;
}

export interface MilkOption {
  type: MilkType;
  label: string;
  priceAdd: number;
}

export interface IDrinkService {
  getDrinkOptions(): DrinkOption[];
  getMilkOptions(): MilkOption[];
  getDrinkPrice(type: DrinkType, milk: MilkType): number;
}
