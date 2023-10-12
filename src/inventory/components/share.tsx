import { useDispatch } from "react-redux";
import Button from "../../shared/components/button";
import { Share, SongStoreAction } from "../../shared/stores/songsStore";
import { Dispatch } from "redux";

export interface ShareDetailsProps {
  share: Share;
  currentPrice: number;
}

export default function ShareDetails({
  share,
  currentPrice,
}: ShareDetailsProps) {
  const dispatch = useDispatch<Dispatch<SongStoreAction>>();
  const increase = currentPrice - share.buyPrice;
  const delta = (increase / share.buyPrice) * 100;
  const deltaRounded = Math.round(delta * 100) / 100;
  return (
    <div className="h-auto w-full hover:bg-gray-500 rounded-md px-2 py-1 flex flex-row items-center">
      <img
        className="w-20 h-20"
        aria-hidden
        alt="album cover art"
        src={share.albumCover}
      />
      <div className="ml-2 flex flex-col w-full">
        <p className="text-white text-md">{share.name}</p>
        <p className="text-white text-xs">{share.subtitle}</p>
        <p className="text-white text-xs mt-1">
          Bought <strong>{share.quantity}</strong> shares for <strong>{share.buyPrice}</strong> points{" "}
        </p>{" "}
        <p className="text-white text-xs">
          Current price:{" "}
          <strong>
            {currentPrice}
            {!!deltaRounded && (
              <span
                className={`${
                  deltaRounded > 0 ? "text-green-600" : "text-red-600"
                } ml-1`}
              >
                ({deltaRounded > 0 ? "+" : null}
                {deltaRounded}%)
              </span>
            )}
          </strong>
        </p>
      </div>
      <div className="flex flex-col gap-0">
        <Button color="primary">Open</Button>
        <Button
          onClick={() =>
            dispatch({
              type: "sell",
              payload: {
                shareId: share.shareId,
                sellPrice: currentPrice,
                quantity: 1,
              },
            })
          }
        >
          Sell
        </Button>
      </div>
    </div>
  );
}
