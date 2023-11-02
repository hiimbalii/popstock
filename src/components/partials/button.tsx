import React from 'react';

export interface ButtonProps
  extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  color?: 'primary' | 'secondary';
  children: React.ReactNode;
}

const colors = {
  primary:
    'bg-green-500 text-gray-900 hover:bg-green-600 disabled:bg-green-300 disabled:text-gray-400 ',
  secondary:
    'bg-gray-600 hover:bg-gray-700 disabled:bg-gray-300 disabled:text-gray-500',
};
const Button = React.forwardRef<HTMLButtonElement, ButtonProps>(function Button(
  {color = 'secondary', children, ...props}: ButtonProps,
  ref,
) {
  return (
    <button
      ref={ref}
      className={`rounded-full py-1 px-3 my-1 disabled:cursor-not-allowed ${colors[color]}`}
      {...props}>
      {children}
    </button>
  );
});

export default Button;
