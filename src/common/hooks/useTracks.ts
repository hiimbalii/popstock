import {
  selectTracks,
  selectLoadingState,
  selectAuthToken,
} from '../selectors/selectors';
import {PopstockState} from '../../core/store/store';
import {
  TracksAction,
  fetchTracks,
  // fetchTracks
} from '../../core/actions/tracksActions';
import {useEffect} from 'react';
import {useSelector, useDispatch} from 'react-redux';
import {ThunkDispatch} from 'redux-thunk';

const useTrackList = () => {
  const tracks = useSelector(selectTracks);
  const status = useSelector(selectLoadingState);
  const authToken = useSelector(selectAuthToken);

  const dispatch =
    useDispatch<ThunkDispatch<PopstockState, unknown, TracksAction>>();

  useEffect(() => {
    if (!authToken) return;
    if (!tracks.length && status === 'idle') {
      dispatch(fetchTracks());
    }
  }, [status, dispatch, authToken, tracks]);
  return {tracks, status};
};
export {useTrackList};
