import {useOrderStore, setOrderService} from '../../src/store/orderStore';
import {MemoryOrderService} from '../../src/services/memoryService';
import type {DrinkItem} from '../../src/types/order';

beforeEach(() => {
  setOrderService(new MemoryOrderService());
  useOrderStore.setState({
    orders: [],
    currentOrderItems: [],
    customerName: '',
    isLoading: false,
    error: null,
  });
});

describe('OrderStore', () => {
  describe('setCustomerName', () => {
    it('sets the customer name', () => {
      useOrderStore.getState().setCustomerName('Maria Silva');
      expect(useOrderStore.getState().customerName).toBe('Maria Silva');
    });
  });

  describe('addDrinkToOrder', () => {
    it('adds a drink to the current order', () => {
      const drink: DrinkItem = {
        id: '1',
        type: 'latte',
        label: 'Latte',
        quantity: 1,
        milk: 'normal',
        notes: '',
        price: 18.0,
      };
      useOrderStore.getState().addDrinkToOrder(drink);
      expect(useOrderStore.getState().currentOrderItems).toHaveLength(1);
      expect(useOrderStore.getState().currentOrderItems[0].type).toBe('latte');
    });

    it('adds multiple drinks', () => {
      const drink1: DrinkItem = {
        id: '1',
        type: 'latte',
        label: 'Latte',
        quantity: 1,
        milk: 'normal',
        notes: '',
        price: 18.0,
      };
      const drink2: DrinkItem = {
        id: '2',
        type: 'espresso',
        label: 'Espresso',
        quantity: 2,
        milk: 'normal',
        notes: '',
        price: 16.0,
      };
      useOrderStore.getState().addDrinkToOrder(drink1);
      useOrderStore.getState().addDrinkToOrder(drink2);
      expect(useOrderStore.getState().currentOrderItems).toHaveLength(2);
    });
  });

  describe('removeDrinkFromOrder', () => {
    it('removes a drink by id', () => {
      const drink: DrinkItem = {
        id: '1',
        type: 'latte',
        label: 'Latte',
        quantity: 1,
        milk: 'normal',
        notes: '',
        price: 18.0,
      };
      useOrderStore.getState().addDrinkToOrder(drink);
      useOrderStore.getState().removeDrinkFromOrder('1');
      expect(useOrderStore.getState().currentOrderItems).toHaveLength(0);
    });
  });

  describe('clearCurrentOrder', () => {
    it('clears items and customer name', () => {
      useOrderStore.getState().setCustomerName('Test');
      useOrderStore.getState().addDrinkToOrder({
        id: '1',
        type: 'espresso',
        label: 'Espresso',
        quantity: 1,
        milk: 'normal',
        notes: '',
        price: 8.0,
      });
      useOrderStore.getState().clearCurrentOrder();
      expect(useOrderStore.getState().currentOrderItems).toHaveLength(0);
      expect(useOrderStore.getState().customerName).toBe('');
    });
  });

  describe('submitOrder', () => {
    it('creates an order and clears current state', async () => {
      useOrderStore.getState().setCustomerName('Maria Silva');
      useOrderStore.getState().addDrinkToOrder({
        id: '1',
        type: 'latte',
        label: 'Latte',
        quantity: 1,
        milk: 'normal',
        notes: '',
        price: 18.0,
      });

      await useOrderStore.getState().submitOrder();

      expect(useOrderStore.getState().orders).toHaveLength(1);
      expect(useOrderStore.getState().orders[0].customerName).toBe('Maria Silva');
      expect(useOrderStore.getState().orders[0].status).toBe('pending');
      expect(useOrderStore.getState().currentOrderItems).toHaveLength(0);
      expect(useOrderStore.getState().customerName).toBe('');
    });
  });

  describe('updateOrderStatus', () => {
    it('updates order status from pending to in_progress', async () => {
      useOrderStore.getState().setCustomerName('Test');
      useOrderStore.getState().addDrinkToOrder({
        id: '1',
        type: 'espresso',
        label: 'Espresso',
        quantity: 1,
        milk: 'normal',
        notes: '',
        price: 8.0,
      });
      await useOrderStore.getState().submitOrder();

      const orderId = useOrderStore.getState().orders[0].id;
      await useOrderStore.getState().updateOrderStatus(orderId, 'in_progress');

      expect(useOrderStore.getState().orders[0].status).toBe('in_progress');
    });

    it('updates order status from in_progress to completed', async () => {
      useOrderStore.getState().setCustomerName('Test');
      useOrderStore.getState().addDrinkToOrder({
        id: '1',
        type: 'espresso',
        label: 'Espresso',
        quantity: 1,
        milk: 'normal',
        notes: '',
        price: 8.0,
      });
      await useOrderStore.getState().submitOrder();

      const orderId = useOrderStore.getState().orders[0].id;
      await useOrderStore.getState().updateOrderStatus(orderId, 'in_progress');
      await useOrderStore.getState().updateOrderStatus(orderId, 'completed');

      expect(useOrderStore.getState().orders[0].status).toBe('completed');
    });
  });

  describe('getOrdersByStatus', () => {
    it('filters orders by status', async () => {
      useOrderStore.getState().setCustomerName('Test 1');
      useOrderStore.getState().addDrinkToOrder({
        id: '1',
        type: 'espresso',
        label: 'Espresso',
        quantity: 1,
        milk: 'normal',
        notes: '',
        price: 8.0,
      });
      await useOrderStore.getState().submitOrder();

      useOrderStore.getState().setCustomerName('Test 2');
      useOrderStore.getState().addDrinkToOrder({
        id: '2',
        type: 'latte',
        label: 'Latte',
        quantity: 1,
        milk: 'normal',
        notes: '',
        price: 18.0,
      });
      await useOrderStore.getState().submitOrder();

      const pending = useOrderStore.getState().getPendingOrders();
      expect(pending).toHaveLength(2);

      const orderId = useOrderStore.getState().orders[0].id;
      await useOrderStore.getState().updateOrderStatus(orderId, 'completed');

      expect(useOrderStore.getState().getPendingOrders()).toHaveLength(1);
      expect(useOrderStore.getState().getCompletedOrders()).toHaveLength(1);
    });
  });

  describe('getCompletedCount', () => {
    it('returns correct count of completed orders', async () => {
      useOrderStore.getState().setCustomerName('Test');
      useOrderStore.getState().addDrinkToOrder({
        id: '1',
        type: 'espresso',
        label: 'Espresso',
        quantity: 1,
        milk: 'normal',
        notes: '',
        price: 8.0,
      });
      await useOrderStore.getState().submitOrder();

      expect(useOrderStore.getState().getCompletedCount()).toBe(0);

      const orderId = useOrderStore.getState().orders[0].id;
      await useOrderStore.getState().updateOrderStatus(orderId, 'completed');

      expect(useOrderStore.getState().getCompletedCount()).toBe(1);
    });
  });
});
