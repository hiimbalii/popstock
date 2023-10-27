import {
  RecommendationsResponse,
  TrackData,
  mapRecommendationResponse,
} from '../../common/types/track';

const getTracks = (
  auth_token: string,
  searchString: string | null,
): Promise<TrackData[]> => {
  if (!searchString)
    return fetch(
      'https://api.spotify.com/v1/recommendations?seed_genres=alternative',
      {headers: {Authorization: `Bearer ${auth_token}`}},
    )
      .then(res => res.json() as unknown as RecommendationsResponse)
      .then(mapRecommendationResponse);

  throw new Error('search not yet implemented');
};
export default getTracks;
