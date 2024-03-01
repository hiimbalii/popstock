import {TrackData} from '../../common/types/track';
import getTracks from '../../clients/tracks';
import {Tag} from '../../common/types/filters';
import {Dispatch} from 'redux';

interface LoadTracksAction {
  type: 'tracks/load';
}
interface RecieveTracksAction {
  type: 'tracks/recieve';
  payload: {
    tracks: TrackData[];
  };
}
interface OpenTrackAction {
  type: 'tracks/open';
  payload: {
    track: TrackData | null;
  };
}
export type TracksAction =
  | LoadTracksAction
  | RecieveTracksAction
  | OpenTrackAction;

export function fetchTracks(authToken: string) {
  return (dispatch: Dispatch<TracksAction>) => {
    dispatch({type: 'tracks/load'});
    getTracks(authToken, null).then(tracks => {
      dispatch({
        type: 'tracks/recieve',
        payload: {tracks},
      });
    });
  };
}

export function openTrack(track: TrackData): OpenTrackAction {
  return {
    type: 'tracks/open',
    payload: {
      track,
    },
  };
}

export function closeTrack(): OpenTrackAction {
  return {
    type: 'tracks/open',
    payload: {
      track: null,
    },
  };
}
