export interface TrackData {
  id: string;
  albumCoverUrl: string;
  artist: string;
  albumName: string;
  title: string;
  date: string;
  popularity: number;
}

export interface TrackResponse {
  album: {
    name: string;
    images: {url: string}[];
    release_date: string;
  };
  artists: {name: string}[];
  name: string;
  popularity: number;
  id: string;
}
export interface RecommendationsResponse {
  tracks: TrackResponse[];
}
export interface SearchResponse {
  tracks: {
    offset: number;
    limit: number;
    items: TrackResponse[];
  };
}

export function mapTrackResponse(res: TrackResponse): TrackData {
  if (!res)
    return {
      id: '',
      title: '',
      popularity: 1,
      albumName: '',
      albumCoverUrl: '',
      artist: '',
      date: '',
    };
  return {
    id: res.id ?? '',
    title: res.name ?? '',
    popularity: res.popularity || 1,
    albumName: res.album?.name ?? '',
    albumCoverUrl: res.album?.images[0]?.url ?? '',
    artist: res.artists?.map(a => a?.name)?.join(', ') ?? '',
    date: res.album?.release_date ?? '',
  };
}
export function mapSearchResponse(response: unknown): Page {
  const res = response as SearchResponse;
  return {
    items: res?.tracks?.items?.map(mapTrackResponse) ?? [],
    pageNumber: res?.tracks?.offset / res?.tracks.limit ?? 0,
  };
}
export function mapRecommendationResponse(response: unknown): Page {
  const res = response as RecommendationsResponse;
  // page number does not matter on recommendations
  return {items: res?.tracks?.map(mapTrackResponse) ?? [], pageNumber: 0};
}
export type Page = {
  items: TrackData[];
  pageNumber: number;
};
