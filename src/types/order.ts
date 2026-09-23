export type OrderStatus = 'pending' | 'in_progress' | 'completed';
export type MilkType = 'normal' | 'zero' | 'vegetal';
export type DrinkType = string;

export interface DrinkItem {
  id: string;
  type: DrinkType;
  label: string;
  quantity: number;
  milk: MilkType;
  notes: string;
  price: number;
}

export interface Order {
  id: string;
  customerName: string;
  items: DrinkItem[];
  status: OrderStatus;
  total: number;
  createdAt: number;
}

export interface CreateOrderDTO {
  customerName: string;
  items: DrinkItem[];
}
