import type {IOrderService} from './orderService';
import type {IDrinkService, DrinkOption, MilkOption} from './drinkService';
import type {Order, CreateOrderDTO, OrderStatus, DrinkType, MilkType} from '../types/order';

let orderCounter = 0;

const DRINK_PRICES: Record<DrinkType, number> = {
  espresso: 8.0,
  latte: 18.0,
  v60: 15.0,
  mocha: 20.0,
  chocolate_quente: 14.0,
  cappuccino: 16.0,
};

const DRINK_LABELS: Record<DrinkType, string> = {
  espresso: 'Espresso',
  latte: 'Latte',
  v60: 'V60',
  mocha: 'Mocha',
  chocolate_quente: 'Chocolate Quente',
  cappuccino: 'Cappuccino',
};

const MILK_OPTIONS: MilkOption[] = [
  {type: 'normal', label: 'Normal', priceAdd: 0},
  {type: 'zero', label: 'Zero', priceAdd: 2.0},
  {type: 'vegetal', label: 'Vegetal', priceAdd: 4.0},
];

const orders: Order[] = [];

export class MemoryOrderService implements IOrderService {
  async getOrders(): Promise<Order[]> {
    return [...orders];
  }

  async getOrderById(id: string): Promise<Order | null> {
    return orders.find(o => o.id === id) ?? null;
  }

  async createOrder(data: CreateOrderDTO): Promise<Order> {
    orderCounter++;
    const order: Order = {
      id: String(orderCounter).padStart(3, '0'),
      customerName: data.customerName,
      items: data.items,
      status: 'pending',
      total: data.items.reduce((sum, item) => sum + item.price, 0),
      createdAt: new Date(),
    };
    orders.push(order);
    return order;
  }

  async updateOrderStatus(id: string, status: OrderStatus): Promise<Order> {
    const order = orders.find(o => o.id === id);
    if (!order) {
      throw new Error(`Order ${id} not found`);
    }
    order.status = status;
    return order;
  }

  async deleteOrder(id: string): Promise<void> {
    const index = orders.findIndex(o => o.id === id);
    if (index !== -1) {
      orders.splice(index, 1);
    }
  }
}

export class MemoryDrinkService implements IDrinkService {
  getDrinkOptions(): DrinkOption[] {
    return Object.entries(DRINK_PRICES).map(([type, price]) => ({
      type: type as DrinkType,
      label: DRINK_LABELS[type as DrinkType],
      price,
    }));
  }

  getMilkOptions(): MilkOption[] {
    return MILK_OPTIONS;
  }

  getDrinkPrice(type: DrinkType, milk: MilkType): number {
    const basePrice = DRINK_PRICES[type] ?? 0;
    const milkAdd = MILK_OPTIONS.find(m => m.type === milk)?.priceAdd ?? 0;
    return basePrice + milkAdd;
  }
}
