import {create} from 'zustand';
import type {Order, DrinkItem, OrderStatus, CreateOrderDTO} from '../types/order';
import type {IOrderService} from '../services';
import {MemoryOrderService} from '../services';

interface OrderState {
  orders: Order[];
  currentOrderItems: DrinkItem[];
  isLoading: boolean;
  error: string | null;
  addDrinkToOrder: (item: DrinkItem) => void;
  removeDrinkFromOrder: (itemId: string) => void;
  clearCurrentOrder: () => void;
  setCustomerName: (name: string) => void;
  customerName: string;
  editingOrderId: string | null;
  submitOrder: () => Promise<Order>;
  updateOrderStatus: (orderId: string, status: OrderStatus) => Promise<void>;
  deleteOrder: (orderId: string) => Promise<void>;
  loadOrderForEditing: (order: Order) => void;
  fetchOrders: () => Promise<void>;
  getOrdersByStatus: (status: OrderStatus) => Order[];
  getPendingOrders: () => Order[];
  getInProgressOrders: () => Order[];
  getCompletedOrders: () => Order[];
  getOrdersTotal: () => number;
  getCompletedCount: () => number;
}

let orderService: IOrderService = new MemoryOrderService();

export const setOrderService = (service: IOrderService) => {
  orderService = service;
};

export const useOrderStore = create<OrderState>((set, get) => ({
  orders: [],
  currentOrderItems: [],
  customerName: '',
  editingOrderId: null,
  isLoading: false,
  error: null,

  setCustomerName: (name: string) => set({customerName: name}),

  addDrinkToOrder: (item: DrinkItem) =>
    set(state => ({
      currentOrderItems: [...state.currentOrderItems, item],
    })),

  removeDrinkFromOrder: (itemId: string) =>
    set(state => ({
      currentOrderItems: state.currentOrderItems.filter(i => i.id !== itemId),
    })),

  clearCurrentOrder: () => set({currentOrderItems: [], customerName: '', editingOrderId: null}),

  submitOrder: async () => {
    const {customerName, currentOrderItems, editingOrderId} = get();
    set({isLoading: true, error: null});
    try {
      const dto: CreateOrderDTO = {
        customerName,
        items: currentOrderItems,
      };
      let order: Order;
      if (editingOrderId) {
        order = await orderService.updateOrder(editingOrderId, dto);
        set(state => ({
          orders: state.orders.map(o => (o.id === editingOrderId ? order : o)),
          currentOrderItems: [],
          customerName: '',
          editingOrderId: null,
          isLoading: false,
        }));
      } else {
        order = await orderService.createOrder(dto);
        set(state => ({
          orders: [...state.orders, order],
          currentOrderItems: [],
          customerName: '',
          isLoading: false,
        }));
      }
      return order;
    } catch (e) {
      set({isLoading: false, error: editingOrderId ? 'Erro ao atualizar pedido' : 'Erro ao criar pedido'});
      throw e;
    }
  },

  updateOrderStatus: async (orderId: string, status: OrderStatus) => {
    set({isLoading: true, error: null});
    try {
      const updated = await orderService.updateOrderStatus(orderId, status);
      set(state => ({
        orders: state.orders.map(o => (o.id === orderId ? updated : o)),
        isLoading: false,
      }));
    } catch (e) {
      set({isLoading: false, error: 'Erro ao atualizar status'});
      throw e;
    }
  },

  deleteOrder: async (orderId: string) => {
    set({isLoading: true, error: null});
    try {
      await orderService.deleteOrder(orderId);
      set(state => ({
        orders: state.orders.filter(o => o.id !== orderId),
        isLoading: false,
      }));
    } catch (e) {
      set({isLoading: false, error: 'Erro ao excluir pedido'});
      throw e;
    }
  },

  loadOrderForEditing: (order: Order) => {
    set({
      currentOrderItems: order.items,
      customerName: order.customerName,
      editingOrderId: order.id,
    });
  },

  fetchOrders: async () => {
    set({isLoading: true, error: null});
    try {
      const orders = await orderService.getOrders();
      set({orders, isLoading: false});
    } catch (e) {
      set({isLoading: false, error: 'Erro ao buscar pedidos'});
      throw e;
    }
  },

  getOrdersByStatus: (status: OrderStatus) => {
    return get().orders.filter(o => o.status === status);
  },

  getPendingOrders: () =>
    get()
      .orders.filter(o => o.status === 'pending')
      .sort((a, b) => a.createdAt.getTime() - b.createdAt.getTime()),

  getInProgressOrders: () =>
    get()
      .orders.filter(o => o.status === 'in_progress')
      .sort((a, b) => a.createdAt.getTime() - b.createdAt.getTime()),

  getCompletedOrders: () =>
    get()
      .orders.filter(o => o.status === 'completed')
      .sort((a, b) => a.createdAt.getTime() - b.createdAt.getTime()),

  getOrdersTotal: () => get().orders.reduce((sum, o) => sum + o.total, 0),

  getCompletedCount: () => get().orders.filter(o => o.status === 'completed').length,
}));
