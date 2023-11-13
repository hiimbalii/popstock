import Portfolio from './portfolio';
import {
  createMockStore,
  renderWithProvider,
  shareMock,
  shareMock2,
} from '../../common/utils/test-utils';
import {reducer} from '../../core/store/store';
import {screen} from '@testing-library/react';
/// Criterias
/// * should render empty state when no shares are added
/// [TBA] * should render error when shares or prices can not be loaded
/// * Should render contents of portfolio
/// * should render sum of original prices
/// * should render count of shares owned
/// * Should get current prices from api
/// * should render sum of share values
/// * should render delta

jest.mock('nanoid', () => {
  () => 1;
});
describe('<Portfolio />', () => {
  const initialState: ReturnType<typeof reducer> = {
    portfolio: {
      wallet: 1000,
      portfolio: [shareMock, shareMock2],
    },
    tracks: {
      loadingState: 'idle',
      catalogue: {searchTerm: '', loadedTracks: []},
    },
  };

  it('should render everything in the porfolio', () => {
    const storeMock = createMockStore(initialState);
    renderWithProvider(<Portfolio />, storeMock);

    initialState.portfolio.portfolio.forEach(track => {
      expect(screen.getByText(track.trackData.title)).toBeInTheDocument();
    });
  });

  it('should show how many shares are owned', () => {
    const storeMock = createMockStore(initialState);
    renderWithProvider(<Portfolio />, storeMock);

    expect(screen.getByTestId('shares-count')).toHaveTextContent(
      initialState.portfolio.portfolio.length.toString(),
    );
  });

  it('should show how much money is invested', () => {
    const storeMock = createMockStore(initialState);
    renderWithProvider(<Portfolio />, storeMock);

    const totalInvested = initialState.portfolio.portfolio.reduce(
      (prev, share) => prev + share.quantity * share.buyPrice,
      0,
    );
    expect(screen.getByTestId('total-invested')).toHaveTextContent(
      totalInvested.toString(),
    );
  });
  it('show empty state', () => {
    const storeMock = createMockStore();
    renderWithProvider(<Portfolio />, storeMock);

    expect(screen.getByTestId('total-invested')).toHaveTextContent('0');
    expect(screen.getByTestId('total-value')).toHaveTextContent('0');
    expect(screen.getByTestId('shares-count')).toHaveTextContent('0');
  });
});
