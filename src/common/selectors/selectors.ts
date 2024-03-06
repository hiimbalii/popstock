import {PopstockState} from '../../core/store/store';
import {NormalTag, Tag} from '../types/filters';
import {getConstantTags} from '../utils/tags';

export const selectShares = (state: PopstockState) => state.portfolio.portfolio;

export const selectWallet = (state: PopstockState) => state.portfolio.wallet;

export const selectTracks = (state: PopstockState) =>
  state.tracks.catalogue.loadedTracks;
export const selectLoadingState = (state: PopstockState) =>
  state.tracks.loadingState;
export const selectSearchTerm = (state: PopstockState) =>
  state.tracks.catalogue.filters?.searchTerm;
export const selectFilters = (state: PopstockState): [Tag[], Tag[]] => {
  const selected = state.tracks.catalogue.filters?.tags ?? [];
  const allFilters = [
    ...getConstantTags(),
    ...(state.app.genres ?? []).map(
      genre =>
        ({
          id: `genre:${genre}`,
          displayName: genre,
          category: 'genre',
        }) as NormalTag,
    ),
  ];
  return [
    selected,
    allFilters.filter(({id}) => !selected.find(({id: sid}) => id === sid)),
  ];
};
export const selectAuthToken = (state: PopstockState) => state.app.access_token;
export const selectName = (state: PopstockState) => state.app.name;
