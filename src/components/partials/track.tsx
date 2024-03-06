import BuyModal from './buy_modal';
import Tile from './tile';
import {TrackData} from '../../common/types/track';

export default function TrackSummary(props: TrackData) {
  const {
    albumCoverUrl: imageUrl,
    artist,
    albumName,
    title,
    date: year,
    popularity,
  } = props;
  const price = popularity || 1;
  return (
    <Tile className='h-auto w-full mb-2'>
      <div className='h-full p-1 flex '>
        <img
          className='w-24 h-24'
          aria-hidden
          alt='album cover art'
          src={imageUrl}
        />
        <div className='ml-3  h-full flex-grow flex flex-col'>
          <h3 className='text-2xl'>{title}</h3>
          <p className='text-sm'>
            {artist} - {albumName}
          </p>
          <span className='text-sm mt-2'>{year}</span>
        </div>
        <div className='flex flex-col'>
          <p data-testid='price'>Price per share: {price}</p>
          {/* <Button color='primary' disabled>
            Open
          </Button> */}
          <BuyModal track={props} />
        </div>
      </div>
    </Tile>
  );
}
