import { AppState } from "./songsStore";

const selectShares = (state: AppState) => state.portfolio.portfolio;

const selectWallet = (state: AppState) => state.portfolio.wallet;
export { selectShares, selectWallet };
