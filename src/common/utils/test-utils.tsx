import {store as appStore, reducer as appReducer} from '../../core/store/store';
import {TrackData} from '../types/track';
import {Share} from '../types/share';
import {render} from '@testing-library/react';
import {Provider} from 'react-redux';
import {Store, applyMiddleware, createStore} from 'redux';
import thunkMiddleware from 'redux-thunk';

export function createMockStore(initialState?: ReturnType<typeof appReducer>) {
  return createStore(
    appReducer,
    initialState,
    applyMiddleware(thunkMiddleware),
  );
}
export function renderWithProvider(
  el: React.ReactElement,
  store: Store = appStore,
) {
  return render(<Provider store={store}>{el}</Provider>);
}

export const trackMock: TrackData = {
  title: 'song-title',
  id: 'song-1',
  albumCoverUrl: 'cover-img',
  artist: 'artist-name',
  albumName: 'album-name',
  date: 'date',
  popularity: 7,
};

export const shareMock: Share = {
  shareId: 'test-share-1',
  quantity: 444,
  buyPrice: 1237,
  trackData: {...trackMock},
};
