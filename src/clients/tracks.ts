import {Filters} from '../common/types/filters';
import {
  RecommendationsResponse,
  TrackData,
  mapRecommendationResponse,
} from '../common/types/track';

const getTracks = (
  auth_token: string,
  filters: Filters | null,
): Promise<TrackData[]> => {
  return fetch(
    'https://api.spotify.com/v1/recommendations?seed_genres=alternative',
    {headers: {Authorization: `Bearer ${auth_token}`}},
  )
    .then(res => res.json() as unknown as RecommendationsResponse)
    .then(mapRecommendationResponse);
};
export default getTracks;
