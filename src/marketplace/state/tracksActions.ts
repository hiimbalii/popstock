import { Dispatch } from "redux";
import { TrackData } from "../../shared/coreTypes";
import { AppState } from "../../shared/stores/songsStore";
import { SongResponse, getSongs } from "../clients/songs";

interface LoadTracksAction {
  type: "tracks/load";
  payload: {
    searchTerm: string | null;
  };
}
interface RecieveTracksAction {
  type: "tracks/recieve";
  payload: {
    tracks: TrackData[];
  };
}
interface OpenTrackAction {
  type: "tracks/open";
  payload: {
    track: TrackData | null;
  };
}
export type TracksAction =
  | LoadTracksAction
  | RecieveTracksAction
  | OpenTrackAction;

export function fetchTracks(authToken: string, searchTerm: string | null) {
  return (dispatch: Dispatch<TracksAction>, getState: () => AppState) => {
    const state = getState();
    dispatch({ type: "tracks/load", payload: { searchTerm } });
    getSongs(authToken, searchTerm).then((data) => {
      dispatch({
        type: "tracks/recieve",
        payload: { tracks: data.tracks.map(getTrackData) },
      });
    });
  };
}
function getTrackData(value: SongResponse): TrackData {
  return {
    id: value.id,
    title: value.name,
    albumCoverUrl: value.album.images[0].url || "not_found",
    album: value.album.name,
    date: value.album.release_date,
    artist: value.artists.map((x) => x.name).join(","),
    popularity: value.popularity,
  };
}

export function openTrack(track: TrackData): OpenTrackAction {
  return {
    type: "tracks/open",
    payload: {
      track,
    },
  };
}

export function closeTrack(): OpenTrackAction {
  return {
    type: "tracks/open",
    payload: {
      track: null,
    },
  };
}
