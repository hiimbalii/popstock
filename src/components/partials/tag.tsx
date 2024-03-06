type TagProps = {
  children: React.ReactNode;
  active?: boolean;
  primary?: boolean;
  onClick?: () => unknown;
};

export default function Tag({children, active, onClick, primary}: TagProps) {
  const handleClick = () => onClick && onClick();

  return (
    <div
      className={`rounded-full px-3 py-2 border ${
        primary ? 'border-green-500' : 'border-white'
      } ${active ? 'bg-white text-green-950' : 'text-white bg-transparent'}`}
      style={{whiteSpace: 'nowrap'}}
      onClick={handleClick}>
      {children}
    </div>
  );
}
