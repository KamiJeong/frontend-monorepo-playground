import type { PropsWithChildren, ButtonHTMLAttributes } from 'react';

const Button = ({
  children,
  type = 'button',
  ...attributes
}: PropsWithChildren<ButtonHTMLAttributes<HTMLButtonElement>>) => (
  <button type={type} {...attributes}>
    {children}
  </button>
);

export default Button;
