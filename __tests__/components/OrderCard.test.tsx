import React from 'react';
import {render} from '@testing-library/react-native';
import {OrderCard} from '../../src/components/OrderCard';
import type {Order} from '../../src/types/order';

const mockOrder: Order = {
  id: '001',
  customerName: 'Maria Silva',
  items: [
    {
      id: '1',
      type: 'latte',
      label: 'Latte',
      quantity: 2,
      milk: 'vegetal',
      notes: '',
      price: 44.0,
    },
    {
      id: '2',
      type: 'espresso',
      label: 'Espresso',
      quantity: 1,
      milk: 'normal',
      notes: '',
      price: 8.0,
    },
  ],
  status: 'pending',
  total: 52.0,
  createdAt: Date.now(),
};

describe('OrderCard', () => {
  it('renders order id and customer name', async () => {
    const {getByText} = await render(<OrderCard order={mockOrder} />);
    expect(getByText('#001')).toBeTruthy();
    expect(getByText('Maria Silva')).toBeTruthy();
  });

  it('renders order total', async () => {
    const {getByText} = await render(<OrderCard order={mockOrder} />);
    expect(getByText('R$ 52.00')).toBeTruthy();
  });

  it('renders items when showItems is true', async () => {
    const {getByText} = await render(<OrderCard order={mockOrder} />);
    expect(getByText(/2x latte/i)).toBeTruthy();
    expect(getByText(/1x espresso/i)).toBeTruthy();
  });

  it('does not render items when showItems is false', async () => {
    const {queryByText} = await render(
      <OrderCard order={mockOrder} showItems={false} />,
    );
    expect(queryByText(/2x latte/i)).toBeNull();
  });

  it('renders status chip', async () => {
    const {getByText} = await render(<OrderCard order={mockOrder} />);
    expect(getByText('Pendente')).toBeTruthy();
  });

  it('renders action button when provided', async () => {
    const onAction = jest.fn();
    const {getByText} = await render(
      <OrderCard
        order={mockOrder}
        actionLabel="Fazendo"
        onAction={onAction}
      />,
    );
    expect(getByText('Fazendo')).toBeTruthy();
  });
});
