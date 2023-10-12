import Button from "./button";
import { Share, SongStoreAction } from "../stores/songsStore";
import * as Dialog from "@radix-ui/react-dialog";
import { ChangeEventHandler,  useState } from "react";
import { useDispatch } from "react-redux";
import { Dispatch } from "redux";
interface SellModalProps {
  share: Share;
  currentPrice: number;
}

export default function SellModal({ share, currentPrice }: SellModalProps) {
  const [selectedAmmount, setSelectedAmmount] = useState(share.quantity ?? 1);
  const dispatch = useDispatch<Dispatch<SongStoreAction>>();
  const handleInput: ChangeEventHandler<HTMLInputElement> = (ev) => {
    const value = parseInt(ev.target.value);
    if (Number.isNaN(value)) return; //better way probs?
    if (value > share.quantity || value < 0) return;
    setSelectedAmmount(parseInt(ev.target.value));
  };

  const handleSell = () => {
    const quantity = selectedAmmount === 0 ? share.quantity : selectedAmmount;
    dispatch({
      type: "sell",
      payload: { shareId: share.shareId, quantity, sellPrice: currentPrice },
    });
  };

  const profit = (selectedAmmount || share.quantity) * currentPrice;
  const priceDiff = share.buyPrice - currentPrice;
  const bgColor =
    priceDiff === 0
      ? "bg-yellow-500"
      : priceDiff < 0
      ? "bg-green-500"
      : "bg-red-500";
  return (
    <Dialog.Root>
      <Dialog.Trigger asChild>
        <Button>Sell</Button>
      </Dialog.Trigger>
      <Dialog.Portal>
        <Dialog.Overlay className="bg-gray-700 opacity-70 fixed inset-0 w-screen h-screen" />
        <Dialog.Content className="fixed inset-0 w-screen h-screen flex justify-center items-center">
          <div className="bg-white h-auto w-96 rounded-lg py-2 px-3 flex flex-col">
            <Dialog.Title>Sell share</Dialog.Title>
            <div className="flex-grow gap-1 flex flex-col">
              <div className="flex flex-row items-center py-2">
                <img
                  className="w-16 h-16"
                  aria-hidden
                  alt="album cover art"
                  src={share.albumCover}
                />
                <div className="ml-2">
                  <p>{share.name}</p>
                  <small>{share.subtitle}</small>
                </div>
              </div>
              <div className="flex flex-row">
                <div className="w-1/2 bg-gray-400 mr-1 px-2 py-1 rounded-md">
                  <small>Bought</small>
                  <small className="block">
                    <strong>{share.buyPrice}</strong> points
                  </small>
                  <p>
                    Total: <strong>{share.quantity * share.buyPrice}</strong>
                  </p>
                </div>
                <div className={`w-1/2 ${bgColor} ml-1 px-2 py-1 rounded-md`}>
                  <small>Current Price</small>
                  <small className="block">
                    <strong>{currentPrice}</strong> points
                  </small>
                  <p>
                    Total: <strong>{share.quantity * currentPrice}</strong>
                  </p>
                </div>
              </div>
              <p>
                Total shares: <strong>{share.quantity}</strong>
              </p>
              <div className="flex flex-row justify-end gap-3">
                {share.quantity !== 1 && (
                  <input
                    className="ring-1 p-1 py-0 flex-grow"
                    type="number"
                    onChange={handleInput}
                    value={selectedAmmount}
                  />
                )}
                <Dialog.Close className="flex-grow">
                  <Button color="primary" onClick={handleSell}>
                    {share.quantity === 1
                      ? "Sell share"
                      : `Sell ${
                          selectedAmmount === 0 ||
                          selectedAmmount === share.quantity
                            ? "all"
                            : selectedAmmount
                        } shares`}
                  </Button>
                </Dialog.Close>
              </div>
              <p>
                Sell for <strong>{profit}</strong> points
              </p>
            </div>
            <div className="flex flex-row self-end">
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
