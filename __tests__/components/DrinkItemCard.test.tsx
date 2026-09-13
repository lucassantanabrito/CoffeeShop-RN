import React from 'react';
import {render} from '@testing-library/react-native';
import {DrinkItemCard} from '../../src/components/DrinkItemCard';
import type {DrinkItem} from '../../src/types/order';

const mockDrink: DrinkItem = {
  id: '1',
  type: 'latte',
  quantity: 2,
  milk: 'vegetal',
  notes: 'Sem acucar',
  price: 44.0,
};

describe('DrinkItemCard', () => {
  it('renders drink type', async () => {
    const {getByText} = await render(<DrinkItemCard item={mockDrink} />);
    expect(getByText(/latte/)).toBeTruthy();
  });

  it('renders quantity', async () => {
    const {getByText} = await render(<DrinkItemCard item={mockDrink} />);
    expect(getByText('2x')).toBeTruthy();
  });

  it('renders milk type when not normal', async () => {
    const {getByText} = await render(<DrinkItemCard item={mockDrink} />);
    expect(getByText('Vegetal')).toBeTruthy();
  });

  it('renders price', async () => {
    const {getByText} = await render(<DrinkItemCard item={mockDrink} />);
    expect(getByText('R$ 44.00')).toBeTruthy();
  });

  it('renders remove button when onRemove is provided', async () => {
    const onRemove = jest.fn();
    const {getByText} = await render(
      <DrinkItemCard item={mockDrink} onRemove={onRemove} />,
    );
    expect(getByText('×')).toBeTruthy();
  });

  it('does not render remove button when onRemove is not provided', async () => {
    const {queryByText} = await render(<DrinkItemCard item={mockDrink} />);
    expect(queryByText('×')).toBeNull();
  });
});
