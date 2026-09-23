import React from 'react';
import {render} from '@testing-library/react-native';
import {DrinkItemCard} from '../../src/components/DrinkItemCard';
import type {DrinkItem} from '../../src/types/order';

const mockDrink: DrinkItem = {
  id: '1',
  type: 'latte',
  label: 'Latte',
  quantity: 2,
  milk: 'vegetal',
  notes: 'Sem acucar',
  price: 44.0,
};

describe('DrinkItemCard', () => {
  it('renders drink type', async () => {
    const {getByText} = await render(<DrinkItemCard item={mockDrink} />);
    expect(getByText(/latte/i)).toBeTruthy();
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
    const {getByTestId} = await render(
      <DrinkItemCard item={mockDrink} onRemove={onRemove} />,
    );
    expect(getByTestId('drink-item-remove')).toBeTruthy();
  });

  it('does not render remove button when onRemove is not provided', async () => {
    const {queryByTestId} = await render(<DrinkItemCard item={mockDrink} />);
    expect(queryByTestId('drink-item-remove')).toBeNull();
  });
});
