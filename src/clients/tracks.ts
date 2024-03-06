import {Filters, Tag, TagWithUrl} from '../common/types/filters';
import {
  TrackData,
  mapRecommendationResponse,
  mapSearchResponse,
} from '../common/types/track';

const getTracks = (
  auth_token: string,
  filters: Filters | null,
): Promise<TrackData[]> => {
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

export const mapBasedOnFilters = (filters: Filters | null) => {
  const tagWithUrl = filters?.tags?.find(tag => 'url' in tag && tag.url);
  if (tagWithUrl) return (tagWithUrl as TagWithUrl).mapper;
  if (filters?.searchTerm || filters?.tags?.length) {
    return mapSearchResponse;
  }
  return mapRecommendationResponse;
};

function createUrlFromFilters(filters: Filters | null): string {
  const tagWithUrl = filters?.tags?.find(tag => 'url' in tag && tag.url);
  if (tagWithUrl) return (tagWithUrl as TagWithUrl).url;
  if (filters?.searchTerm || filters?.tags?.length) {
    return `https://api.spotify.com/v1/search?q=${makeQueryString(
      filters.searchTerm,
      filters.tags,
    )}&type=track`;
  }
  return 'https://api.spotify.com/v1/recommendations?seed_genres=alternative';
}
export function makeQueryString(
  searchTerm: string | null | undefined,
  tags: Tag[] | undefined,
): string {
  const search = searchTerm || '';
  const tagsStr = tags?.length ? tags.map(tag => tag.id).join(' ') : '';
  const concated = [search, tagsStr].filter(Boolean).join(' ');
  // eslint-disable-next-line quotes
  return encodeURIComponent(concated).replace("'", '%27');
}
