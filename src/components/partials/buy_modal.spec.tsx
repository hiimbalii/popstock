import BuyModal from './buy_modal';
import {renderWithProvider, trackMock} from '../../common/utils/test-utils';
import {store} from '../../core/store/store';
import userEvent from '@testing-library/user-event';
import {screen} from '@testing-library/dom';

/// * song should be rendered out
/// * total cost should update
/// * wallet should be rendered
/// * over the limit text should appear when wallet < total
/// * buy button should buy& close
/// * close button should only close the modal
// TODO: Unify song display

jest.mock('nanoid', () => ({
  nanoid: () => 1,
}));
describe('<BuyModal />', () => {
  beforeEach(async () => {
    jest.resetAllMocks();
    renderWithProvider(<BuyModal track={trackMock} />, store);
    await userEvent.click(screen.getByRole('button'));
  });

  it('should display track', () => {
    expect(screen.getByText('song-title')).toBeInTheDocument();
    expect(screen.getByText(/artist-name -.*/i)).toBeInTheDocument();
    expect(screen.getByText(/.*- album-name/i)).toBeInTheDocument();
  });

  it('should by default offer to buy 1 share', () => {
    expect(screen.getByLabelText('Amount to buy')).toHaveValue(1);
    expect(screen.getByTestId('total-cost')).toHaveTextContent(
      trackMock.popularity.toString(),
    );
  });
  it('should let user select arbitrary number of shares to buy', async () => {
    const nrOfShares = 15;
    await userEvent.clear(screen.getByLabelText('Amount to buy'));
    await userEvent.type(
      screen.getByLabelText('Amount to buy'),
      nrOfShares.toString(),
    );

    expect(screen.getByTestId('total-cost')).toHaveTextContent(
      (trackMock.popularity * nrOfShares).toString(),
    );
    expect(screen.queryByTestId('too-much')).not.toBeInTheDocument();
    expect(screen.getByText('Buy shares')).toBeEnabled();
  });

  it('should display current wallet', () => {
    const wallet = store.getState().portfolio.wallet;
    expect(screen.getByTestId('wallet')).toHaveTextContent(wallet.toString());
  });
  // eslint-disable-next-line quotes
  it("should display message and disable buy button if user can't afford shares", async () => {
    const wallet = store.getState().portfolio.wallet;
    const tooMuch = Math.ceil(wallet / trackMock.popularity);
    const diff = tooMuch * trackMock.popularity - wallet;
    await userEvent.clear(screen.getByLabelText('Amount to buy'));
    await userEvent.type(
      screen.getByLabelText('Amount to buy'),
      tooMuch.toString(),
    );

    expect(screen.getByTestId('too-much')).toBeInTheDocument();
    expect(screen.getByTestId('too-much')).toHaveTextContent(diff.toString());
    expect(screen.getByText('Buy shares')).toBeDisabled();
  });

  it('should close modal without buying anything with the close button', async () => {
    const {wallet: originalWallet, portfolio: originalPortfolio} =
      store.getState().portfolio;
    await userEvent.click(screen.getByText('Close'), undefined, {
      skipPointerEventsCheck: true, // i am clueless as of why it is needed
    });

    expect(screen.queryByRole('dialog')).not.toBeInTheDocument();
    const {wallet, portfolio} = store.getState().portfolio;
    expect(wallet).toBe(originalWallet);
    expect(portfolio).toHaveLength(originalPortfolio.length);
  });

  it('should close modal with buying 1 stock when clicking buy without selecting amount', async () => {
    const {wallet: originalWallet, portfolio: originalPortfolio} =
      store.getState().portfolio;
    await userEvent.click(screen.getByText('Buy shares'));

    expect(screen.queryByRole('dialog')).not.toBeInTheDocument();
    const {wallet, portfolio} = store.getState().portfolio;
    expect(wallet).toBe(originalWallet - trackMock.popularity);
    expect(portfolio).toHaveLength(originalPortfolio.length + 1);
  });
  it('should close modal with buying n stock when selecting amount and clicking buy', async () => {
    const {wallet: originalWallet, portfolio: originalPortfolio} =
      store.getState().portfolio;
    const nrOfShares = 15;
    await userEvent.clear(screen.getByLabelText('Amount to buy'));
    await userEvent.type(
      screen.getByLabelText('Amount to buy'),
      nrOfShares.toString(),
    );
    await userEvent.click(screen.getByText('Buy shares'));

    expect(screen.queryByRole('dialog')).not.toBeInTheDocument();
    const {wallet, portfolio} = store.getState().portfolio;

    expect(wallet).toBe(originalWallet - trackMock.popularity * nrOfShares);
    expect(portfolio).toHaveLength(originalPortfolio.length + 1);
  });
});
