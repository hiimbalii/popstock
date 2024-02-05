import {appReducer} from './appReducer';
import {AppAction} from '../actions/appActions';

//mock getAccessToken
jest.mock('../../common/utils/auth', () => ({
  __esModule: true,
  getAccessToken: jest.fn(),
}));

describe('appReducer', () => {
  const initalState = {
    access_token: null,
    name: null,
  };
  //test for app/login
  it('should set access_token on app/login', () => {
    const action = {
      type: 'app/login',
      payload: {
        token: '123',
      },
    } as AppAction;
    const newState = appReducer(initalState, action);
    expect(newState.access_token).toBe('123');
    expect(newState.name).toBe(null);
  });

  it('should set name on app/loadData', () => {
    const action = {
      type: 'app/loadData',
      payload: {
        name: 'test',
      },
    } as AppAction;
    const newState = appReducer(initalState, action);
    expect(newState.name).toBe('test');
    expect(newState.access_token).toBe(null);
  });

  it('should return the same state if action is not recognized', () => {
    const action = {
      type: 'app/unknown',
      payload: {
        name: 'test',
      },
    } as unknown as AppAction;
    const newState = appReducer(initalState, action);
    expect(newState).toEqual(initalState);
  });
});
