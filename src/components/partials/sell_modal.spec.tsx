import SellModal from './sell_modal';
import {
  createMockStore,
  renderWithProvider,
  shareMock,
  trackMock,
} from '../../common/utils/test-utils';
import userEvent from '@testing-library/user-event';
import {screen} from '@testing-library/dom';

jest.mock('nanoid', () => ({
  nanoid: () => 1,
}));
jest.createMockFromModule('react-redux');

describe('<SellModal />', () => {
  const currentPrice = 11;
  beforeEach(() => expect(shareMock.quantity).toBe(444));

  it('should display track', async () => {
    renderWithProvider(
      <SellModal share={shareMock} currentPrice={currentPrice} />,
    );
    await userEvent.click(screen.getByRole('button'));

    expect(screen.getByText('song-title')).toBeInTheDocument();
    expect(screen.getByText(/artist-name -.*/i)).toBeInTheDocument();
    expect(screen.getByText(/.*- album-name/i)).toBeInTheDocument();
  });
  it('should render out bought shares correctly', async () => {
    renderWithProvider(
      <SellModal share={shareMock} currentPrice={currentPrice} />,
    );
    await userEvent.click(screen.getByRole('button'));

    expect(screen.getByTestId('buy-price')).toHaveTextContent(
      shareMock.buyPrice.toString(),
    );
    expect(screen.getByTestId('total-shares')).toHaveTextContent(
      shareMock.quantity.toString(),
    );
    expect(screen.getByTestId('buy-total')).toHaveTextContent(
      (shareMock.buyPrice * shareMock.quantity).toString(),
    );
  });

  it('should render out current price correctly', async () => {
    renderWithProvider(
      <SellModal share={shareMock} currentPrice={currentPrice} />,
    );
    await userEvent.click(screen.getByRole('button'));

    expect(screen.getByTestId('curr-price')).toHaveTextContent(
      currentPrice.toString(),
    );
    expect(screen.getByTestId('curr-total')).toHaveTextContent(
      (currentPrice * shareMock.quantity).toString(),
    );
  });
  it('should render current delta (0)', async () => {
    renderWithProvider(
      <SellModal share={shareMock} currentPrice={shareMock.buyPrice} />,
    );
    await userEvent.click(screen.getByRole('button'));

    expect(screen.queryByText(/\d*%\)/i)).toHaveTextContent(/0%/i);
  });
  it('should render current delta (+)', async () => {
    renderWithProvider(
      <SellModal share={shareMock} currentPrice={shareMock.buyPrice + 3} />,
    );
    await userEvent.click(screen.getByRole('button'));

    // find {number}% and check if it's a positive number with optional decimal places
    expect(screen.queryByText(/\d*%\)/i)).toHaveTextContent(/\+\d*(\.\d*)?%/i);
  });
  it('should render current delta (-)', async () => {
    renderWithProvider(
      <SellModal share={shareMock} currentPrice={shareMock.buyPrice - 3} />,
    );
    await userEvent.click(screen.getByRole('button'));

    expect(screen.queryByText(/\d*%\)/i)).toHaveTextContent(/-\d*(\.\d*)?%/i);
  });

  it('should render single sell button if there is only 1 share', async () => {
    const singleShare = {...shareMock, quantity: 1};
    renderWithProvider(
      <SellModal share={singleShare} currentPrice={currentPrice} />,
    );
    await userEvent.click(screen.getByRole('button'));

    expect(screen.queryByLabelText('Amount to sell')).not.toBeInTheDocument();
    expect(
      screen.getByRole('button', {
        name: /sell share/i,
      }),
    ).toBeEnabled();
    expect(screen.getByTestId('profit')).toHaveTextContent(
      currentPrice.toString(),
    );
  });
  it('should select all shares by default', async () => {
    renderWithProvider(
      <SellModal share={shareMock} currentPrice={currentPrice} />,
    );
    await userEvent.click(screen.getByRole('button'));

    expect(screen.getByLabelText('Amount to sell')).toHaveDisplayValue(
      shareMock.quantity.toString(),
    );
    expect(
      screen.getByRole('button', {name: /sell all shares/i}),
    ).toBeInTheDocument();
    expect(screen.getByTestId('profit')).toHaveTextContent(
      (currentPrice * shareMock.quantity).toString(),
    );
  });

  it('should render the amount to be sold on button if its not 0 or all of them', async () => {
    const sellAmount = shareMock.quantity - 1;
    renderWithProvider(
      <SellModal share={shareMock} currentPrice={currentPrice} />,
    );
    await userEvent.click(screen.getByRole('button'));
    await userEvent.clear(screen.getByLabelText('Amount to sell'));
    await userEvent.type(
      screen.getByLabelText('Amount to sell'),
      sellAmount.toString(),
    );

    expect(
      screen.getByRole('button', {
        name: `Sell ${sellAmount.toString()} shares`,
      }),
    ).toBeInTheDocument();
    expect(screen.getByTestId('profit')).toHaveTextContent(
      (currentPrice * sellAmount).toString(),
    );
  });

  it('should behave as if all shares were selected when selecting 0', async () => {
    renderWithProvider(
      <SellModal share={shareMock} currentPrice={currentPrice} />,
    );
    await userEvent.click(screen.getByRole('button'));
    await userEvent.clear(screen.getByLabelText('Amount to sell'));
    await userEvent.type(screen.getByLabelText('Amount to sell'), '0');

    expect(
      screen.getByRole('button', {name: /sell all shares/i}),
    ).toBeInTheDocument();
  });
  // shouldn't be able to enter more or less than limits

  it('should not allow user to enter an amount to sell less than 0', async () => {
    renderWithProvider(
      <SellModal share={shareMock} currentPrice={currentPrice} />,
    );
    await userEvent.click(screen.getByRole('button'));
    await userEvent.clear(screen.getByLabelText('Amount to sell'));
    await userEvent.type(screen.getByLabelText('Amount to sell'), '-1');

    expect(screen.getByLabelText('Amount to sell')).not.toHaveDisplayValue(
      '-1',
    );
  });

  it('should not allow user to enter amount to sell more than what is owned', async () => {
    const sellAmount = shareMock.quantity + 1;
    renderWithProvider(
      <SellModal share={shareMock} currentPrice={currentPrice} />,
    );
    await userEvent.click(screen.getByRole('button'));
    await userEvent.clear(screen.getByLabelText('Amount to sell'));
    await userEvent.type(
      screen.getByLabelText('Amount to sell'),
      sellAmount.toString(),
    );

    expect(screen.getByLabelText('Amount to sell')).not.toHaveDisplayValue(
      sellAmount.toString(),
    );
  });
  it('should close without selling anything when clicking the close button', async () => {
    renderWithProvider(
      <SellModal share={shareMock} currentPrice={currentPrice} />,
    );
    await userEvent.click(screen.getByRole('button'));
    await userEvent.click(
      screen.getByRole('button', {name: 'Close'}),
      undefined,
      {skipPointerEventsCheck: true},
    );
  });
  it('should sell only 1 if the user only has 1 share', async () => {
    const store = createMockStore({
      portfolio: {portfolio: [{...shareMock, quantity: 1}], wallet: 1000},
      tracks: {
        catalogue: {searchTerm: '', loadedTracks: [trackMock]},
        loadingState: 'loading',
      },
      app: {access_token: '', name: ''},
    });
    renderWithProvider(
      <SellModal
        share={{...shareMock, quantity: 1}}
        currentPrice={currentPrice}
      />,
      store,
    );
    await userEvent.click(screen.getByRole('button'));
    await userEvent.click(
      screen.getByRole('button', {name: 'Sell share'}),
      undefined,
      {skipPointerEventsCheck: true},
    );

    const tracks = store.getState().portfolio.portfolio;
    expect(tracks).toHaveLength(0);
  });
  it('should sell all shares by default', async () => {
    const initialWallet = 1000;
    const store = createMockStore({
      portfolio: {portfolio: [shareMock], wallet: initialWallet},
      tracks: {
        catalogue: {searchTerm: '', loadedTracks: [trackMock]},
        loadingState: 'loading',
      },
      app: {access_token: '', name: ''},
    });
    renderWithProvider(
      <SellModal share={shareMock} currentPrice={currentPrice} />,
      store,
    );
    await userEvent.click(screen.getByRole('button'));
    await userEvent.click(
      screen.getByRole('button', {name: 'Sell all shares'}),
      undefined,
      {skipPointerEventsCheck: true},
    );

    const tracks = store.getState().portfolio.portfolio;
    expect(tracks).toHaveLength(0);
    const wallet = store.getState().portfolio.wallet;
    expect(wallet).toBe(initialWallet + shareMock.quantity * currentPrice);
  });
  it('should sell all shares when selecting 0', async () => {
    const initialWallet = 1000;
    const store = createMockStore({
      portfolio: {portfolio: [shareMock], wallet: initialWallet},
      tracks: {
        catalogue: {searchTerm: '', loadedTracks: [trackMock]},
        loadingState: 'loading',
      },
      app: {access_token: '', name: ''},
    });
    renderWithProvider(
      <SellModal share={shareMock} currentPrice={currentPrice} />,
      store,
    );
    await userEvent.click(screen.getByRole('button'));
    await userEvent.clear(screen.getByLabelText('Amount to sell'));
    await userEvent.type(screen.getByLabelText('Amount to sell'), '0');
    await userEvent.click(
      screen.getByRole('button', {name: 'Sell all shares'}),
      undefined,
      {skipPointerEventsCheck: true},
    );

    const tracks = store.getState().portfolio.portfolio;
    expect(tracks).toHaveLength(0);
    const wallet = store.getState().portfolio.wallet;
    expect(wallet).toBe(initialWallet + shareMock.quantity * currentPrice);
  });
  it('should sell the selected number of shares when entering arbitrary number', async () => {
    const nrOfSharesToSell = shareMock.quantity - 2;
    const initialWallet = 1000;
    const store = createMockStore({
      portfolio: {portfolio: [shareMock], wallet: initialWallet},
      tracks: {
        catalogue: {searchTerm: '', loadedTracks: [trackMock]},
        loadingState: 'loading',
      },
      app: {access_token: '', name: ''},
    });

    renderWithProvider(
      <SellModal share={shareMock} currentPrice={currentPrice} />,
      store,
    );
    await userEvent.click(screen.getByRole('button'));
    await userEvent.clear(screen.getByLabelText('Amount to sell'));
    await userEvent.type(
      screen.getByLabelText('Amount to sell'),
      nrOfSharesToSell.toString(),
    );
    await userEvent.click(
      screen.getByRole('button', {name: /sell/i}),
      undefined,
      {skipPointerEventsCheck: true},
    );

    const tracks = store.getState().portfolio.portfolio;
    expect(tracks).toHaveLength(1);
    expect(tracks[0].quantity).toBe(shareMock.quantity - nrOfSharesToSell);
    const wallet = store.getState().portfolio.wallet;
    expect(wallet).toBe(initialWallet + nrOfSharesToSell * currentPrice);
  });
});
