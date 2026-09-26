import {apiClient} from './apiClient';
import type {IOrderService} from './orderService';
import type {Order, CreateOrderDTO, OrderStatus} from '../types/order';

export class ApiOrderService implements IOrderService {
  async getOrders(): Promise<Order[]> {
    return apiClient.get<Order[]>('/orders');
  }

  async getOrderById(id: string): Promise<Order | null> {
    try {
      return await apiClient.get<Order>(`/orders/${id}`);
    } catch {
      return null;
    }
  }

  async createOrder(data: CreateOrderDTO): Promise<Order> {
    return apiClient.post<Order>('/orders', data);
  }

  async updateOrder(id: string, data: CreateOrderDTO): Promise<Order> {
    return apiClient.put<Order>(`/orders/${id}`, data);
  }

  async updateOrderStatus(id: string, status: OrderStatus): Promise<Order> {
    return apiClient.patch<Order>(`/orders/${id}/status`, {status});
  }

  async deleteOrder(id: string): Promise<void> {
    await apiClient.delete<void>(`/orders/${id}`);
  }
}
