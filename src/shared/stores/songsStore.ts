import { createStore } from "redux";
import { SongResponse } from "../../marketplace/clients/songs";
import { act } from "react-dom/test-utils";

export interface Share {
  songId: string;
  quantity: number;
  buyPrice: number;
  name?: string;
  subtitle?: string;
  albumCover?: string;
}
export interface SongStoreState {
  wallet: number;
  portfolio: Share[];
}
export interface SongStoreAction {
  type: "buy" | "sell";
  payload: {
    id: string;
    price: number;
    quantiy: number;
    songInfo?: { name?: string; subtitle?: string; albumCover?: string };
  };
}
const initialState: SongStoreState = {
  wallet: JSON.parse(localStorage.getItem("wallet") || "1000"),
  portfolio: JSON.parse(localStorage.getItem("portfolio") || "[]"),
};
const songStoreReducer = (state = initialState, action: SongStoreAction) => {
  if (action.type === "buy") {
    const grandSum = action.payload.price * action.payload.quantiy;
    if (state.wallet < grandSum) return state;
    return {
      ...state,
      portfolio: [
        {
          songId: action.payload.id,
          buyPrice: action.payload.price,
          quantity: action.payload.quantiy,
          ...action.payload.songInfo,
        },
        ...state.portfolio,
      ],
      wallet: state.wallet - grandSum,
    };
  }
  return state;
};
const songsStore = createStore(songStoreReducer);
songsStore.subscribe(() => {
  const state = songsStore.getState()
  localStorage.setItem('wallet', JSON.stringify(state.wallet))
  localStorage.setItem('portfolio', JSON.stringify(state.portfolio))
})
export { songsStore };
