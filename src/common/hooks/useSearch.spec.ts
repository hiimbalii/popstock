import {useSearch} from './useSearch';
import {createMockStore, renderHookWithProvider} from '../utils/test-utils';
import {act} from '@testing-library/react';

jest.mock('nanoid', () => ({
  nanoid: () => 1,
}));

describe('useSearch', () => {
  beforeEach(() => {
    jest.resetAllMocks();
    jest.useFakeTimers();
  });
  it('should have the initial value should come from redux (empty)', () => {
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
    const {
      result: {
        // eslint-disable-next-line @typescript-eslint/no-unused-vars
        current: [value, _, dirty],
      },
    } = renderHookWithProvider(() => useSearch(), store);
    expect(value).toBe('');
    expect(dirty).toBe(false);
  });
  it('should have the initial value should come from redux (value set)', () => {
    const store = createMockStore({
      portfolio: {portfolio: [], wallet: 0},
      app: {access_token: 'auth', name: 'auth'},
      tracks: {
        loadingState: 'idle',
        catalogue: {
          loadedTracks: [],
          filters: {searchTerm: 'term'},
        },
      },
    });
    const {
      result: {
        // eslint-disable-next-line @typescript-eslint/no-unused-vars
        current: [value, _, dirty],
      },
    } = renderHookWithProvider(() => useSearch(), store);
    expect(value).toBe('term');
    expect(dirty).toBe(false);
  });

  it('should dispatch a search action after debounce time', async () => {
    const store = createMockStore({
      portfolio: {portfolio: [], wallet: 0},
      app: {access_token: 'auth', name: 'auth'},
      tracks: {
        loadingState: 'idle',
        catalogue: {
          loadedTracks: [],
          filters: {searchTerm: 'term'},
        },
      },
    });
    const {result} = renderHookWithProvider(() => useSearch(), store);
    const search = result.current[1];
    await act(() => search('searchTerm'));
    jest.runAllTimers();

    expect(store.getState().tracks.catalogue.filters?.searchTerm).toBe(
      'searchTerm',
    );
  });
  it('should return the not debounced value', async () => {
    const store = createMockStore({
      portfolio: {portfolio: [], wallet: 0},
      app: {access_token: 'auth', name: 'auth'},
      tracks: {
        loadingState: 'idle',
        catalogue: {
          loadedTracks: [],
          filters: {searchTerm: 'term'},
        },
      },
    });
    const {result} = renderHookWithProvider(() => useSearch(), store);
    const search = result.current[1];
    await act(() => search('test'));

    expect(result.current[0]).toBe('test');
  });
  it('should set the dirty flag on search', async () => {
    const store = createMockStore({
      portfolio: {portfolio: [], wallet: 0},
      app: {access_token: 'auth', name: 'auth'},
      tracks: {
        loadingState: 'idle',
        catalogue: {
          loadedTracks: [],
          filters: {searchTerm: 'term'},
        },
      },
    });
    const {result} = renderHookWithProvider(() => useSearch(), store);
    const search = result.current[1];
    await act(() => search('test'));

    expect(result.current[2]).toBe(true);
  });
  it('should set the dirty flag on search', async () => {
    const store = createMockStore({
      portfolio: {portfolio: [], wallet: 0},
      app: {access_token: 'auth', name: 'auth'},
      tracks: {
        loadingState: 'idle',
        catalogue: {
          loadedTracks: [],
          filters: {searchTerm: 'term'},
        },
      },
    });
    const {result} = renderHookWithProvider(() => useSearch(), store);
    const search = result.current[1];
    await act(() => search('test'));
    jest.runAllTimers();

    expect(result.current[2]).toBe(true);
  });
});
