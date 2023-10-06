import Tile from "./tile";

export default function SongSummary() {
  return (
    <Tile className="h-auto">
      <div className="h-full p-1 flex ">
        <div className="w-24 h-24 bg-blue-400">.</div>
        <div className="ml-3  h-full flex-grow flex flex-col">
          <h3 className="text-2xl">Hello world!</h3>
          <p className="text-sm">Artist - Album</p>
          <span className="text-sm mt-2">1987</span>
        </div>
        <div>Btns</div>
      </div>
    </Tile>
  );
}
