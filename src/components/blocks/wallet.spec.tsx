import Wallet from './wallet';
import {
  createMockStore,
  renderWithProvider,
} from '../../common/utils/test-utils';
import {screen} from '@testing-library/react';

jest.mock('nanoid', () => {
  () => 1;
});

describe('<Wallet />', () => {
  it('should render amount of money in wallet', () => {
    const store = createMockStore();
    renderWithProvider(<Wallet />, store);
    expect(
      screen.getByText(store.getState().portfolio.wallet.toString()),
    ).toBeInTheDocument();
  });
});
