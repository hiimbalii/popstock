import {PopstockState} from '../../core/store/store';

export const selectShares = (state: PopstockState) => state.portfolio.portfolio;

export const selectWallet = (state: PopstockState) => state.portfolio.wallet;

export const selectTracks = (state: PopstockState) =>
  state.tracks.catalogue.loadedTracks;
export const selectLoadingState = (state: PopstockState) =>
  state.tracks.loadingState;
export const selectSearchTerm = (state: PopstockState) =>
  state.tracks.catalogue.filters?.searchTerm;
export const selectAuthToken = (state: PopstockState) => state.app.access_token;
export const selectName = (state: PopstockState) => state.app.name;
