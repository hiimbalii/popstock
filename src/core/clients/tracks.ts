import {
  selectLoadingState,
  selectSearchTerm,
  selectTracks,
} from '../store/selectors';
import {TracksAction, fetchTracks} from '../actions/tracksActions';
import {AppState} from '../store/store';
import {useEffect, useRef} from 'react';
import {useDispatch, useSelector} from 'react-redux';
import {ThunkDispatch} from 'redux-thunk';

const getTracks = (
  auth_token: string,
  searchString: string | null,
): Promise<RecommendationsResponse> => {
  if (!searchString)
    return fetch(
      'https://api.spotify.com/v1/recommendations?seed_genres=alternative',
      {headers: {Authorization: `Bearer ${auth_token}`}},
    ).then(res => res.json() as unknown as RecommendationsResponse);

  throw new Error('search not yet implemented');
};

const useTrackList = (authToken: string) => {
  const tracks = useSelector(selectTracks);
  const status = useSelector(selectLoadingState);
  const searchTerm = useSelector(selectSearchTerm);

  const dispatch =
    useDispatch<ThunkDispatch<AppState, unknown, TracksAction>>();

  const prevSearchTerm = useRef<string | null>(null);
  useEffect(() => {
    if (!authToken) return;
    if (status === 'idle' || prevSearchTerm.current !== searchTerm) {
      dispatch(fetchTracks(authToken, searchTerm));
    }
  }, [status, dispatch, searchTerm, authToken]);
  return {tracks, status};
};
export {getTracks, useTrackList};

export interface TrackResponse {
  album: {
    name: string;
    images: {url: string}[];
    release_date: string;
  };
  artists: {name: string}[];
  name: string;
  popularity: number;
  id: string;
}
export interface RecommendationsResponse {
  tracks: TrackResponse[];
}
