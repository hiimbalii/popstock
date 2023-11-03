import Button from './button';
import Modal from './modal';
import {Share} from '../../common/types/share';
import calculateDelta from '../../common/utils/calcDelta';
import {PortfolioAction, sellShare} from '../../core/actions/portfolioActions';
import * as Dialog from '@radix-ui/react-dialog';
import {ChangeEventHandler, useState} from 'react';
import {useDispatch} from 'react-redux';
import {Dispatch} from 'redux';
interface SellModalProps {
  share: Share;
  currentPrice: number;
}

export default function SellModal({share, currentPrice}: SellModalProps) {
  const [selectedAmmount, setSelectedAmmount] = useState(share.quantity);
  const dispatch = useDispatch<Dispatch<PortfolioAction>>();
  const handleInput: ChangeEventHandler<HTMLInputElement> = ev => {
    const value = parseInt(ev.target.value);
    if (Number.isNaN(value)) return; //better way probs?
    if (value > share.quantity || value < 0) return;
    setSelectedAmmount(parseInt(ev.target.value));
  };

  const handleSell = () => {
    const quantity = selectedAmmount === 0 ? share.quantity : selectedAmmount;
    dispatch(sellShare(share, currentPrice, quantity));
  };

  const handleOpen = () => {
    if (selectedAmmount > share.quantity) setSelectedAmmount(share.quantity);
  };

  const profit = (selectedAmmount || share.quantity) * currentPrice;
  const delta = calculateDelta(share.buyPrice, currentPrice);
  const bgColor =
    delta === 0 ? 'bg-yellow-500' : delta > 0 ? 'bg-green-500' : 'bg-red-500';
  return (
    <Modal
      title='Sell share'
      openButton={<Button onClick={handleOpen}>Sell</Button>}>
      <div className='flex-grow gap-1 flex flex-col'>
        <div className='flex flex-row items-center py-2'>
          <img
            className='w-16 h-16'
            aria-hidden
            alt='album cover art'
            src={share.trackData.albumCoverUrl}
          />
          <div className='ml-2'>
            <p>{share.trackData.title}</p>
            <small>
              {share.trackData.artist} - {share.trackData.albumName}
            </small>
          </div>
        </div>
        <div className='flex flex-row'>
          <div className='w-1/2 bg-gray-400 mr-1 px-2 py-1 rounded-md'>
            <small>Bought</small>
            <small className='block'>
              <strong>{share.buyPrice}</strong> points
            </small>
            <p>
              Total: <strong>{share.quantity * share.buyPrice}</strong>
            </p>
          </div>
          <div className={`w-1/2 ${bgColor} ml-1 px-2 py-1 rounded-md`}>
            <small>Current Price</small>
            <small className='block'>
              <strong>{currentPrice}</strong> points ({delta > 0 ? '+' : null}
              {delta}%)
            </small>
            <p>
              Total: <strong>{share.quantity * currentPrice}</strong>
            </p>
          </div>
        </div>
        <p>
          Total shares: <strong>{share.quantity}</strong>
        </p>
        <div className='flex flex-row justify-end gap-3'>
          {share.quantity !== 1 && (
            <input
              className='ring-1 p-1 py-0 flex-grow'
              type='number'
              onChange={handleInput}
              value={selectedAmmount}
            />
          )}
          <Dialog.Close className='flex-grow'>
            <Button color='primary' onClick={handleSell}>
              {share.quantity === 1
                ? 'Sell share'
                : `Sell ${
                    selectedAmmount === 0 || selectedAmmount === share.quantity
                      ? 'all'
                      : selectedAmmount
                  } shares`}
            </Button>
          </Dialog.Close>
        </div>
        <p>
          Sell for <strong>{profit}</strong> points
        </p>
      </div>
      <div className='flex flex-row self-end'>
        <Dialog.Close>
          <Button>Close</Button>
        </Dialog.Close>
      </div>
    </Modal>
  );
}
