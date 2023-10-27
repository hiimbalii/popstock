import {Share} from '../../common/types/share';
import {TrackData} from '../../common/types/track';

interface BuyAction {
  type: 'buy';
  payload: {
    price: number;
    quantity: number;
    trackData: TrackData;
  };
}
interface SellAction {
  type: 'sell';
  payload: {
    shareId: string;
    quantity: number;
    sellPrice: number;
  };
}
export type PortfolioAction = BuyAction | SellAction;

export function sellShare(
  share: Share,
  price: number,
  quantity: number,
): SellAction {
  return {
    type: 'sell',
    payload: {
      shareId: share.shareId,
      sellPrice: price,
      quantity,
    },
  };
}

export function buyShare(track: TrackData, quantity: number): BuyAction {
  return {
    type: 'buy',
    payload: {
      trackData: track,
      price: track.popularity || 1,
      quantity,
    },
  };
}
