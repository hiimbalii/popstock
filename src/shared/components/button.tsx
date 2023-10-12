export interface ButtonProps
  extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  color?: "primary" | "secondary";
  children: React.ReactNode;
}

const colors = {
  primary: "bg-green-500 hover:bg-green-600 disabled:bg-green-300 ",
  secondary: "bg-gray-600 hover:bg-gray-700 disabled:bg-gray-300",
};
export default function Button({
  color = "secondary",
  children,
  ...props
}: ButtonProps) {
  return (
    <button
      className={`rounded-full py-1 px-3 my-1 disabled:cursor-not-allowed ${colors[color]}`}
      {...props}
    >
      {children}
    </button>
  );
}
