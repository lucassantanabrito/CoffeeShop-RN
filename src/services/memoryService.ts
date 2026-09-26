import type {IOrderService} from './orderService';
import type {IDrinkService, DrinkOption, MilkOption, NewDrinkInput} from './drinkService';
import type {Order, CreateOrderDTO, OrderStatus, DrinkType, MilkType} from '../types/order';

const INITIAL_DRINKS: DrinkOption[] = [
  {type: 'espresso', label: 'Espresso', price: 8.0, hasMilk: false},
  {type: 'latte', label: 'Latte', price: 18.0, hasMilk: true},
  {type: 'v60', label: 'V60', price: 15.0, hasMilk: false},
  {type: 'mocha', label: 'Mocha', price: 20.0, hasMilk: true},
  {type: 'chocolate_quente', label: 'Chocolate Quente', price: 14.0, hasMilk: true},
  {type: 'cappuccino', label: 'Cappuccino', price: 16.0, hasMilk: true},
];

export const MILK_OPTIONS: MilkOption[] = [
  {type: 'normal', label: 'Normal', priceAdd: 0},
  {type: 'zero', label: 'Zero', priceAdd: 2.0},
  {type: 'vegetal', label: 'Vegetal', priceAdd: 4.0},
];

export class MemoryOrderService implements IOrderService {
  private orders: Order[] = [];
  private orderCounter = 0;

  async getOrders(): Promise<Order[]> {
    return [...this.orders];
  }

  async getOrderById(id: string): Promise<Order | null> {
    return this.orders.find(o => o.id === id) ?? null;
  }

  async createOrder(data: CreateOrderDTO): Promise<Order> {
    this.orderCounter++;
    const order: Order = {
      id: String(this.orderCounter).padStart(3, '0'),
      customerName: data.customerName,
      items: data.items,
      status: 'pending',
      total: data.items.reduce((sum, item) => sum + item.price, 0),
      createdAt: Date.now(),
    };
    this.orders.push(order);
    return order;
  }

  async updateOrderStatus(id: string, status: OrderStatus): Promise<Order> {
    const index = this.orders.findIndex(o => o.id === id);
    if (index === -1) {
      throw new Error(`Order ${id} not found`);
    }
    const updated: Order = {...this.orders[index], status};
    this.orders[index] = updated;
    return updated;
  }

  async updateOrder(id: string, data: CreateOrderDTO): Promise<Order> {
    const index = this.orders.findIndex(o => o.id === id);
    if (index === -1) {
      throw new Error(`Order ${id} not found`);
    }
    const updated: Order = {
      ...this.orders[index],
      customerName: data.customerName,
      items: data.items,
      total: data.items.reduce((sum, item) => sum + item.price, 0),
    };
    this.orders[index] = updated;
    return updated;
  }

  async deleteOrder(id: string): Promise<void> {
    const index = this.orders.findIndex(o => o.id === id);
    if (index !== -1) {
      this.orders.splice(index, 1);
    }
  }
}

export class MemoryDrinkService implements IDrinkService {
  private drinks: DrinkOption[] = INITIAL_DRINKS.map(drink => ({...drink}));

  async getDrinkOptions(): Promise<DrinkOption[]> {
    return [...this.drinks];
  }

  async getMilkOptions(): Promise<MilkOption[]> {
    return MILK_OPTIONS;
  }

  getDrinkPrice(type: DrinkType, milk: MilkType): number {
    const drink = this.drinks.find(d => d.type === type);
    const basePrice = drink?.price ?? 0;
    const milkAdd = drink?.hasMilk
      ? MILK_OPTIONS.find(m => m.type === milk)?.priceAdd ?? 0
      : 0;
    return basePrice + milkAdd;
  }

  async addDrink(input: NewDrinkInput): Promise<DrinkOption> {
    const drink: DrinkOption = {
      type: `custom-${Date.now()}-${Math.random().toString(36).slice(2, 8)}`,
      label: input.label,
      price: input.price,
      hasMilk: input.hasMilk,
    };
    this.drinks.push(drink);
    return drink;
  }
}
