import Button from './button';
import {Share} from '../coreTypes';
import calculateDelta from '../utils/calcDelta';
import {PortfolioAction, sellShare} from '../../core/store/portfolioActions';
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
    <Dialog.Root>
      <Dialog.Trigger asChild>
        <Button onClick={handleOpen}>Sell</Button>
      </Dialog.Trigger>
      <Dialog.Portal>
        <Dialog.Overlay className='bg-gray-700 opacity-70 fixed inset-0 w-screen h-screen' />
        <Dialog.Content className='fixed inset-0 w-screen h-screen flex justify-center items-center'>
          <div className='bg-white h-auto w-96 rounded-lg py-2 px-3 flex flex-col'>
            <Dialog.Title>Sell share</Dialog.Title>
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
                    {share.trackData.artist} - {share.trackData.album}
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
                    <strong>{currentPrice}</strong> points (
                    {delta > 0 ? '+' : null}
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
                          selectedAmmount === 0 ||
                          selectedAmmount === share.quantity
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
              <Dialog.Close asChild>
                <Button>Close</Button>
              </Dialog.Close>
            </div>
          </div>
        </Dialog.Content>
      </Dialog.Portal>
    </Dialog.Root>
  );
}
