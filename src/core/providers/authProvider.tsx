import {
  getAccessToken,
  getTokenFromParams,
  startAuth,
} from '../../common/utils/auth';
import React, {useContext, useEffect, useState} from 'react';

const AuthContext = React.createContext<string>('');
export {AuthContext};

export interface AuthProviderProps {
  children: React.ReactNode;
}

// TODO: make this into API provider
// * wrap api calls
// * handle auth vs no auth
// * handle errors

export default function AuthProvider({children}: AuthProviderProps) {
  const [token, setToken] = useState('');

  useEffect(() => {
    getTokenFromParams();
    const storedToken = getAccessToken();
    if (storedToken) {
      setToken(storedToken);
      return;
    }
    startAuth();
    // getAuthToken()
    //   .then(res => (res.ok ? res.json() : ''))
    //   .then(t => setToken(t.access_token ?? ''));
  }, []);
  return <AuthContext.Provider value={token}>{children}</AuthContext.Provider>;
}
export const useAuth = () => useContext(AuthContext);
