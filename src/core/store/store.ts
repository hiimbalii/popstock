import {
  CombinedState,
  applyMiddleware,
  combineReducers,
  createStore,
} from "redux";
import thunkMiddleware from "redux-thunk";
import { trackReducer, TracksState } from "./tracksReducer";
import { portfolioReducer, PortfolioState } from "./portfolioReducer";

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
