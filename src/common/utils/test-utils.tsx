import {store as appStore, reducer as appReducer} from '../../core/store/store';
import {TrackData, TrackResponse} from '../types/track';
import {Share} from '../types/share';
import {render, renderHook} from '@testing-library/react';
import {Provider} from 'react-redux';
import {Store, applyMiddleware, createStore} from 'redux';
import thunkMiddleware from 'redux-thunk';
import {http} from 'msw';
import {SetupServer, setupServer} from 'msw/node';
import {useContext} from 'react';

export function createMockStore(initialState?: ReturnType<typeof appReducer>) {
  return createStore(
    appReducer,
    {app: {access_token: 'auth', name: 'auth'}, ...initialState},
    applyMiddleware(thunkMiddleware),
  );
}
const createProvider = (el: React.ReactNode, store: Store) => (
  <Provider store={store}>{el}</Provider>
);
export function renderWithProvider(
  el: React.ReactNode,
  store: Store = appStore,
) {
  return render(createProvider(el, store));
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

export const trackMock2: TrackData = {
  title: 'song-title-2',
  id: 'song-2',
  albumCoverUrl: 'cover-img-2',
  artist: 'artist-name-2',
  albumName: 'album-name-2',
  date: 'date-2',
  popularity: 77,
};

export const shareMock: Share = {
  shareId: 'test-share-1',
  quantity: 444,
  buyPrice: 1237,
  trackData: {...trackMock},
};

export const shareMock2: Share = {
  shareId: 'test-share-2',
  quantity: 23,
  buyPrice: 60,
  trackData: {...trackMock2},
};
const hookWrapper = (
  store: Store,
): React.JSXElementConstructor<{children: React.ReactNode}> => {
  return ({children}: {children: React.ReactNode}) =>
    createProvider(children, store);
};

export function renderHookWithProvider<T>(
  wrappedHook: (...params: unknown[]) => T,
  store: Store = appStore,
) {
  return renderHook(wrappedHook, {
    wrapper: hookWrapper(store),
  });
}
export function renderProviderAndGetContext<T>(
  context: React.Context<T>,
  wrapper: React.JSXElementConstructor<{children: React.ReactNode}>,
) {
  return renderHook(() => useContext(context), {wrapper});
}

const mockTrackResponse = (id: string): TrackResponse => ({
  album: {
    name: `album-name-${id}`,
    release_date: `date-${id}`,
    images: [
      {
        url: `url-${id}`,
      },
    ],
  },
  id: `id-${id}`,
  artists: [{name: `artist-1-${id}`}],
  name: `track-name-${id}`,
  popularity: 4,
});
const track = (id: string): TrackData => ({
  albumName: `album-name-${id}`,
  id: `id-${id}`,
  albumCoverUrl: `url-${id}`,
  artist: `artist-1-${id}`,
  title: `track-name-${id}`,
  date: `date-${id}`,
  popularity: 4,
});
export function buildServer(): {
  expectedResponse: TrackData[];
  server: SetupServer;
} {
  const handlers = [
    http.get(/.*recommend.*/, () => {
      return new Response(JSON.stringify({tracks: [mockTrackResponse('1')]}));
    }),
  ];
  const server = setupServer(...handlers);
  return {
    expectedResponse: [track('1')],
    server,
  };
}
