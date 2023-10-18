import { nanoid } from "nanoid";
import { Reducer } from "redux";
import { Share, TrackData } from "../coreTypes";

export interface PortfolioStoreState {
  wallet: number;
  portfolio: Share[];
}
interface SongStoreBuyAction {
  type: "buy";
  payload: {
    id: string;
    price: number;
    quantity: number;
    trackData: TrackData;
  };
}
interface SongStoreSellAction {
  type: "sell";
  payload: {
    shareId: string;
    quantity: number;
    sellPrice: number;
  };
}
export type PortfolioAction = SongStoreBuyAction | SongStoreSellAction;

const createInitialState = (): PortfolioStoreState => {
  return {
    wallet: JSON.parse(localStorage.getItem("wallet") || "1000"),
    portfolio: JSON.parse(localStorage.getItem("portfolio") || "[]"),
  };
};

export const portfolioReducer: Reducer<PortfolioStoreState, PortfolioAction> = (
  state: PortfolioStoreState = createInitialState(),
  action: PortfolioAction
) => {
  if (action.type === "buy") {
    const grandSum = action.payload.price * action.payload.quantity;
    if (state.wallet < grandSum) return state;
    // it would be more elegant if its the same song for the same price it'd stack
    return {
      ...state,
      portfolio: [
        {
          shareId: nanoid(),
          songId: action.payload.id,
          buyPrice: action.payload.price,
          quantity: action.payload.quantity,
          trackData: action.payload.trackData,
        },
        ...state.portfolio,
      ],
      wallet: state.wallet - grandSum,
    };
  } else if (action.type === "sell") {
    return {
      ...state,
      portfolio: state.portfolio
        .map((share) => {
          if (share.shareId !== action.payload.shareId) return share;
          share.quantity -= action.payload.quantity;
          return share;
        })
        .filter((share) => share.quantity > 0),
      wallet: state.wallet + action.payload.sellPrice * action.payload.quantity,
    };
  }
  return state;
};
