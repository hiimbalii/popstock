import Tile, { TileTitle } from "../../shared/tile";

export default function Wallet() {
  return (
    <Tile className="flex flex-col justify-between h-32">
      <div>
        <TileTitle>Wallet</TileTitle>
        <span className="text-4xl">1000</span>
      </div>
      {/* <span>Not logged in</span> */}
    </Tile>
  );
}
