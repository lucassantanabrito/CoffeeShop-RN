/**
 * @format
 */

import {AppRegistry} from 'react-native';
import App from './App';
import {name as appName} from './app.json';
import {setOrderService, useOrderStore} from './src/store/orderStore';
import {setDrinkService, useDrinkStore} from './src/store/drinkStore';
import {ApiOrderService, ApiDrinkService} from './src/services';
import {connectRealtimeSync} from './src/services/socketClient';

// Troca os services em memória (usados por padrão, e ainda usados nos
// testes) pelos que conversam com o backend real. Fica aqui, no bootstrap
// nativo, e não em App.tsx, de propósito: os testes de componente
// (__tests__/App.test.tsx) importam App.tsx diretamente, sem passar por
// este arquivo — então continuam rodando 100% em memória, sem rede.
setOrderService(new ApiOrderService());
setDrinkService(new ApiDrinkService());

useOrderStore.getState().fetchOrders();
useDrinkStore.getState().fetchDrinks();
connectRealtimeSync();

AppRegistry.registerComponent(appName, () => App);
