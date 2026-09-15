# CoffeeShop

App em React Native para gerenciar os pedidos de uma cafeteria, com dois fluxos:

- **Caixa**: cria pedidos (cliente + bebidas), confirma e acompanha a lista de pedidos (editar/excluir enquanto pendentes).
- **Barista**: vê os pedidos por status (Pendentes → Fazendo → Concluídos) e avança cada um pela fila de preparo.

## Stack

React Native 0.87, TypeScript, React Navigation (bottom tabs + native stack) e Zustand para o estado global (`src/store/orderStore.ts`). Os dados de pedidos e bebidas ficam atrás de interfaces (`IOrderService`, `IDrinkService`) com uma implementação em memória (`src/services/memoryService.ts`), o que facilita trocar por uma API real no futuro.

## Estrutura

```
src/
  components/   componentes reutilizáveis (cards, chips, empty states, etc.)
  navigation/    stacks e tabs (Caixa / Barista)
  screens/       telas de caixa e de barista
  services/      interfaces e implementação em memória de pedidos/bebidas
  store/         estado global (Zustand)
  theme/         cores e tipografia centralizadas
  types/         tipos compartilhados (Order, navegação)
```

## Getting Started

> **Note**: Make sure you have completed the [Set Up Your Environment](https://reactnative.dev/docs/set-up-your-environment) guide before proceeding.

### Step 1: Start Metro

```sh
npm start
```

### Step 2: Build and run

```sh
npm run android
# ou
npm run ios   # rodar `bundle install` e `bundle exec pod install` na primeira vez
```

### Testes e qualidade

```sh
npm test        # jest
npm run lint     # eslint
npx tsc --noEmit # checagem de tipos
```

## Troubleshooting

Veja o guia oficial de [Troubleshooting](https://reactnative.dev/docs/troubleshooting) do React Native.
