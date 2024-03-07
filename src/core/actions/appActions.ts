import getGenres from '../../clients/genres';
import getUser from '../../clients/user_info';
import {getTokenFromParams, setAccessToken} from '../../common/utils/auth';
import {PopstockState} from '../store/store';
import {Dispatch} from 'redux';

type LoginAction = {
  type: 'app/login';
  payload: {
    token: string;
  };
};
type LoadDataAction = {
  type: 'app/loadData';
  payload: {
    name: string;
  };
};
type LogoutAction = {
  type: 'app/logout';
  payload: unknown;
};
type GenresLoadedAction = {
  type: 'app/loadGenres';
  payload: {
    genres: string[];
  };
};
export type AppAction =
  | LoginAction
  | LoadDataAction
  | LogoutAction
  | GenresLoadedAction;

export const login = (token: string): LoginAction => ({
  type: 'app/login',
  payload: {
    token,
  },
});
export const loadData =
  () => (dispatch: Dispatch<AppAction>, store: () => PopstockState) => {
    const {
      app: {access_token},
    } = store();
    if (!access_token) return;
    getUser(access_token).then(authToken => {
      if (!authToken) {
        dispatch({type: 'app/logout', payload: undefined});
        return;
      }
      const {display_name} = authToken;
      dispatch({type: 'app/loadData', payload: {name: display_name}});
    });
    getGenres(access_token).then(genres =>
      dispatch({type: 'app/loadGenres', payload: {genres}}),
    );
  };
export const tryParseTokenFromUrl = () => (dispatch: Dispatch<AppAction>) => {
  try {
    getTokenFromParams().then(token => {
      if (token) {
        dispatch(login(token));
        setAccessToken(token);
      }
    });
  } catch (e) {
    console.error(e);
  }
};
