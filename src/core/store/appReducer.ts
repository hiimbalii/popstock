import {AppAction} from '../actions/appActions';
import {getAccessToken} from '../../common/utils/auth';
import {Reducer} from 'redux';

export interface AppState {
  access_token: string | null;
  name: string | null;
  genres?: string[];
  logout?: boolean;
}
const createInitialState = (): AppState => {
  const storedToken = getAccessToken();
  return {
    access_token: storedToken ?? null,
    name: null,
    genres: [],
    logout: false,
  };
};
export const appReducer: Reducer<AppState, AppAction> = (
  state: AppState = createInitialState(),
  {type, payload}: AppAction,
) => {
  if (type === 'app/login')
    return {...state, access_token: payload.token, logout: false};
  if (type === 'app/loadData') return {...state, name: payload.name};
  if (type === 'app/logout')
    return {
      ...state,
      access_token: null,
      name: null,
      logout: payload.showReason,
    };
  if (type === 'app/loadGenres') return {...state, genres: payload.genres};
  return state;
};
