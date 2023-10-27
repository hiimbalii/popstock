import TrackSummary from '../partials/track';
import {AuthContext} from '../../core/providers/authProvider';
import {useTrackList} from '../../common/hooks/useTracks';
import {useContext} from 'react';

export default function Marketplace() {
  const authToken = useContext<string>(AuthContext);
  const {tracks, status} = useTrackList(authToken);

  const Inner = () => {
    if (status === 'rejected') return;
    <p className='text-lg text-white'>
      Oh no! We seemed to have encountered an error
    </p>;

    if (status === 'idle')
      return <p className='text-lg text-white'>Loading...</p>;
    if (status === 'success')
      return tracks.length === 0 ? (
        <p className='text-lg text-white'>No songs found</p>
      ) : (
        tracks.map(track => (
          <TrackSummary key={track.id} {...track}></TrackSummary>
        ))
      );
  };
  return (
    <div className='px-2 w-full h-full overflow-x-scroll'>
      <Inner />
    </div>
  );
}
