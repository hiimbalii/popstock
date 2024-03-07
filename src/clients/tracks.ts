import {Filters, Tag, TagWithUrl} from '../common/types/filters';
import {
  Page,
  mapRecommendationResponse,
  mapSearchResponse,
} from '../common/types/track';

const getTracks = (
  auth_token: string,
  filters: Filters | null,
  page: number,
): Promise<Page> => {
  return (
    fetch(paginate(createUrlFromFilters(filters), page), {
      headers: {Authorization: `Bearer ${auth_token}`},
    })
      // eslint-disable-next-line @typescript-eslint/no-explicit-any
      .then(res => res.json() as unknown)
      .then(addErrorHandler(mapBasedOnFilters(filters)))
  );
};
export default getTracks;

const addErrorHandler = (mapper: (response: unknown) => Page) => {
  return (response: unknown) => {
    try {
      return mapper(response);
    } catch (e) {
      console.error(e);
      return {items: [], pageNumber: 0};
    }
  };
};

export const mapBasedOnFilters = (
  filters: Filters | null,
): ((response: unknown) => Page) => {
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
export function paginate(url: string, page: number): string {
  if (url.includes('recently-played'))
    return page > 1 ? `${url}?before=${page}` : url;
  const concatSybol = url.includes('?') ? '&' : '?';
  return `${url}${concatSybol}offset=${page * 20}&limit=20`;
}
