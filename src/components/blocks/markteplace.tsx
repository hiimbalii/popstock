import Search from './search';
import TrackSummary from '../partials/track';
import {useTrackList} from '../../common/hooks/useTracks';
import {selectAuthToken} from '../../common/selectors/selectors';
import {useInfiniteScroll} from '../../common/hooks/useInfiniteScroll';
import {useSelector} from 'react-redux';
import {useMemo, useRef} from 'react';

export default function Marketplace() {
  const {tracks: tracksRes, status} = useTrackList();
  const tracks = tracksRes.filter(t => t.id.length);
  const auth_token = useSelector(selectAuthToken);
  const emptyLoadingState = status === 'loading' && !tracks?.length;

  const loadNextRef = useRef<HTMLDivElement>(null);
  useInfiniteScroll(() => console.log('fetch next'), loadNextRef);

  const trackList = useMemo(
    () =>
      tracks?.map((track, i) =>
        i === tracks.length - 2 ? (
          <TrackSummary key={track.id} {...track} ref={loadNextRef} />
        ) : (
          <TrackSummary key={track.id} {...track} />
        ),
      ),
    [tracks],
  );
  const Inner = () => {
    if (status === 'rejected')
      return (
        <p className='text-lg text-white'>
          Oh no! We seemed to have encountered an error
        </p>
      );

    if (status === 'idle' || emptyLoadingState)
      return <p className='text-lg text-white'>Loading...</p>;
    if (status === 'success' || (status === 'loading' && !emptyLoadingState))
      return !tracks.length ? (
        <p className='text-lg text-white'>No songs found</p>
      ) : (
        trackList
      );
  };
  return (
    <div className='px-2 w-full h-full overflow-x-scroll'>
      <Search />
      <div className='overflow-x-scroll my-1'>
        {auth_token ? (
          <Inner />
        ) : (
          <span className='text-white'>Log in to see tracks!!!</span>
        )}
      </div>
    </div>
  );
}
