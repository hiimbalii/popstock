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
    pageNumber: number;
    reset: boolean;
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

const getAndSaveTracks = (
  dispatch: Dispatch<TracksAction>,
  ...args: Parameters<typeof getTracks>
) => {
  return getTracks(...args).then(page => {
    dispatch({
      type: 'tracks/recieve',
      payload: {
        tracks: page.items,
        pageNumber: page.pageNumber,
        reset: args[2] === 0,
      },
    });
  });
};

export function searchTracks(filters: Filters) {
  return (dispatch: Dispatch<TracksAction>, getState: () => PopstockState) => {
    const authToken = selectAuthToken(getState());
    if (!authToken) return;
    dispatch({type: 'tracks/load'});
    dispatch({type: 'tracks/search', payload: {filters}});
    const allFilters = getState().tracks.catalogue.filters;
    getAndSaveTracks(dispatch, authToken, allFilters, 0);
  };
}
export const nextPage = () => {
  return (dispatch: Dispatch<TracksAction>, getState: () => PopstockState) => {
    const authToken = selectAuthToken(getState());
    if (!authToken) return;
    dispatch({type: 'tracks/load'});
    const filters = getState().tracks.catalogue.filters;
    const pageNumber = (getState().tracks.catalogue.pageNumber ?? 0) + 1;
    getAndSaveTracks(dispatch, authToken, filters, pageNumber);
  };
};
export const previousPage = () => {
  return (dispatch: Dispatch<TracksAction>, getState: () => PopstockState) => {
    const authToken = selectAuthToken(getState());
    if (!authToken) return;
    dispatch({type: 'tracks/load'});
    const filters = getState().tracks.catalogue.filters;
    const pageNumber = (getState().tracks.catalogue.pageNumber ?? 1) - 1;
    getAndSaveTracks(dispatch, authToken, filters, pageNumber);
  };
};
export function fetchTracks() {
  return (dispatch: Dispatch<TracksAction>, getState: () => PopstockState) => {
    const authToken = selectAuthToken(getState());
    if (!authToken) return;
    dispatch({type: 'tracks/load'});
    getAndSaveTracks(dispatch, authToken, null, 0);
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

    getAndSaveTracks(dispatch, authToken, filters, 0);
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
    getAndSaveTracks(dispatch, authToken, filters, 0);
  };
}
