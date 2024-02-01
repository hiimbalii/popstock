import {
  selectTracks,
  selectLoadingState,
  selectSearchTerm,
  selectAuthToken,
} from '../selectors/selectors';
import {PopstockState} from '../../core/store/store';
import {TracksAction, fetchTracks} from '../../core/actions/tracksActions';
import {useRef, useEffect} from 'react';
import {useSelector, useDispatch} from 'react-redux';
import {ThunkDispatch} from 'redux-thunk';

const useTrackList = () => {
  const tracks = useSelector(selectTracks);
  const status = useSelector(selectLoadingState);
  const searchTerm = useSelector(selectSearchTerm);
  const authToken = useSelector(selectAuthToken);

  const dispatch =
    useDispatch<ThunkDispatch<PopstockState, unknown, TracksAction>>();

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
