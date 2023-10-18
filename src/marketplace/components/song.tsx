import Button from "../../shared/components/button";
import Tile from "../../shared/components/tile";
import BuyModal from "../../shared/components/buy_modal";
import { TrackData } from "../../shared/coreTypes";

export default function SongSummary(props: TrackData) {
  const { imageUrl, artist, album, title, year, popularity } = props;
  const price = popularity || 1;
  return (
    <Tile className="h-auto mb-2">
      <div className="h-full p-1 flex ">
        <img
          className="w-24 h-24"
          aria-hidden
          alt="album cover art"
          src={imageUrl}
        />
        <div className="ml-3  h-full flex-grow flex flex-col">
          <h3 className="text-2xl">{title}</h3>
          <p className="text-sm">
            {artist} - {album}
          </p>
          <span className="text-sm mt-2">{year}</span>
        </div>
        <div className="flex flex-col">
          <p>Price per share: {price}</p>
          <Button color="primary" disabled>
            Open
          </Button>
          <BuyModal songProps={props} />
        </div>
      </div>
    </Tile>
  );
}
