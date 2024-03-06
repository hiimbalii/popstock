import {useTrackList} from './useTracks';
import {
  createMockStore,
  renderHookWithProvider,
  trackMock,
} from '../utils/test-utils';
import * as trackActions from '../../core/actions/tracksActions';

jest.mock('nanoid', () => ({
  nanoid: () => 1,
}));

describe('useTrackList', () => {
  beforeEach(() => jest.resetAllMocks());
  it('should start fetching data if the current state is idle', () => {
    const fetchSpy = jest.fn();
    const actionSpy = jest
      .spyOn(trackActions, 'fetchTracks')
      .mockReturnValue(fetchSpy);
    const store = createMockStore({
      portfolio: {portfolio: [], wallet: 0},
      app: {access_token: 'auth', name: 'auth'},
      tracks: {
        loadingState: 'idle',
        catalogue: {
          loadedTracks: [],
          filters: null,
        },
      },
    });
    renderHookWithProvider(() => useTrackList(), store);

    expect(actionSpy).toBeCalled();
    expect(fetchSpy).toBeCalled();
  });
  it('should return a load state and an empty list of tracks after fetching', () => {
    const fetchSpy = jest.fn();
    jest.spyOn(trackActions, 'fetchTracks').mockReturnValue(fetchSpy);

    const store = createMockStore({
      portfolio: {portfolio: [], wallet: 0},
      app: {access_token: '', name: ''},
      tracks: {
        loadingState: 'loading',
        catalogue: {
          loadedTracks: [],
          filters: null,
        },
      },
    });
    const {result} = renderHookWithProvider(() => useTrackList(), store);

    expect(result.current).toEqual({status: 'loading', tracks: []});
  });
  it('should return an error state and empty list of tracks if the request got rejected', () => {
    const fetchSpy = jest.fn();
    jest.spyOn(trackActions, 'fetchTracks').mockReturnValue(fetchSpy);

    const store = createMockStore({
      portfolio: {portfolio: [], wallet: 0},
      app: {access_token: '', name: ''},
      tracks: {
        loadingState: 'rejected',
        catalogue: {
          loadedTracks: [],
          filters: null,
        },
      },
    });
    const {result} = renderHookWithProvider(() => useTrackList(), store);

    expect(result.current).toEqual({status: 'rejected', tracks: []});
  });
  it('should return a success state and a list of fetched tracks if the request got a response', () => {
    const fetchSpy = jest.fn();
    jest.spyOn(trackActions, 'fetchTracks').mockReturnValue(fetchSpy);

    const store = createMockStore({
      portfolio: {portfolio: [], wallet: 0},
      app: {access_token: '', name: ''},
      tracks: {
        loadingState: 'success',
        catalogue: {
          loadedTracks: [trackMock],
          filters: null,
        },
      },
    });
    const {result} = renderHookWithProvider(() => useTrackList(), store);

    expect(result.current).toEqual({status: 'success', tracks: [trackMock]});
  });
});
