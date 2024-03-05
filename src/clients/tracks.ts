import {Filters} from '../common/types/filters';
import {
  TrackData,
  mapRecommendationResponse,
  mapSearchResponse,
} from '../common/types/track';

const getTracks = (
  auth_token: string,
  filters: Filters | null,
): Promise<TrackData[]> => {
  console.trace(filters);
  return (
    fetch(createUrlFromFilters(filters), {
      headers: {Authorization: `Bearer ${auth_token}`},
    })
      // eslint-disable-next-line @typescript-eslint/no-explicit-any
      .then(res => res.json() as any)
      .then(mapBasedOnFilters(filters))
  );
};
export default getTracks;

const mapBasedOnFilters = (filters: Filters | null) =>
  filters?.searchTerm ? mapSearchResponse : mapRecommendationResponse;

export function createUrlFromFilters(filters: Filters | null): string {
  if (filters?.searchTerm)
    return `https://api.spotify.com/v1/search?q=${encodeURIComponent(
      filters.searchTerm,
    )}&type=track`;
  return 'https://api.spotify.com/v1/recommendations?seed_genres=alternative';
}
