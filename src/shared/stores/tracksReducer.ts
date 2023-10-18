import { Reducer } from "redux";
import { TrackData } from "../coreTypes";

export interface TracksState {
  loadingState: "idle" | "rejected" | "success";
  catalogue: {
    loadedTracks: TrackData[];
    searchTerm: string | null;
  };
  open?: TrackData | null;
}
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
    trackId: string | null;
  };
}
export type TracksAction = LoadTracksAction | RecieveTracksAction;
export const trackReducer: Reducer<TracksState, TracksAction> = (
  state: TracksState = {
    loadingState: "idle",
    catalogue: { loadedTracks: [], searchTerm: null },
    open: null,
  },
  action: TracksAction
) => {
  return state;
};
