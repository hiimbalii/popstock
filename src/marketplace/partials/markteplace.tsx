import { useContext } from "react";
import SongSummary from "../components/song";
import { AuthContext } from "../../app_root/authProvider";
import { useSongsList } from "../clients/songs";

export default function Marketplace() {
  const authToken = useContext<string>(AuthContext);
  const { songs, status } = useSongsList(authToken);

  const Inner = () => {
    if (status === "rejected") return;
    <p className="text-lg text-white">
      Oh no! We seemed to have encountered an error
    </p>;

    if (status === "idle")
      return <p className="text-lg text-white">Loading...</p>;
    if (status === "success")
      return songs.length === 0 ? (
        <p className="text-lg text-white">No songs found</p>
      ) : (
        songs.map((song) => (
          <SongSummary
            key={song.id}
            id={song.id}
            albumCoverUrl={song.albumCoverUrl ?? ""}
            title={song.title}
            artist={song.artist ?? ""}
            album={song.album}
            date={song.date}
            popularity={song.popularity}
          ></SongSummary>
        ))
      );
  };
  return (
    <div className="px-2 w-full h-full overflow-x-scroll">
      <Inner />
    </div>
  );
}
