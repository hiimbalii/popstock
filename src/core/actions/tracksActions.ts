import {TrackData} from '../../common/types/track';
import getTracks from '../../clients/tracks';
import {Filters, Tag} from '../../common/types/filters';
import {PopstockState} from '../store/store';
import {selectAuthToken} from '../../common/selectors/selectors';
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
interface AddTagAction {
  type: 'tracks/addFilter';
  payload: {
    tag: Tag;
  };
}
interface RemoveTagAction {
  type: 'tracks/removeFilter';
  payload: {
    id: string;
  };
}
interface SearchAction {
  type: 'tracks/search';
  payload: {
    filters: Filters | null;
  };
}
export type TracksAction =
  | LoadTracksAction
  | RecieveTracksAction
  | OpenTrackAction
  | SearchAction
  | AddTagAction
  | RemoveTagAction;

export function searchTracks(filters: Filters) {
  return (dispatch: Dispatch<TracksAction>, getState: () => PopstockState) => {
    const authToken = selectAuthToken(getState());
    if (!authToken) return;
    dispatch({type: 'tracks/load'});
    dispatch({type: 'tracks/search', payload: {filters}});
    const allFilters = getState().tracks.catalogue.filters;
    getTracks(authToken, allFilters).then(tracks => {
      dispatch({
        type: 'tracks/recieve',
        payload: {tracks},
      });
    });
  };
}
export function fetchTracks() {
  return (dispatch: Dispatch<TracksAction>, getState: () => PopstockState) => {
    const authToken = selectAuthToken(getState());
    if (!authToken) return;
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
export function addTag(tag: Tag) {
  return (dispatch: Dispatch<TracksAction>, getState: () => PopstockState) => {
    const authToken = selectAuthToken(getState());
    if (!authToken) return;
    dispatch({type: 'tracks/load'});
    dispatch({
      type: 'tracks/addFilter',
      payload: {
        tag,
      },
    });
    const filters = getState().tracks.catalogue.filters;
    getTracks(authToken, filters).then(tracks => {
      dispatch({
        type: 'tracks/recieve',
        payload: {tracks},
      });
    });
  };
}
export function removeTag(id: string) {
  return (dispatch: Dispatch<TracksAction>, getState: () => PopstockState) => {
    const authToken = selectAuthToken(getState());
    if (!authToken) return;
    dispatch({type: 'tracks/load'});
    dispatch({
      type: 'tracks/removeFilter',
      payload: {
        id,
      },
    });
    const filters = getState().tracks.catalogue.filters;
    getTracks(authToken, filters).then(tracks => {
      dispatch({
        type: 'tracks/recieve',
        payload: {tracks},
      });
    });
  };
}
