import { useDispatch, useSelector } from "react-redux";

import Tile, { TileTitle } from "../../shared/components/tile";
import { selectShares } from "../selectors/sharesSelector";
import { Dispatch } from "redux";
import { SongStoreAction } from "../../shared/stores/songsStore";
import ShareDetails from "../components/share";

export default function Portfolio() {
  const shares = useSelector(selectShares);
  const dispatch = useDispatch<Dispatch<SongStoreAction>>();
  return (
    <Tile className="flex-grow flex flex-col">
      <TileTitle>Portfolio</TileTitle>
      <div className="overflow-auto flex-grow">
        {shares.map((share) => (
          <ShareDetails key={share.shareId} share={share} />
        ))}
      </div>
    </Tile>
  );
}
