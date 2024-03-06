import Button from './button';
import Modal from './modal';
import {TrackData} from '../../common/types/track';
import {PortfolioAction, buyShare} from '../../core/actions/portfolioActions';
import {selectWallet} from '../../common/selectors/selectors';
import {ChangeEventHandler, useId, useState} from 'react';
import {useDispatch, useSelector} from 'react-redux';
import {Dispatch} from 'redux';
import * as Dialog from '@radix-ui/react-dialog';

interface BuyModalProps {
  track: TrackData;
}

export default function BuyModal({track}: BuyModalProps) {
  const [selectedAmmount, setSelectedAmmount] = useState(1);
  const dispatch = useDispatch<Dispatch<PortfolioAction>>();
  const {
    albumCoverUrl: imageUrl,
    artist,
    albumName: album,
    title,
    popularity,
  } = track;
  const wallet = useSelector(selectWallet);
  const amountId = useId();

  const handleInput: ChangeEventHandler<HTMLInputElement> = ev => {
    const value = parseInt(ev.target.value);
    if (Number.isNaN(value)) return; //better way probs?
    if (value <= 0) return;
    setSelectedAmmount(parseInt(ev.target.value));
  };
  const handleBuy = () => {
    if (diff > 0) {
      //more elegant way
      return;
    }
    dispatch(buyShare(track, selectedAmmount));
  };

  const price = popularity || 1;
  const diff = selectedAmmount * price - wallet;

  return (
    <Modal title='Buy share' openButton={<Button color='primary'>Buy</Button>}>
      <div className='flex-grow gap-1 flex flex-col'>
        <div className='flex flex-row items-center py-2'>
          <img
            className='w-16 h-16'
            aria-hidden
            alt='album cover art'
            src={imageUrl}
          />
          <div className='ml-2'>
            <p>{title}</p>
            <small>
              {artist} - {album}
            </small>
          </div>
        </div>
        <div className='flex flex-row justify-end gap-3'>
          <div className='flex flex-col'>
            {/* TODO: lil ugly */}
            <label htmlFor={amountId} className='text-xs'>
              Amount to buy
            </label>
            <input
              className='ring-1 p-1 py-0 flex-grow'
              type='number'
              onChange={handleInput}
              value={selectedAmmount}
              id={amountId}
            />
          </div>
          <Dialog.Close asChild>
            <Button
              color='primary'
              onClick={handleBuy}
              disabled={diff > 0}
              fullWidth>
              Buy shares
            </Button>
          </Dialog.Close>
        </div>
        <div className='flex flex-row justify-between'>
          <span>
            Total cost:{' '}
            <strong data-testid='total-cost'>{selectedAmmount * price}</strong>
          </span>
          <span>
            Wallet: <strong data-testid='wallet'>{wallet}</strong>
          </span>
        </div>
        {diff > 0 && (
          <span className='text-red-500'>
            You are missing <strong data-testid='too-much'>{diff}</strong>{' '}
            points
          </span>
        )}
      </div>
      <div className='flex flex-row self-end'>
        <Dialog.Close asChild>
          <Button>Close</Button>
        </Dialog.Close>
      </div>
    </Modal>
  );
}
