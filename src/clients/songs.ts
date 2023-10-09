const getSongs = (auth_token: string): Promise<RecommendationsResponse> => {
  return fetch(
    "https://api.spotify.com/v1/recommendations?seed_genres=alternative",
    { headers: { Authorization: `Bearer ${auth_token}` } }
  ).then((res) => (res.json() as unknown) as RecommendationsResponse);
};
export {getSongs};

export interface SongResponse{
    album: {
        name: string,
        images: { url: string }[]
        release_date:string
    },
    artists: { name: string }[],
    name:string,
    popularity: number
}
export interface RecommendationsResponse{
 tracks: SongResponse[]
}