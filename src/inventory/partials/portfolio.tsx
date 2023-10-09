import { useSelector } from "react-redux";

import Tile, { TileTitle } from "../../shared/components/tile";
import { selectShares } from "../selectors/sharesSelector";

export default function Portfolio() {
  const shares = useSelector(selectShares)
  return (
    <Tile className="flex-grow">
      <TileTitle>Portfolio</TileTitle>
      {shares.map(share => <p>{share.songId}</p>)}
    </Tile>
  );
}
