import ShareDetails from '../partials/share';
import {getTrackPrices} from '../../clients/get_track_prices';
import calculateDelta from '../../common/utils/calcDelta';
import {selectShares} from '../../common/selectors/selectors';
import Tile, {TileTitle} from '../partials/tile';
import useAuth from '../../common/hooks/useAuth';
import {useEffect, useState} from 'react';
import {useSelector} from 'react-redux';

export default function Portfolio() {
  const shares = useSelector(selectShares);

  const authToken = useAuth();
  const [priceList, setPriceList] = useState<{[key: string]: number}>({});

  useEffect(() => {
    if (!authToken) return;
    const listOfIds = shares.map(share => share.trackData.id);
    if (!listOfIds.length) return;
    getTrackPrices(authToken, listOfIds).then(prices => setPriceList(prices));
  }, [shares, authToken]);

  const totalValue = shares.reduce(
    (prev, curr) => prev + priceList[curr.trackData.id] * curr.quantity,
    0,
  );

  const totalInvested = shares.reduce(
    (prev, curr) => prev + curr.buyPrice * curr.quantity,
    0,
  );

  const totalDelta = calculateDelta(totalInvested, totalValue);
  return (
    <Tile className='flex-grow flex flex-col h-5/6'>
      <TileTitle>Portfolio</TileTitle>
      <div className='overflow-auto flex-grow flex flex-col gap-1'>
        {shares.map(share => (
          <ShareDetails
            key={share.shareId}
            share={share}
            currentPrice={priceList[share.trackData.id] ?? 0}
          />
        ))}
      </div>
      <div className='flex justify-between mt-1'>
        <span>
          <strong data-testid='shares-count'>{shares.length}</strong>{' '}
          <small>shares</small>
        </span>
        <span>
          <strong data-testid='total-value'>
            {Number.isNaN(totalValue) ? 0 : totalValue}
          </strong>{' '}
          <small>
            in value (
            <strong data-testid='total-invested'>{totalInvested}</strong>{' '}
            invested{' '}
            <span data-testid='total-delta'>
              {totalDelta !== 0 &&
                !Number.isNaN(totalDelta) &&
                `${totalDelta}% ${totalDelta > 0 ? 'growth' : 'decrease'}`}
            </span>
            )
          </small>
        </span>
      </div>
    </Tile>
  );
}
