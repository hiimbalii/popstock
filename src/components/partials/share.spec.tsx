import ShareDetails from './share';
import {
  renderWithProvider,
  shareMock as share,
} from '../../common/utils/test-utils';
import calculateDelta from '../../common/utils/calcDelta';
import {screen} from '@testing-library/react';
import userEvent from '@testing-library/user-event';

/// * should render out track info
/// * should render out original buying price and owned amount
/// * should render out current price
/// * should render out delta if there is any
/// * should open a sell modal with the correct price and track
jest.mock('nanoid', () => ({
  nanoid: () => 1,
}));
describe('<ShareDetails />', () => {
  it('should render track data out correcctly', () => {
    renderWithProvider(<ShareDetails share={share} currentPrice={1} />);

    expect(screen.getByText('song-title')).toBeInTheDocument();
    expect(screen.getByText(/.*- artist-name/i)).toBeInTheDocument();
    expect(screen.getByText(/album-name -.*/i)).toBeInTheDocument();
  });

  it('should display all owned shares', () => {
    renderWithProvider(<ShareDetails share={share} currentPrice={1} />);

    expect(screen.getByTestId('share-qty')).toHaveTextContent(
      share.quantity.toString(),
    );
  });

  it('should display buy price and sell price', () => {
    renderWithProvider(<ShareDetails share={share} currentPrice={76} />);

    expect(screen.getByTestId('buy-price')).toHaveTextContent(
      share.buyPrice.toString(),
    );
    expect(screen.getByTestId('sell-price')).toHaveTextContent('76');
  });

  it('should display delta if buy and shell price is different', () => {
    renderWithProvider(<ShareDetails share={share} currentPrice={76} />);

    expect(screen.queryByTestId('delta')).toBeInTheDocument();
    expect(screen.queryByTestId('delta')).toHaveTextContent(
      calculateDelta(share.buyPrice, 76).toString(),
    );
  });

  it('should not display delta if buy and shell price is the same', () => {
    renderWithProvider(
      <ShareDetails share={share} currentPrice={share.buyPrice} />,
    );

    expect(screen.queryByTestId('delta')).toBeNull();
  });
  it('should not open modal by default', () => {
    renderWithProvider(<ShareDetails share={share} currentPrice={76} />);

    expect(screen.queryByRole('dialog')).toBeNull();
  });

  it('should open modal when sell button is clicked', async () => {
    renderWithProvider(<ShareDetails share={share} currentPrice={76} />);

    await userEvent.click(screen.getByText('Sell'));

    expect(screen.queryByRole('dialog')).toBeInTheDocument();
  });
});
