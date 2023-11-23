import {
  RecommendationsResponse,
  TrackData,
  TrackResponse,
  mapRecommendationResponse,
  mapTrackResponse,
} from './track';

const trackResponse: TrackResponse = {
  album: {
    name: 'album-name',
    release_date: 'date',
    images: [
      {
        url: 'url',
      },
    ],
  },
  id: 'id',
  artists: [{name: 'artist-1'}],
  name: 'track-name',
  popularity: 4,
};
const track: TrackData = {
  albumName: 'album-name',
  id: 'id',
  albumCoverUrl: 'url',
  artist: 'artist-1',
  title: 'track-name',
  date: 'date',
  popularity: 4,
};
describe('mapTrackResponse()', () => {
  it('should produce a Track from a TrackResponse with accurate values', () => {
    expect(mapTrackResponse(trackResponse)).toEqual(track);
  });
  it('should concatinate artists', () => {
    const trackResponseWithArtists: TrackResponse = {
      ...trackResponse,
      artists: [...trackResponse.artists, {name: 'artist-2'}],
    };

    const result = mapTrackResponse(trackResponseWithArtists);
    expect(result.artist).toBe('artist-1, artist-2');
  });
  it('should not let popularity be zero', () => {
    const trackResponseWithArtists: TrackResponse = {
      ...trackResponse,
      popularity: 0,
    };

    const result = mapTrackResponse(trackResponseWithArtists);
    expect(result.popularity).toBe(1);
  });
});

describe('mapRecommendationResponse', () => {
  const recommendationResponse: RecommendationsResponse = {
    tracks: [trackResponse],
  };
  it('should produce an empty list from an empty response', () => {
    expect(mapRecommendationResponse({tracks: []})).toEqual([]);
  });
  it('should produce a correct list of tracks from a response', () => {
    expect(mapRecommendationResponse(recommendationResponse)).toEqual([track]);
  });
});
