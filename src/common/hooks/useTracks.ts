import {
  selectTracks,
  selectLoadingState,
  selectSearchTerm,
} from '../selectors/selectors';
import {AppState} from '../../core/store/store';
import {TracksAction, fetchTracks} from '../../core/actions/tracksActions';
import {useRef, useEffect} from 'react';
import {useSelector, useDispatch} from 'react-redux';
import {ThunkDispatch} from 'redux-thunk';

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
export {useTrackList};
