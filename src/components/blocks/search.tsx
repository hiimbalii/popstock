import Tag from '../partials/tag';
import {selectSearchTerm} from '../../common/selectors/selectors';
import {searchTracks} from '../../core/actions/tracksActions';
import {AppAction} from '../../core/actions/appActions';
import {PopstockState} from '../../core/store/store';
import {useDebounce} from '../../common/utils/debounce';
import {useTrackList} from '../../common/hooks/useTracks';
import {ChangeEventHandler, useId} from 'react';
import {useDispatch, useSelector} from 'react-redux';
import {ThunkDispatch} from 'redux-thunk';

const useSearch = () => {
  const searchTerm = useSelector(selectSearchTerm);
  const dispatch =
    useDispatch<ThunkDispatch<PopstockState, unknown, AppAction>>();
  const dispatchSearch = (term: string) =>
    dispatch(searchTracks({searchTerm: term}));

  const [inputSearchTerm, setInputSearchTerm] = useDebounce(
    searchTerm ?? '',
    dispatchSearch,
  );
  const handleChange: ChangeEventHandler<HTMLInputElement> = ev =>
    setInputSearchTerm(ev.target.value);
  return [
    inputSearchTerm,
    handleChange,
    inputSearchTerm !== searchTerm,
  ] as const;
};
export default function Search() {
  const inputId = useId();
  const [searchTerm, handleSearch, isSearchDirty] = useSearch();

  const {tracks, status} = useTrackList();
  const isBackgroundLoading = status === 'loading' && tracks.length;
  return (
    <div className='flex flex-col gap-2'>
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
      <div className='flex flew-row gap-2 '>
        <Tag onClick={() => alert(1)}>Sort</Tag>
        <div className='flex flew-row gap-1'>
          <Tag active>Tag 1</Tag>
          <Tag active>Tag 2</Tag>
        </div>
        <div className='flex flew-row gap-1'>
          <Tag>Tag 1</Tag>
          <Tag>Tag 2</Tag>
          <Tag>Tag 3</Tag>
          <Tag>Tag 4</Tag>
          <Tag>Tag 5</Tag>
          <Tag>Tag 6</Tag>
        </div>
      </div>
      {isBackgroundLoading || isSearchDirty ? (
        <p className='text-white text-sm'>Refreshing..</p>
      ) : null}
    </div>
  );
}
