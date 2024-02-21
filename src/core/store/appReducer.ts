import {AppAction} from '../actions/appActions';
import {getAccessToken} from '../../common/utils/auth';
import {Reducer} from 'redux';

export interface AppState {
  access_token: string | null;
  name: string | null;
}
const createInitialState = (): AppState => {
  const storedToken = getAccessToken();
  return {
    access_token: storedToken ?? null,
    name: null,
  };
};
export const appReducer: Reducer<AppState, AppAction> = (
  state: AppState = createInitialState(),
  {type, payload}: AppAction,
) => {
  if (type === 'app/login') return {...state, access_token: payload.token};
  if (type === 'app/loadData') return {...state, name: payload.name};
  return state;
};
