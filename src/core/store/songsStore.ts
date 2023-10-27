import {
  CombinedState,
  applyMiddleware,
  combineReducers,
  createStore,
} from "redux";
import {
  PortfolioStoreState as PortfolioState,
  portfolioReducer,
} from "../../inventory/state/portfolioReducer";
import {
  TracksState,
  trackReducer,
} from "../../marketplace/state/tracksReducer";
import thunkMiddleware from "redux-thunk";

const songsStore = createStore(
  combineReducers({ portfolio: portfolioReducer, tracks: trackReducer }),
  applyMiddleware(thunkMiddleware)
);
songsStore.subscribe(() => {
  const state = songsStore.getState();
  localStorage.setItem("wallet", JSON.stringify(state.portfolio.wallet));
  localStorage.setItem("portfolio", JSON.stringify(state.portfolio.portfolio));
});
export { songsStore };
export type AppState = CombinedState<{
  portfolio: PortfolioState;
  tracks: TracksState;
}>;
