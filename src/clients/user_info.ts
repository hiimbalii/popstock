const getUser = (auth_token: string): Promise<{display_name: string}> => {
  return fetch('https://api.spotify.com/v1/me', {
    headers: {Authorization: `Bearer ${auth_token}`},
  }).then(res => res && (res.json() as unknown as {display_name: string}));
};
export default getUser;
