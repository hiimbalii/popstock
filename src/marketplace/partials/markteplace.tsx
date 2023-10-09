import { useContext, useEffect, useState } from "react";
import SongSummary from "../components/song";
import { AuthContext } from "../../app_root/authProvider";
import { useSongsList } from "../clients/songs";

export default function Marketplace() {
  const authToken = useContext<string>(AuthContext);
  const { songs, status } = useSongsList(authToken);

  const Inner = () => {
    if (status === "error") return;
    <p className="text-lg text-white">
      Oh no! We seemed to have encountered an error
    </p>;

    if (status === "loading")
      return <p className="text-lg text-white">Loading...</p>;
    if (status === "success")
      return songs.length === 0 ? (
        <p className="text-lg text-white">No songs found</p>
      ) : (
        songs.map((song) => (
          <SongSummary
            key={song.id}
            songId={song.id}
            imageUrl={song.album.images[0]?.url ?? ""}
            title={song.name}
            artist={song.artists[0]?.name ?? ""}
            album={song.album.name}
            year={song.album.release_date}
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
