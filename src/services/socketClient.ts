import {io, Socket} from 'socket.io-client';
import {SOCKET_URL} from '../config/api';
import {useOrderStore} from '../store/orderStore';
import {useDrinkStore} from '../store/drinkStore';

let socket: Socket | null = null;

// Estratégia "refetch on event": em vez de mesclar o payload do evento no
// estado do Zustand na mão, qualquer evento de pedido/bebida simplesmente
// dispara um refetch completo via REST. Mais simples e robusto na escala
// de uma cafeteria; se o volume de eventos crescer muito, dá pra otimizar
// depois mesclando o payload direto.
export function connectRealtimeSync(): void {
  if (socket) {
    return;
  }

  socket = io(SOCKET_URL, {transports: ['websocket']});

  socket.on('order:created', () => useOrderStore.getState().fetchOrders());
  socket.on('order:updated', () => useOrderStore.getState().fetchOrders());
  socket.on('order:deleted', () => useOrderStore.getState().fetchOrders());

  socket.on('drink:created', () => useDrinkStore.getState().fetchDrinks());
  socket.on('drink:updated', () => useDrinkStore.getState().fetchDrinks());
  socket.on('drink:deleted', () => useDrinkStore.getState().fetchDrinks());
}
