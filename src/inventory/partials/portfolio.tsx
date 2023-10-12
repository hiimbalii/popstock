import { useDispatch, useSelector } from "react-redux";

import Tile, { TileTitle } from "../../shared/components/tile";
import { selectShares } from "../selectors/sharesSelector";
import ShareDetails from "../components/share";
import { useContext, useEffect, useState } from "react";
import { AuthContext } from "../../app_root/authProvider";
import { getTrackPrices } from "../clients/get_track_prices";

export default function Portfolio() {
  const shares = useSelector(selectShares);

  const authToken = useContext<string>(AuthContext);
  const [priceList, setPriceList] = useState<{ [key: string]: number }>({});

  useEffect(() => {
    if (!authToken) return;
    const listOfIds = shares.map((share) => share.songId);
    getTrackPrices(authToken, listOfIds).then((prices) => setPriceList(prices));
  }, [shares, authToken]);

  const totalValue = shares.reduce(
    (prev, curr) => prev + priceList[curr.songId] * curr.quantity,
    0
  );

  const totalInvested = shares.reduce(
    (prev, curr) => prev + curr.buyPrice * curr.quantity,
    0
  );
  return (
    <Tile className="flex-grow flex flex-col h-5/6">
      <TileTitle>Portfolio</TileTitle>
      <div className="overflow-auto flex-grow">
        {shares.map((share) => (
          <ShareDetails
            key={share.shareId}
            share={share}
            currentPrice={priceList[share.songId] ?? 0}
          />
        ))}
      </div>
      <div className="flex justify-between mt-1">
        <span>
          {shares.length} <small>shares</small>
        </span>
        <span>
          {Number.isNaN(totalValue) ? 0 : totalValue}{" "}
          <small>
            in value (<strong>{totalInvested}</strong> invested)
          </small>
        </span>
      </div>
    </Tile>
  );
}
