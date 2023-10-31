import {TrackData} from '../../common/types/track';
import getTracks from '../../clients/tracks';
import {Dispatch} from 'redux';

interface LoadTracksAction {
  type: 'tracks/load';
  payload: {
    searchTerm: string | null;
  };
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

export function fetchTracks(authToken: string, searchTerm: string | null) {
  return (dispatch: Dispatch<TracksAction>) => {
    dispatch({type: 'tracks/load', payload: {searchTerm}});
    getTracks(authToken, searchTerm).then(tracks => {
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
