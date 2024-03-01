import getTracks, {createUrlFromFilters} from './tracks';
import {buildServer} from '../common/utils/test-utils';
const {server, expectedResponse} = buildServer();

describe.skip('getTracks', () => {
  beforeAll(() => server.listen());
  afterEach(() => server.resetHandlers());
  afterAll(() => server.close());

  it('should get a list of tracks', async () => {
    const res = await getTracks('auth_token', null);
    expect(res).toBe(expectedResponse);
  });
});

describe('createUrlFromFilters', () => {
  it('should return default url if filters are null', () => {
    expect(createUrlFromFilters(null)).toBe(
      'https://api.spotify.com/v1/recommendations?seed_genres=alternative',
    );
  });
  it('should return a search url if the search term is set', () => {
    expect(createUrlFromFilters({searchTerm: 'frog,bunny'})).toBe(
      'https://api.spotify.com/v1/search?q=frog%2Cbunny&type=track',
    );
  });
});
