import {useDebounce} from './useDebounce';
import {selectSearchTerm} from '../../common/selectors/selectors';
import {searchTracks} from '../../core/actions/tracksActions';
import {AppAction} from '../../core/actions/appActions';
import {PopstockState} from '../../core/store/store';
import {useDispatch, useSelector} from 'react-redux';
import {ThunkDispatch} from 'redux-thunk';
export const useSearch = () => {
  const debouncedSearchTerm = useSelector(selectSearchTerm) ?? '';
  const dispatch =
    useDispatch<ThunkDispatch<PopstockState, unknown, AppAction>>();
  const dispatchSearch = (term: string) =>
    dispatch(searchTracks({searchTerm: term}));

  const [currentSearchTerm, runSearch] = useDebounce(
    debouncedSearchTerm,
    dispatchSearch,
  );

  return [
    currentSearchTerm,
    runSearch,
    currentSearchTerm !== debouncedSearchTerm,
  ] as const;
};
