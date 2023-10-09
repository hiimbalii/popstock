import { useDispatch } from "react-redux";
import Button from "../../shared/components/button";
import Tile from "../../shared/components/tile";
import { Dispatch } from "redux";
import { SongStoreAction } from "../../shared/stores/songsStore";

export interface SongProps {
  songId: string;
  imageUrl: string;
  artist: string;
  album: string;
  title: string;
  year: string;
  popularity: number;
}
export default function SongSummary({
  songId,
  imageUrl,
  artist,
  album,
  title,
  year,
  popularity,
}: SongProps) {
  const price = popularity * 10 || 10;
  const dispatch = useDispatch<Dispatch<SongStoreAction>>();
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
          <Button color="primary">Open</Button>
          <Button
            onClick={() =>
              dispatch({
                type: "buy",
                payload: {
                  id: songId,
                  price,
                  quantiy: 1,
                  songInfo: {
                    name: title,
                    subtitle: `${artist} - ${album}`,
                    albumCover: imageUrl,
                  },
                },
              })
            }
          >
            Buy
          </Button>
        </div>
      </div>
    </Tile>
  );
}
