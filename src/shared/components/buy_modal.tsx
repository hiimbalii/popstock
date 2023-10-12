import Button from "./button";
import {  SongStoreAction } from "../stores/songsStore";
import * as Dialog from "@radix-ui/react-dialog";
import { ChangeEventHandler,  useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Dispatch } from "redux";
import { SongProps } from "../../marketplace/components/song";
import { selectWallet } from "../../inventory/selectors/walletSelector";
interface BuyModalProps {
  songProps: SongProps;
}

export default function BuyModal({
  songProps: { songId, imageUrl, artist, album, title, year, popularity },
}: BuyModalProps) {
  const [selectedAmmount, setSelectedAmmount] = useState(1);
  const dispatch = useDispatch<Dispatch<SongStoreAction>>();
  const wallet = useSelector(selectWallet);

  const handleInput: ChangeEventHandler<HTMLInputElement> = (ev) => {
    const value = parseInt(ev.target.value);
    if (Number.isNaN(value)) return; //better way probs?
    if (value <= 0) return;
    setSelectedAmmount(parseInt(ev.target.value));
  };
  const handleSell = () => {
    if (diff>0) {
      //more elegant way
      return;
    }
    dispatch({
      type: "buy",
      payload: {
        id: songId,
        price,
        quantity: selectedAmmount,
        songInfo: {
          name: title,
          albumCover: imageUrl,
          subtitle: `${artist} - ${album}`,
        },
      },
    });
  };

  const price = popularity || 1;
  const diff =   selectedAmmount * price-wallet;

  return (
    <Dialog.Root>
      <Dialog.Trigger asChild>
        <Button>Buy</Button>
      </Dialog.Trigger>
      <Dialog.Portal>
        <Dialog.Overlay className="bg-gray-700 opacity-70 fixed inset-0 w-screen h-screen" />
        <Dialog.Content className="fixed inset-0 w-screen h-screen flex justify-center items-center">
          <div className="bg-white h-auto w-96 rounded-lg py-2 px-3 flex flex-col">
            <Dialog.Title>Buy share</Dialog.Title>
            <div className="flex-grow gap-1 flex flex-col">
              <div className="flex flex-row items-center py-2">
                <img
                  className="w-16 h-16"
                  aria-hidden
                  alt="album cover art"
                  src={imageUrl}
                />
                <div className="ml-2">
                  <p>{title}</p>
                  <small>
                    {artist} - {album}
                  </small>
                </div>
              </div>
              <div className="flex flex-row justify-end gap-3">
                <input
                  className="ring-1 p-1 py-0 flex-grow"
                  type="number"
                  onChange={handleInput}
                  value={selectedAmmount}
                />
                <Dialog.Close className="flex-grow">
                  <Button color="primary" onClick={handleSell} disabled={diff>0}>
                    Buy shares
                  </Button>
                </Dialog.Close>
              </div>
              <div className="flex flex-row justify-between">
                <span>
                  Total cost: <strong>{selectedAmmount * price}</strong>
                </span>
                <span>
                  Wallet: <strong>{wallet}</strong>
                </span>
              </div>
              { diff>0 && (
                <span className="text-red-500">
                  You are missing{" "}
                  <strong>{diff}</strong> points
                </span>
              )}
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
