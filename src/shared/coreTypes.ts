export interface Share {
  shareId: string;
  quantity: number;
  buyPrice: number;
  trackData: TrackData;
}
export interface TrackData {
  id: string;
  albumCoverUrl: string;
  artist: string;
  album: string;
  title: string;
  date: string;
  popularity: number;
}
