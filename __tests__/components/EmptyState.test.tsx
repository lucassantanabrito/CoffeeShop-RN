import React from 'react';
import {Text} from 'react-native';
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
        icon={<Text>Icon</Text>}
      />,
    );
    expect(getByText('Icon')).toBeTruthy();
  });
});
