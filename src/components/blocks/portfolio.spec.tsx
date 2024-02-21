import Portfolio from './portfolio';
import {
  createMockStore,
  renderWithProvider,
  shareMock,
  shareMock2,
  trackMock,
} from '../../common/utils/test-utils';
import {reducer} from '../../core/store/store';
import {buyShare, sellShare} from '../../core/actions/portfolioActions';
import {screen, waitFor} from '@testing-library/react';
import {act} from 'react-dom/test-utils';

jest.mock('nanoid', () => ({
  nanoid: () => 1234,
}));
const priceListMock = {
  'song-1': 12,
  'song-2': 23,
};
jest.mock('../../clients/get_track_prices', () => ({
  getTrackPrices: () => Promise.resolve(priceListMock),
}));
jest.mock('../../common/hooks/useAuth', () => () => 'auth_token');
describe('<Portfolio />', () => {
  const initialState: ReturnType<typeof reducer> = {
    app: {access_token: '', name: ''},
    portfolio: {
      wallet: 1000,
      portfolio: [shareMock, shareMock2],
    },
    tracks: {
      loadingState: 'idle',
      catalogue: {searchTerm: '', loadedTracks: []},
    },
  };

  it('should render everything in the porfolio', async () => {
    const storeMock = createMockStore(initialState);
    await act(async () => renderWithProvider(<Portfolio />, storeMock));

    initialState.portfolio.portfolio.forEach(track => {
      expect(screen.getByText(track.trackData.title)).toBeInTheDocument();
    });
  });

  it('should show how many shares are owned', async () => {
    const storeMock = createMockStore(initialState);
    await act(async () => renderWithProvider(<Portfolio />, storeMock));

    expect(screen.getByTestId('shares-count')).toHaveTextContent(
      initialState.portfolio.portfolio.length.toString(),
    );
  });

  it('should show how much money is invested', async () => {
    const storeMock = createMockStore(initialState);
    await act(async () => renderWithProvider(<Portfolio />, storeMock));

    const totalInvested = initialState.portfolio.portfolio.reduce(
      (prev, share) => prev + share.quantity * share.buyPrice,
      0,
    );
    expect(screen.getByTestId('total-invested')).toHaveTextContent(
      totalInvested.toString(),
    );
  });

  it('should show how much money the porfolio is worth', async () => {
    //TODO: The original business logic would make sense to be implemented not like this
    const storeMock = createMockStore(initialState);
    await act(async () => renderWithProvider(<Portfolio />, storeMock));

    const totalValue = Object.entries(priceListMock).reduce(
      (prev, listItem) =>
        prev +
        listItem[1] *
          (initialState.portfolio.portfolio.find(
            share => share.trackData.id === listItem[0],
          )?.quantity ?? 0),
      0,
    );
    expect(screen.getByTestId('total-value')).toHaveTextContent(
      totalValue.toString(),
    );
  });

  it('should show empty state', () => {
    const storeMock = createMockStore();
    renderWithProvider(<Portfolio />, storeMock);

    expect(screen.getByTestId('total-invested')).toHaveTextContent('0');
    expect(screen.getByTestId('total-value')).toHaveTextContent('0');
    expect(screen.getByTestId('shares-count')).toHaveTextContent('0');
  });
  it('should not render delta if delta is 0', async () => {
    const initialStateZeroDelta: ReturnType<typeof reducer> = {
      ...initialState,
      portfolio: {
        ...initialState.portfolio,
        portfolio: [
          {
            ...shareMock,
            quantity: 2,
            buyPrice: 23,
          },
          {
            ...shareMock2,
            quantity: 2,
            buyPrice: 12,
          },
        ],
      },
    };
    const storeMock = createMockStore(initialStateZeroDelta);
    await act(async () => renderWithProvider(<Portfolio />, storeMock));
    expect(screen.getByTestId('total-delta')).not.toHaveTextContent(/.+/);
  });
  it('should render delta if delta is positive', async () => {
    const initialStateZeroDelta: ReturnType<typeof reducer> = {
      ...initialState,
      portfolio: {
        ...initialState.portfolio,
        portfolio: [
          {
            ...shareMock,
            quantity: 2,
            buyPrice: 555,
          },
          {
            ...shareMock2,
            quantity: 2,
            buyPrice: 555,
          },
        ],
      },
    };
    const storeMock = createMockStore(initialStateZeroDelta);
    await act(async () => renderWithProvider(<Portfolio />, storeMock));
    expect(screen.getByTestId('total-delta')).toHaveTextContent(
      /-\d+(\.\d{1,2})?% decrease/i,
    );
  });
  it('should render delta if delta is negative', async () => {
    const initialStateZeroDelta: ReturnType<typeof reducer> = {
      ...initialState,
      portfolio: {
        ...initialState.portfolio,
        portfolio: [
          {
            ...shareMock,
            quantity: 2,
            buyPrice: 1,
          },
          {
            ...shareMock2,
            quantity: 2,
            buyPrice: 1,
          },
        ],
      },
    };
    const storeMock = createMockStore(initialStateZeroDelta);
    await act(async () => renderWithProvider(<Portfolio />, storeMock));
    expect(screen.getByTestId('total-delta')).toHaveTextContent(
      /\d+(\.\d{1,2})?% growth/i,
    );
  });
  it('should display new list of shares when portfolio changes', async () => {
    const storeMock = createMockStore(initialState);
    await act(async () => {
      renderWithProvider(<Portfolio />, storeMock);
      storeMock.dispatch(
        buyShare({...trackMock, id: 'track-3', title: 'track-3'}, 21),
      );
    });
    await waitFor(() =>
      expect(screen.queryByText('track-3')).toBeInTheDocument(),
    );
    expect(screen.getByTestId('shares-count')).toHaveTextContent('3');

    const shareToSell = storeMock
      .getState()
      .portfolio.portfolio.find(x => x.trackData.id === 'track-3')!;
    await act(async () => {
      storeMock.dispatch(sellShare(shareToSell, 1, 21));
    });
    await waitFor(() =>
      expect(screen.queryByText('track-3')).not.toBeInTheDocument(),
    );
    expect(screen.getByTestId('shares-count')).toHaveTextContent('2');
  });
});
