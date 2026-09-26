import type {DrinkType, MilkType} from '../types/order';

export interface DrinkOption {
  type: DrinkType;
  label: string;
  price: number;
  hasMilk: boolean;
}

export interface MilkOption {
  type: MilkType;
  label: string;
  priceAdd: number;
}

export interface NewDrinkInput {
  label: string;
  price: number;
  hasMilk: boolean;
}

export interface IDrinkService {
  getDrinkOptions(): Promise<DrinkOption[]>;
  getMilkOptions(): Promise<MilkOption[]>;
  getDrinkPrice(type: DrinkType, milk: MilkType): number;
  addDrink(input: NewDrinkInput): Promise<DrinkOption>;
}
