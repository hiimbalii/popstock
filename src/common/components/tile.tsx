export interface TileProps {
  children?: React.ReactNode;
  className?: string;
}
export default function Tile({children = null, className = ''}: TileProps) {
  return <div className={`w-full bg-gray-800 hover:bg-gray-900 text-white p-3 rounded-md ${className ?? ''}`}>
      {children}
  </div>;
  );
}

export interface TileTitleProps {
  children: React.ReactNode;
}
export function TileTitle({children}: TileTitleProps) {
  return  <h2 className="text-sm">{children}</h2>;
}
