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
  return fetch(createUrlFromFilters(filters), {
    headers: {Authorization: `Bearer ${auth_token}`},
  })
    .then(res => res.json() as unknown as RecommendationsResponse)
    .then(mapRecommendationResponse);
};
export default getTracks;

export function createUrlFromFilters(filters: Filters | null): string {
  if (filters?.searchTerm)
    return `https://api.spotify.com/v1/search?q=${encodeURIComponent(
      filters.searchTerm,
    )}&type=track`;
  return 'https://api.spotify.com/v1/recommendations?seed_genres=alternative';
}
