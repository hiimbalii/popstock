import {useSearch} from './useSearch';
import {createMockStore, renderHookWithProvider} from '../utils/test-utils';

jest.mock('nanoid', () => ({
  nanoid: () => 1,
}));

describe('useSearch', () => {
  beforeEach(() => jest.resetAllMocks());
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

  it.todo('should dispatch a search action after debounce time');
  it.todo('should return the not debounced value');
  it.todo('should set the dirty flag on search');
  it.todo('should unset the dirty flag after debounce');
});
