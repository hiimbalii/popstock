import SellModal from './sell_modal';
import Button from './button';
import {Share} from '../../common/types/share';
import calculateDelta from '../../common/utils/calcDelta';

export interface ShareDetailsProps {
  share: Share;
  currentPrice: number;
}

export default function ShareDetails({share, currentPrice}: ShareDetailsProps) {
  const delta = calculateDelta(share.buyPrice, currentPrice);
  return (
    <div className='h-auto w-full hover:bg-gray-500 rounded-md px-2 py-1 flex flex-row items-center'>
      <img
        className='w-20 h-20'
        aria-hidden
        alt='album cover art'
        src={share.trackData.albumCoverUrl}
      />
      <div className='ml-2 flex flex-col w-full'>
        <p className='text-white text-md'>{share.trackData.title}</p>
        <p className='text-white text-xs'>
          {share.trackData.albumName} - {share.trackData.artist}
        </p>
        <p className='text-white text-xs mt-1'>
          Bought <strong data-testid='share-qty'>{share.quantity}</strong>{' '}
          shares for <strong data-testid='buy-price'>{share.buyPrice}</strong>{' '}
          points{' '}
        </p>{' '}
        <p className='text-white text-xs'>
          Current price:{' '}
          <strong data-testid='sell-price'>
            {currentPrice}
            {!!delta && (
              <span
                data-testid='delta'
                className={`${
                  delta > 0 ? 'text-green-600' : 'text-red-600'
                } ml-1`}>
                ({delta > 0 ? '+' : null}
                {delta}%)
              </span>
            )}
          </strong>
        </p>
      </div>
      <div className='flex flex-col gap-0'>
        <Button color='primary' disabled>
          Open
        </Button>
        <SellModal currentPrice={currentPrice} share={share} />
      </div>
    </div>
  );
}
