import { useEffect, useState } from "react";

const getSongs = (auth_token: string, searchString?: string): Promise<RecommendationsResponse> => {
  if (!searchString) return fetch(
    "https://api.spotify.com/v1/recommendations?seed_genres=alternative",
    { headers: { Authorization: `Bearer ${auth_token}` } }
  ).then((res) => res.json() as unknown as RecommendationsResponse);

  throw new Error('search not yet implemented')
};

const useSongsList = (authToken: string, searchString?: string) => {
  const [isLoading, setIsLoading] = useState(false)
  const [songs, setSongs] = useState<SongResponse[]>([]);
  const [error, setError] = useState(false);
  const status: 'loading' | 'success' | 'error' = isLoading ? 'loading' : error ? 'error': 'success'
  const storedData = localStorage.getItem('songs');
  
  useEffect(() => {
    if (storedData&&!searchString) {
      setSongs(JSON.parse(storedData))
      return
    }
    if (searchString) {
      localStorage.removeItem('songs')
    }
    setIsLoading(true)
    if (authToken) {
      getSongs(authToken, searchString).then(
        (songs) => {
          setSongs(songs.tracks);
          setError(false);
          setIsLoading(false);
          localStorage.setItem('songs', JSON.stringify(songs.tracks))
        },
        (error) => { setError(true); setIsLoading(false) }
      );
    }
  }, [authToken, storedData, searchString]);
  return { songs, error, status };
};
export { getSongs, useSongsList };

export interface SongResponse {
  album: {
    name: string;
    images: { url: string }[];
    release_date: string;
  };
  artists: { name: string }[];
  name: string;
  popularity: number;
}
export interface RecommendationsResponse {
  tracks: SongResponse[];
}
