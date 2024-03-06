/* eslint-disable @typescript-eslint/no-explicit-any */
import {makeQueryString, mapBasedOnFilters} from './tracks';
import {Filters} from '../common/types/filters';
import {
  mapRecommendationResponse,
  mapSearchResponse,
} from '../common/types/track';

jest.mock('../common/types/track', () => ({
  mapRecommendationResponse: jest.fn(),
  mapSearchResponse: jest.fn(),
}));
const mockMapRecommendationResponse =
  mapRecommendationResponse as jest.MockedFn<typeof mapRecommendationResponse>;
const mockMapSearchResponse = mapSearchResponse as jest.MockedFn<
  typeof mapSearchResponse
>;
describe('make query string', () => {
  it.each`
    searchTerm   | tag
    ${undefined} | ${undefined}
    ${null}      | ${undefined}
    ${''}        | ${undefined}
    ${undefined} | ${[]}
    ${null}      | ${[]}
    ${''}        | ${[]}
  `(
    'should return an empty string if there are no tags or searchTerm ($searchTerm, $tag)',
    ({searchTerm, tag}) => {
      expect(makeQueryString(searchTerm, tag)).toBe('');
    },
  );
  it('should return a query string with a search term', () => {
    // eslint-disable-next-line quotes
    expect(makeQueryString("What's my age again?", undefined)).toBe(
      'What%27s%20my%20age%20again%3F',
    );
  });
  it('should return the tags separated by space (%20)', () => {
    expect(
      makeQueryString(undefined, [
        {id: 'tag:new', displayName: 'new'} as any,
        {id: 'genre:alt-rock', displayName: 'alt-rock'} as any,
      ]),
    ).toBe('tag%3Anew%20genre%3Aalt-rock');
  });
  it('should return the search term and the tags separated by space (%20)', () => {
    expect(
      makeQueryString('Please please please', [
        {id: 'artist:deftones', displayName: ''} as any,
      ]),
    ).toBe('Please%20please%20please%20artist%3Adeftones');
  });
});

describe('mapBasedOnFilters', () => {
  it('should return the mapper from the tag with url', () => {
    const mockMapper = jest.fn();

    const filters: Filters = {
      tags: [
        {
          id: 'tag:new',
          displayName: 'new',
          url: 'https://api.spotify.com/v1/recommendations?seed_genres=alternative',
          mapper: mockMapper,
        },
        {
          id: 'genre:alt-rock',
          displayName: 'alt-rock',
        } as any,
      ],
      searchTerm: 'test',
    };
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    mapBasedOnFilters(filters)(null as any);
    expect(mockMapper).toHaveBeenCalled();
  });
  it('should return mapSearchResponse if there is a searchTerm or tags', () => {
    const filters: Filters = {
      tags: [
        {
          id: 'tag:new',
          displayName: 'new',
        } as any,
        {
          id: 'genre:alt-rock',
          displayName: 'alt-rock',
        } as any,
      ],
      searchTerm: 'test',
    };
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    mapBasedOnFilters(filters)(null as any);
    expect(mockMapSearchResponse).toHaveBeenCalled();
    expect(mockMapRecommendationResponse).not.toHaveBeenCalled();
  });
  it('should return mapRecommendationResponse if there are no filters', () => {
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    mapBasedOnFilters({})(null as any);
    expect(mockMapRecommendationResponse).toHaveBeenCalled();
    expect(mockMapSearchResponse).not.toHaveBeenCalled();
  });
});
