import React from 'react';
import {render} from '@testing-library/react-native';
import {EmptyState} from '../../src/components/EmptyState';

describe('EmptyState', () => {
  it('renders title and message', async () => {
    const {getByText} = await render(
      <EmptyState
        title="Nenhum pedido"
        message="Quando voce criar pedidos, eles aparecerao aqui."
      />,
    );
    expect(getByText('Nenhum pedido')).toBeTruthy();
    expect(
      getByText('Quando voce criar pedidos, eles aparecerao aqui.'),
    ).toBeTruthy();
  });

  it('renders icon when provided', async () => {
    const {getByText} = await render(
      <EmptyState
        title="Vazio"
        message="Nada aqui"
        icon="receipt"
      />,
    );
    expect(getByText('Vazio')).toBeTruthy();
    expect(getByText('🧾')).toBeTruthy();
  });

  it('renders action button when provided', async () => {
    const onPress = jest.fn();
    const {getByText} = await render(
      <EmptyState
        title="Vazio"
        message="Nada aqui"
        actionLabel="Criar"
        onAction={onPress}
      />,
    );
    expect(getByText('+ Criar')).toBeTruthy();
  });
});
