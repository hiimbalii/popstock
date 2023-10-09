export interface ButtonProps extends React.ButtonHTMLAttributes<HTMLButtonElement>{
  color?: "primary" | "secondary";
  children: React.ReactNode;
}

const colors = {
  primary: "bg-green-500 hover:bg-green-600",
  secondary: "bg-gray-500 hover:bg-gray-600",
};
export default function Button({
  color = "secondary",
  children,
  ...props
}: ButtonProps) {
  return (
    <button
      className={`rounded-full py-1 px-3 my-1 ${colors[color]}`}
      {...props}
    >
      {children}
    </button>
  );
}
