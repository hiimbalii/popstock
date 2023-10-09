import { SongStoreState } from "../../shared/stores/songsStore";

const selectShares = (state:SongStoreState) => state.portfolio
export {selectShares}