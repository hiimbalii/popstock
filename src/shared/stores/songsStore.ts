import { createStore } from "redux";
import { SongResponse } from "../../marketplace/clients/songs";
import { act } from "react-dom/test-utils";
import { nanoid } from "nanoid";

export interface Share {
  shareId: string;
  songId: string;
  quantity: number;
  buyPrice: number;
  name: string;
  subtitle: string;
  albumCover: string;
}
export interface SongStoreState {
  wallet: number;
  portfolio: Share[];
}
interface SongStoreBuyAction {
  type: "buy";
  payload: {
    id: string;
    price: number;
    quantity: number;
    songInfo: { name: string; subtitle: string; albumCover: string };
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
export type SongStoreAction = SongStoreBuyAction | SongStoreSellAction;

const initialState: SongStoreState = {
  wallet: JSON.parse(localStorage.getItem("wallet") || "1000"),
  portfolio: JSON.parse(localStorage.getItem("portfolio") || "[]"),
};
const songStoreReducer = (state = initialState, action: SongStoreAction) => {
  if (action.type === "buy") {
    const grandSum = action.payload.price * action.payload.quantity;
    if (state.wallet < grandSum) return state;
    return {
      ...state,
      portfolio: [
        {
          ...action.payload.songInfo,
          shareId: nanoid(),
          songId: action.payload.id,
          buyPrice: action.payload.price,
          quantity: action.payload.quantity,
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
const songsStore = createStore(songStoreReducer);
songsStore.subscribe(() => {
  const state = songsStore.getState();
  localStorage.setItem("wallet", JSON.stringify(state.wallet));
  localStorage.setItem("portfolio", JSON.stringify(state.portfolio));
  localStorage.removeItem("songs");
});
export { songsStore };
