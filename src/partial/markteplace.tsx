import { useContext, useEffect, useState } from "react";
import SongSummary from "../components/song";
import { AuthContext } from "../providers/authProvider";
import { SongResponse, getSongs } from "../clients/songs";

export default function Marketplace() {
  const tokenRes = useContext<string>(AuthContext);
  const [songs, setSongs] = useState<SongResponse[]>([])
  useEffect(() => {
    getSongs(tokenRes).then((songs) => setSongs(songs.tracks));
  });
  return (
    <div className="w-full">
        {JSON.stringify(songs)}
      <SongSummary></SongSummary>
    </div>
  );
}
