import React from 'react';
import {render} from '@testing-library/react-native';
import {StatusChip} from '../../src/components/StatusChip';

describe('StatusChip', () => {
  it('renders pending status correctly', async () => {
    const {getByText} = await render(<StatusChip status="pending" />);
    expect(getByText('Pendente')).toBeTruthy();
  });

  it('renders in_progress status correctly', async () => {
    const {getByText} = await render(<StatusChip status="in_progress" />);
    expect(getByText('Fazendo')).toBeTruthy();
  });

  it('renders completed status correctly', async () => {
    const {getByText} = await render(<StatusChip status="completed" />);
    expect(getByText('Feito')).toBeTruthy();
  });
});
