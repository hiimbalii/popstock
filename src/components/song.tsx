import Tile from "./tile";

export interface SongProps {
  imageUrl: string;
  artist: string;
  album: string;
  title: string;
  year: string;
  popularity: number;
}
export default function SongSummary({
  imageUrl,
  artist,
  album,
  title,
  year,
  popularity,
}: SongProps) {
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
          <p>Price per share: {popularity}</p>
          <button className='bg-green-500 hover:bg-green-600 rounded-full py-1 px-3 my-1'>Open</button>
          <button className="bg-gray-500 hover:bg-gray-600 rounded-full py-1 px-3 my-1">Buy</button>
        </div>
      </div>
    </Tile>
  );
}
