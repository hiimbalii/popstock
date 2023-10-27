import { AppState } from "./songsStore";

export const selectShares = (state: AppState) => state.portfolio.portfolio;

export const selectWallet = (state: AppState) => state.portfolio.wallet;

export const selectTracks = (state: AppState) =>
  state.tracks.catalogue.loadedTracks;
export const selectLoadingState = (state: AppState) =>
  state.tracks.loadingState;
export const selectSearchTerm = (state: AppState) =>
  state.tracks.catalogue.searchTerm;
