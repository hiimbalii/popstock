import { useDispatch, useSelector } from "react-redux";

import Tile, { TileTitle } from "../../shared/components/tile";
import { selectShares } from "../selectors/sharesSelector";
import { Dispatch } from "redux";
import { SongStoreAction } from "../../shared/stores/songsStore";

export default function Portfolio() {
  const shares = useSelector(selectShares);
  const dispatch = useDispatch<Dispatch<SongStoreAction>>();
  return (
    <Tile className="flex-grow">
      <TileTitle>Portfolio</TileTitle>
      {shares.map((share) => (
        <button
          key={share.shareId}
          onClick={() =>
            dispatch({ type: "sell", payload: { shareId: share.shareId } })
          }
        >
          {share.songId}: {share.name}
        </button>
      ))}
    </Tile>
  );
}
