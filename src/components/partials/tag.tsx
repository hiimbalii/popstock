type TagProps = {
  children: React.ReactNode;
  active?: boolean;
  onClick?: () => unknown;
};

export default function Tag({children, active, onClick}: TagProps) {
  const handleClick = () => onClick && onClick();

  return (
    <div
      className={`rounded-full px-3 py-2 border border-white ${
        active ? 'bg-white text-green-950' : 'text-white bg-transparent'
      }`}
      onClick={handleClick}>
      {children}
    </div>
  );
}
