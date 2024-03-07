import {clearAccessToken} from '../common/utils/auth';

const getUser = (
  auth_token: string,
): Promise<{display_name: string} | null> => {
  return fetch('https://api.spotify.com/v1/me', {
    headers: {Authorization: `Bearer ${auth_token}`},
  })
    .then(res => {
      if (!res.ok) {
        clearAccessToken();
        return null;
      }
      return res;
    })
    .then(res =>
      res ? (res.json() as unknown as {display_name: string}) : null,
    );
};
export default getUser;
