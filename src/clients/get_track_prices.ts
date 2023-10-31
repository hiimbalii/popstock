const getTrackPrices = (
  auth_token: string,
  ids: string[],
): Promise<{[key: string]: number}> => {
  if (!ids || !ids.length) Promise.reject();
  const urlIds = encodeURIComponent(ids.join(','));
  return fetch(`https://api.spotify.com/v1/tracks?ids=${urlIds}`, {
    headers: {Authorization: `Bearer ${auth_token}`},
  })
    .then(
      res =>
        res.json() as unknown as {
          tracks: {id: string; popularity: number}[];
        },
    )
    .then(res =>
      Object.fromEntries(res.tracks?.map(t => [t.id, t.popularity || 1]) ?? []),
    );
};

export {getTrackPrices};
