import {login, tryParseTokenFromUrl} from './appActions';
import {getTokenFromParams, setAccessToken} from '../../common/utils/auth';

jest.mock('../../clients/user_info', () => ({
  __esModule: true,
  default: jest.fn(),
}));
jest.mock('../../common/utils/auth', () => ({
  __esModule: true,
  getTokenFromParams: jest.fn(),
  setAccessToken: jest.fn(),
}));
const getTokenFromParamsMock = getTokenFromParams as jest.MockedFunction<
  typeof getTokenFromParams
>;
const setAccessTokenMock = setAccessToken as jest.MockedFunction<
  typeof setAccessToken
>;

describe('login', () => {
  it('should return login action', () => {
    const action = login('123');
    expect(action).toEqual({
      type: 'app/login',
      payload: {
        token: '123',
      },
    });
  });
});

describe('tryParseTokenFromUrl', () => {
  it('should dispatch login action and set token if getTokenFromParams is successful and returns a token', async () => {
    const dispatch = jest.fn();
    getTokenFromParamsMock.mockResolvedValue('123');
    await tryParseTokenFromUrl()(dispatch);
    expect(dispatch).toHaveBeenCalledWith(login('123'));
    expect(setAccessTokenMock).toHaveBeenCalledWith('123');
  });
  it('should not dispatch login action if getTokenFromParams returns undefined', async () => {
    const dispatch = jest.fn();
    getTokenFromParamsMock.mockResolvedValue(undefined);
    await tryParseTokenFromUrl()(dispatch);
    expect(dispatch).not.toHaveBeenCalled();
  });
  it('should not dispatch login action if getTokenFromParams throws an error', async () => {
    const dispatch = jest.fn();
    getTokenFromParamsMock.mockRejectedValue('error');
    await tryParseTokenFromUrl()(dispatch);
    expect(dispatch).not.toHaveBeenCalled();
  });
});
