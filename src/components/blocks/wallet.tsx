import { useSelector } from "react-redux";
import Tile, { TileTitle } from "../../shared/components/tile";
import { selectWallet } from "../../core/store/selectors";

export default function Wallet() {
  const wallet = useSelector(selectWallet);
  return (
    <Tile className="flex flex-col justify-between h-32">
      <div>
        <TileTitle>Wallet</TileTitle>
        <span className="text-4xl">{wallet.toString()}</span>
      </div>
      {/* <span>Not logged in</span> */}
    </Tile>
  );
}
