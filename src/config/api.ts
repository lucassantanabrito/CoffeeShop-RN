import {Platform} from 'react-native';

// URL do backend publicado no Railway. Usada sempre que o app roda como
// build de release (produção) — Caixa e Barista no dia a dia da cafeteria.
const PRODUCTION_URL = 'https://coffeeshop-api-node-dev.up.railway.app';

// Em desenvolvimento (rodando pelo Metro), o app continua falando com o
// backend local: iOS Simulator enxerga o Mac como "localhost" diretamente;
// o Emulador Android roda numa VM própria e precisa do alias especial
// 10.0.2.2 pra alcançar o localhost da máquina host. Um dispositivo físico
// em dev precisaria do IP real da máquina na rede local (não coberto aqui).
const DEV_HOST = Platform.select({
  ios: 'localhost',
  android: '10.0.2.2',
  default: 'localhost',
});
const DEV_PORT = 3000;
const DEV_URL = `http://${DEV_HOST}:${DEV_PORT}`;

export const API_BASE_URL = __DEV__ ? DEV_URL : PRODUCTION_URL;
export const SOCKET_URL = API_BASE_URL;
