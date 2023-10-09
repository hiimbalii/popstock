import { useContext, useEffect, useState } from "react";
import SongSummary from "../components/song";
import { AuthContext } from "../AppRoot/authProvider";
import { SongResponse, getSongs } from "../clients/songs";

export default function Marketplace() {
  const tokenRes = useContext<string>(AuthContext);
  const [songs, setSongs] = useState<SongResponse[]>([]);
  const [error, setError] = useState(false);
  useEffect(() => {
    if (tokenRes)
      getSongs(tokenRes).then(
        (songs) => {
          setSongs(songs.tracks);
          setError(false);
        },
        (error) => setError(true)
      );
  }, [tokenRes]);
  return (
    <div className="px-2 w-full h-full overflow-x-scroll">
      {error && <p>Oh no! You ddos'd spotify too hard :/</p>}
      {songs && songs.length === 0 && <p>No songs loaded</p>}
      {songs &&
        songs.map((song) => (
          <SongSummary
            imageUrl={song.album.images[0]?.url ?? ""}
            title={song.name}
            artist={song.artists[0]?.name ?? ""}
            album={song.album.name}
            year={song.album.release_date}
            popularity={song.popularity}
          ></SongSummary>
        ))}
    </div>
  );
}
