import {TracksState, trackReducer} from './tracksReducer';
import {trackMock, trackMock2} from '../../common/utils/test-utils';

const createMockTracksState = (): TracksState => ({
  loadingState: 'idle',
  catalogue: {
    loadedTracks: [],
    searchTerm: '',
  },
});
describe('action: tracks/load', () => {
  it('should set `loadingState` to `loading`', () => {
    const reducedState = trackReducer(createMockTracksState(), {
      type: 'tracks/load',
      payload: {searchTerm: null},
    });
    expect(reducedState.loadingState).toBe('loading');
  });
});

describe('action: tracks/recieve', () => {
  it('should set `loadingState` to `success`', () => {
    const reducedState = trackReducer(createMockTracksState(), {
      type: 'tracks/recieve',
      payload: {tracks: []},
    });
    expect(reducedState.loadingState).toBe('success');
  });
  it('should set the loaded tracks to the list of tracks included in the payload', () => {
    const reducedState = trackReducer(createMockTracksState(), {
      type: 'tracks/recieve',
      payload: {tracks: [trackMock, trackMock2]},
    });
    expect(reducedState.catalogue.loadedTracks).toHaveLength(2);
    expect(reducedState.catalogue.loadedTracks).toEqual([
      trackMock,
      trackMock2,
    ]);
  });
});

describe('action: tracks/open', () => {
  it('should set the currently open track to the track supplied', () => {
    const reducedState = trackReducer(createMockTracksState(), {
      type: 'tracks/open',
      payload: {track: trackMock},
    });
    expect(reducedState.open).toEqual(trackMock);
  });
  it('should unset the currently open track if there is no track supplied', () => {
    const reducedState = trackReducer(createMockTracksState(), {
      type: 'tracks/open',
      payload: {track: null},
    });
    expect(reducedState.open).toBeFalsy();
  });
});
