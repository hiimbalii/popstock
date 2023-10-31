import {TrackData} from './track';

export interface Share {
  shareId: string;
  quantity: number;
  buyPrice: number;
  trackData: TrackData;
}
