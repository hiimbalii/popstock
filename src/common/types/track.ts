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
    items: TrackResponse[];
  };
}

export function mapTrackResponse(res: TrackResponse): TrackData {
  return {
    id: res.id,
    title: res.name,
    popularity: res.popularity || 1,
    albumName: res.album.name,
    albumCoverUrl: res.album.images[0]?.url ?? '',
    artist: res.artists.map(a => a.name).join(', '),
    date: res.album.release_date,
  };
}
export function mapSearchResponse(res: SearchResponse): TrackData[] {
  return res?.tracks?.items?.map(mapTrackResponse) ?? [];
}
export function mapRecommendationResponse(
  res: RecommendationsResponse,
): TrackData[] {
  return res?.tracks?.map(mapTrackResponse) ?? [];
}
