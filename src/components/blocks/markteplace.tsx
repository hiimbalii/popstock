import Search from './search';
import TrackSummary from '../partials/track';
import {useTrackList} from '../../common/hooks/useTracks';
import {selectAuthToken} from '../../common/selectors/selectors';
import {useSelector} from 'react-redux';

export default function Marketplace() {
  const {tracks, status} = useTrackList();
  const auth_token = useSelector(selectAuthToken);

  const Inner = () => {
    if (status === 'rejected')
      return (
        <p className='text-lg text-white'>
          Oh no! We seemed to have encountered an error
        </p>
      );

    if (status === 'idle')
      return <p className='text-lg text-white'>Loading...</p>;
    if (status === 'success')
      return !tracks.length ? (
        <p className='text-lg text-white'>No songs found</p>
      ) : (
        tracks?.map(track => (
          <TrackSummary key={track.id} {...track}></TrackSummary>
        ))
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
