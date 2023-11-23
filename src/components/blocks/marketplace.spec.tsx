import Marketplace from './markteplace';
import {
  createMockStore,
  renderWithProvider,
  trackMock,
  trackMock2,
} from '../../common/utils/test-utils';
import {reducer} from '../../core/store/store';
import * as useTracksModule from '../../common/hooks/useTracks';
import {screen} from '@testing-library/react';

/// Criteria:
/// * Should render a list of tracks
/// * Should render loading state
/// * should render error state

jest.mock('nanoid', () => ({
  nanoid: () => 1234,
}));
jest.mock('../../common/hooks/useAuth', () => () => 'auth_token');

describe('<Marketplace />', () => {
  const initialState: ReturnType<typeof reducer> = {
    portfolio: {
      wallet: 1000,
      portfolio: [],
    },
    tracks: {
      loadingState: 'idle',
      catalogue: {searchTerm: '', loadedTracks: []},
    },
  };
  it('should render loading state', () => {
    jest
      .spyOn(useTracksModule, 'useTrackList')
      .mockReturnValue({tracks: [], status: 'idle'}); // TODO: this particular piece of code is just chaos and it is waiting to be cleaned up
    const mockStore = createMockStore(initialState);
    renderWithProvider(<Marketplace />, mockStore);

    expect(screen.getByText(/loading/i)).toBeInTheDocument();
    expect(screen.queryByText(/error/i)).not.toBeInTheDocument();
    expect(screen.queryByText(/buy/i)).not.toBeInTheDocument();
  });
  it('should render error state', () => {
    jest
      .spyOn(useTracksModule, 'useTrackList')
      .mockReturnValue({tracks: [], status: 'rejected'}); // TODO: this particular piece of code is just chaos and it is waiting to be cleaned up
    const mockStore = createMockStore(initialState);
    renderWithProvider(<Marketplace />, mockStore);

    expect(screen.getByText(/error/i)).toBeInTheDocument();
    expect(screen.queryByText(/loading/i)).not.toBeInTheDocument();
    expect(screen.queryByText(/buy/i)).not.toBeInTheDocument();
  });
  it('should render a list of tracks', () => {
    jest.spyOn(useTracksModule, 'useTrackList').mockReturnValue({
      tracks: [trackMock, trackMock2],
      status: 'success',
    });
    const mockStore = createMockStore(initialState);
    renderWithProvider(<Marketplace />, mockStore);

    expect(screen.queryByText(/error/i)).not.toBeInTheDocument();
    expect(screen.queryByText(/loading/i)).not.toBeInTheDocument();
    expect(screen.getByText(trackMock.title)).toBeInTheDocument();
    expect(screen.getByText(trackMock2.title)).toBeInTheDocument();
  });
});
