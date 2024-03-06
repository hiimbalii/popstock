import Tag from '../partials/tag';
import {useTrackList} from '../../common/hooks/useTracks';
import {useSearch} from '../../common/hooks/useSearch';
import {selectFilters} from '../../common/selectors/selectors';
import {PopstockState} from '../../core/store/store';
import {
  TracksAction,
  addTag,
  removeTag,
} from '../../core/actions/tracksActions';
import {ChangeEventHandler, useId} from 'react';
import {useDispatch, useSelector} from 'react-redux';
import {ThunkDispatch} from 'redux-thunk';

export default function Search() {
  const inputId = useId();
  const [searchTerm, startSearch, isSearchDirty] = useSearch();
  const handleSearch: ChangeEventHandler<HTMLInputElement> = ev =>
    startSearch(ev.target.value);
  const dispatch =
    useDispatch<ThunkDispatch<PopstockState, unknown, TracksAction>>();
  const [selectedFilters, notSelectedFilters] = useSelector(selectFilters);

  const {tracks, status} = useTrackList();
  const isBackgroundLoading = status === 'loading' && tracks.length;

  // useEffect(() => {
  //   dispatch(searchTracks({tags: selectedFilters}, true));
  // }, [selectedFilters, dispatch]);

  return (
    <div className='flex flex-col gap-2 w-full mb-2'>
      <label htmlFor={inputId} className='text-white'>
        Search for your favourite songs
      </label>
      <input
        id={inputId}
        placeholder='Start typing the name of artist, album or track you are looking for!'
        className='w-full rounded-full bg-transparent p-2 text-white placeholder:text-gray border-white border '
        onChange={handleSearch}
        value={searchTerm}
      />
      <div className='flex flew-row gap-3  overflow-y-scroll'>
        <div className='flex flew-row gap-1'>
          {selectedFilters.map(tag => (
            <Tag
              key={tag.id}
              active
              onClick={() => dispatch(removeTag(tag.id))}
              primary={'url' in tag}>
              {tag.displayName}
            </Tag>
          ))}
        </div>
        <div className='flex flew-row gap-1'>
          {notSelectedFilters.map(tag => (
            <Tag
              key={tag.id}
              onClick={() => dispatch(addTag(tag))}
              primary={'url' in tag}>
              {tag.displayName}
            </Tag>
          ))}
        </div>
      </div>
      {isBackgroundLoading || isSearchDirty ? (
        <p className='text-white text-sm'>Refreshing..</p>
      ) : null}
    </div>
  );
}
