import Button from "../../shared/components/button";
import { Share } from "../../shared/stores/songsStore";
import SellModal from "../../shared/components/sell_modal";
import calculateDelta from "../../shared/utils/calcDelta";

export interface ShareDetailsProps {
  share: Share;
  currentPrice: number;
}

export default function ShareDetails({
  share,
  currentPrice,
}: ShareDetailsProps) {
  const delta = calculateDelta(share.buyPrice, currentPrice);
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
          Bought <strong>{share.quantity}</strong> shares for{" "}
          <strong>{share.buyPrice}</strong> points{" "}
        </p>{" "}
        <p className="text-white text-xs">
          Current price:{" "}
          <strong>
            {currentPrice}
            {!!delta && (
              <span
                className={`${
                  delta > 0 ? "text-green-600" : "text-red-600"
                } ml-1`}
              >
                ({delta > 0 ? "+" : null}
                {delta}%)
              </span>
            )}
          </strong>
        </p>
      </div>
      <div className="flex flex-col gap-0">
        <Button color="primary" disabled>Open</Button>
        <SellModal currentPrice={currentPrice} share={share} />
        {/* <Button
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

        </Button> */}
      </div>
    </div>
  );
}
