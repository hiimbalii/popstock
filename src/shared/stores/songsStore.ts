import { createStore } from "redux";
import { SongResponse } from "../../marketplace/clients/songs";

export interface SongStoreState {
  wallet: number;
  songs: SongResponse[];
}
export interface SongStoreAction {
  type: "buy" | "sell";
  payload: { id: string; price: number };
}
const initialState: SongStoreState = {
  wallet: JSON.parse(localStorage.getItem("wallet") || "1000"),
  songs: JSON.parse(localStorage.getItem("portfolio") || "[]"),
};
const songStoreReducer = (state = initialState, action: SongStoreAction) => {
  return state;
};
const songsStore = createStore(songStoreReducer);
export { songsStore };
