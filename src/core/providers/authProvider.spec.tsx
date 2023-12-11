import AuthProvider, {AuthContext} from './authProvider';
import {renderProviderAndGetContext} from '../../common/utils/test-utils';
import getAuthToken from '../../clients/auth_client';
import {act} from 'react-dom/test-utils';
import {waitFor} from '@testing-library/react';

jest.mock('../../clients/auth_client', () => jest.fn());

const mockGetAuthToken = getAuthToken as jest.MockedFunction<
  typeof getAuthToken
>;
describe('<AuthProvider />', () => {
  beforeEach(() => jest.resetAllMocks());
  it('should provide empty string before getting token', () => {
    mockGetAuthToken.mockImplementation(() => new Promise(() => {}));
    const {result} = renderProviderAndGetContext(AuthContext, ({children}) => (
      <AuthProvider>{children}</AuthProvider>
    ));
    expect(result.current).toBe('');
  });
  it('should provide token when promise resolves', async () => {
    let result: ReturnType<typeof renderProviderAndGetContext> | null = null;
    await act(() => {
      mockGetAuthToken.mockImplementation(() =>
        Promise.resolve(new Response(JSON.stringify({access_token: 'auth'}))),
      );
      result = renderProviderAndGetContext(AuthContext, ({children}) => (
        <AuthProvider>{children}</AuthProvider>
      ));
    });

    await waitFor(() => expect(result?.result.current).toBe('auth'));
  });
  it.todo('should handle errors');
});
