import type {Order, CreateOrderDTO, OrderStatus} from '../types/order';

export interface IOrderService {
  getOrders(): Promise<Order[]>;
  getOrderById(id: string): Promise<Order | null>;
  createOrder(data: CreateOrderDTO): Promise<Order>;
  updateOrder(id: string, data: CreateOrderDTO): Promise<Order>;
  updateOrderStatus(id: string, status: OrderStatus): Promise<Order>;
  deleteOrder(id: string): Promise<void>;
}
