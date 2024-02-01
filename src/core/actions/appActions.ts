import {getTokenFromParams} from '../../common/utils/auth';
import {Dispatch} from 'redux';

type LoginAction = {
  type: 'app/login';
  payload: {
    token: string;
  };
};
export type AppAction = LoginAction;

export const login = (token: string): LoginAction => ({
  type: 'app/login',
  payload: {
    token,
  },
});
export const tryParseTokenFromUrl = () => (dispatch: Dispatch<AppAction>) => {
  getTokenFromParams().then(token => {
    if (token) {
      dispatch(login(token));
    }
  });
};
