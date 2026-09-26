import {Platform} from 'react-native';

// iOS Simulator enxerga o Mac como "localhost" diretamente. O Emulador
// Android roda numa VM própria e precisa do alias especial 10.0.2.2 pra
// alcançar o localhost da máquina host. Um dispositivo físico precisaria
// do IP real da máquina na rede local (não coberto aqui ainda).
const HOST = Platform.select({
  ios: 'localhost',
  android: '10.0.2.2',
  default: 'localhost',
});
const PORT = 3000;

export const API_BASE_URL = `http://${HOST}:${PORT}`;
export const SOCKET_URL = API_BASE_URL;
