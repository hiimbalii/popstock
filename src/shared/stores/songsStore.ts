import { CombinedState, combineReducers, createStore } from "redux";
import {
  PortfolioStoreState as PortfolioState,
  portfolioReducer,
} from "./portfolioReducer";
import { TracksState, trackReducer } from "./tracksReducer";

const songsStore = createStore(
  combineReducers({ portfolio: portfolioReducer, tracks: trackReducer })
);
songsStore.subscribe(() => {
  const state = songsStore.getState();
  localStorage.setItem("wallet", JSON.stringify(state.portfolio.wallet));
  localStorage.setItem("portfolio", JSON.stringify(state.portfolio));
});
export { songsStore };
export type AppState = CombinedState<{
  portfolio: PortfolioState;
  tracks: TracksState;
}>;
