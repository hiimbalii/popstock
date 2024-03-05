const getGenres = (auth_token: string): Promise<string[]> => {
  return (
    fetch('https://api.spotify.com/v1/recommendations/available-genre-seeds', {
      headers: {Authorization: `Bearer ${auth_token}`},
    })
      // eslint-disable-next-line @typescript-eslint/no-explicit-any
      .then(res => res.json() as any)
      .then(res => res.genres as string[])
  );
};
export default getGenres;
