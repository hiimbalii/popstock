import { useEffect, useRef } from "react";
import { useDispatch, useSelector } from "react-redux";
import {
  selectLoadingState,
  selectSearchTerm,
  selectTracks,
} from "../../shared/stores/selectors";
import { TracksAction, fetchTracks } from "../state/tracksActions";
import { ThunkDispatch } from "redux-thunk";
import { AppState } from "../../shared/stores/songsStore";

const getSongs = (
  auth_token: string,
  searchString: string | null
): Promise<RecommendationsResponse> => {
  if (!searchString)
    return fetch(
      "https://api.spotify.com/v1/recommendations?seed_genres=alternative",
      { headers: { Authorization: `Bearer ${auth_token}` } }
    ).then((res) => res.json() as unknown as RecommendationsResponse);

  throw new Error("search not yet implemented");
};

const useSongsList = (authToken: string) => {
  const songs = useSelector(selectTracks);
  const status = useSelector(selectLoadingState);
  const searchTerm = useSelector(selectSearchTerm);

  const dispatch = useDispatch<ThunkDispatch<AppState, any, TracksAction>>();

  const prevSearchTerm = useRef<string | null>(null);
  useEffect(() => {
    if (!authToken) return;
    if (status === "idle" || prevSearchTerm.current !== searchTerm) {
      dispatch(fetchTracks(authToken, searchTerm));
    }
  }, [status, dispatch, searchTerm, authToken]);
  return { songs, status };
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
  id: string;
}
export interface RecommendationsResponse {
  tracks: SongResponse[];
}
