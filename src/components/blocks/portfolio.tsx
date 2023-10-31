import ShareDetails from '../partials/share';
import {AuthContext} from '../../core/providers/authProvider';
import {getTrackPrices} from '../../clients/get_track_prices';
import calculateDelta from '../../common/utils/calcDelta';
import {selectShares} from '../../common/selectors/selectors';
import {useContext, useEffect, useState} from 'react';
import {useSelector} from 'react-redux';
import Tile, { TileTitle } from '../partials/tile';

export default function Portfolio() {
  const shares = useSelector(selectShares);

  const authToken = useContext<string>(AuthContext);
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
          {shares.length} <small>shares</small>
        </span>
        <span>
          {Number.isNaN(totalValue) ? 0 : totalValue}{' '}
          <small>
            in value (<strong>{totalInvested}</strong> invested{' '}
            {totalDelta !== 0 &&
              `${totalDelta}% ${totalDelta > 0 ? 'growth' : 'decrease'}`}
            )
          </small>
        </span>
      </div>
    </Tile>
  );
}
