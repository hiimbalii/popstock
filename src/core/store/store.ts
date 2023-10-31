import {trackReducer, TracksState} from './tracksReducer';
import {portfolioReducer, PortfolioState} from './portfolioReducer';
import {
  CombinedState,
  applyMiddleware,
  combineReducers,
  createStore,
} from 'redux';
import thunkMiddleware from 'redux-thunk';

const store = createStore(
  combineReducers({portfolio: portfolioReducer, tracks: trackReducer}),
  applyMiddleware(thunkMiddleware),
);
store.subscribe(() => {
  const state = store.getState();
  localStorage.setItem('wallet', JSON.stringify(state.portfolio.wallet));
  localStorage.setItem('portfolio', JSON.stringify(state.portfolio.portfolio));
});

export {store};
export type AppState = CombinedState<{
  portfolio: PortfolioState;
  tracks: TracksState;
}>;
