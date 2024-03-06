import {TracksAction} from '../actions/tracksActions';
import {TrackData} from '../../common/types/track';
import {Filters} from '../../common/types/filters';
import {Reducer} from 'redux';

export interface TracksState {
  loadingState: 'idle' | 'rejected' | 'success' | 'loading';
  catalogue: {
    loadedTracks: TrackData[];
    filters: Filters | null;
  };
  open?: TrackData | null;
}
export const trackReducer: Reducer<TracksState, TracksAction> = (
  state: TracksState = {
    loadingState: 'idle',
    catalogue: {loadedTracks: [], filters: null},
    open: null,
  },
  action: TracksAction,
) => {
  switch (action.type) {
    case 'tracks/load':
      return {...state, loadingState: 'loading'};
    case 'tracks/recieve':
      return {
        ...state,
        loadingState: 'success',
        catalogue: {...state.catalogue, loadedTracks: action.payload.tracks},
      };
    case 'tracks/open':
      return {...state, open: action.payload.track};
    case 'tracks/search':
      return {
        ...state,
        catalogue: {
          ...state.catalogue,
          filters: action.payload.filters
            ? {...state.catalogue.filters, ...action.payload.filters}
            : null,
        },
      };
    case 'tracks/removeFilter':
      return {
        ...state,
        catalogue: {
          ...state.catalogue,
          filters: {
            ...state.catalogue.filters,
            tags: state.catalogue.filters?.tags?.filter(
              ({id}) => id !== action.payload.id,
            ),
          },
        },
      };
    case 'tracks/addFilter':
      return {
        ...state,
        catalogue: {
          ...state.catalogue,
          filters: {
            ...state.catalogue.filters,
            tags: [
              ...(action.payload.tag.url
                ? []
                : state.catalogue.filters?.tags?.filter(({url}) => !url) ?? []),
              action.payload.tag,
            ],
          },
        },
      };
    default:
      return state;
  }
};
