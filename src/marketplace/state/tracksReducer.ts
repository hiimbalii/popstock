import { Reducer } from "redux";
import { TrackData } from "../../shared/coreTypes";
import { TracksAction } from "./tracksActions";
import { act } from "react-dom/test-utils";

export interface TracksState {
  loadingState: "idle" | "rejected" | "success" | "loading";
  catalogue: {
    loadedTracks: TrackData[];
    searchTerm: string | null;
  };
  open?: TrackData | null;
}
export const trackReducer: Reducer<TracksState, TracksAction> = (
  state: TracksState = {
    loadingState: "idle",
    catalogue: { loadedTracks: [], searchTerm: null },
    open: null,
  },
  action: TracksAction
) => {
  switch (action.type) {
    case "tracks/load":
      return { ...state, loadingState: "loading" };
    case "tracks/recieve":
      return {
        ...state,
        loadingState: "success",
        catalogue: { ...state.catalogue, loadedTracks: action.payload.tracks },
      };
    case "tracks/open":
      return { ...state, open: action.payload.track };
    default:
      return state;
  }
};
