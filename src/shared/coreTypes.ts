export interface Share {
  shareId: string;
  quantity: number;
  buyPrice: number;
  trackData: TrackData;
}
export interface TrackData {
  songId: string;
  imageUrl: string;
  artist: string;
  album: string;
  title: string;
  year: string;
  popularity: number;
}
