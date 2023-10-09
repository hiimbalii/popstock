import { useDispatch } from "react-redux";
import Button from "../../shared/components/button";
import { Share, SongStoreAction } from "../../shared/stores/songsStore";
import { Dispatch } from "redux";

export interface ShareDetailsProps {
  share: Share;
}

export default function ShareDetails({ share }: ShareDetailsProps) {
  const dispatch = useDispatch<Dispatch<SongStoreAction>>()
  return (
    <div className="h-auto w-full hover:bg-gray-500 rounded-md px-2 py-1 flex flex-row items-center">
      <img
        className="w-20 h-20"
        aria-hidden
        alt="album cover art"
        src={share.albumCover}
      />
      <div className="ml-2 flex flex-col">
        <p className="text-white text-md">{share.name}</p>
        <p className="text-white text-sm">{share.subtitle}</p>
        <div className="flex flex-row gap-1">
          <Button onClick={()=>dispatch({type:'sell', payload: {shareId:share.shareId}})}>Sell</Button>
          <Button>Open</Button>
        </div>
      </div>
    </div>
  );
}
