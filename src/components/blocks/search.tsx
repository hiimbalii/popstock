import Tag from '../partials/tag';
import {useTrackList} from '../../common/hooks/useTracks';
import {useSearch} from '../../common/hooks/useSearch';
import {ChangeEventHandler, useId} from 'react';

export default function Search() {
  const inputId = useId();
  const [searchTerm, startSearch, isSearchDirty] = useSearch();
  const handleSearch: ChangeEventHandler<HTMLInputElement> = ev =>
    startSearch(ev.target.value);

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
