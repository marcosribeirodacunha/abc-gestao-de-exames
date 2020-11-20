import React, { ButtonHTMLAttributes } from 'react';

import { Container } from './styles';

interface Props extends ButtonHTMLAttributes<HTMLButtonElement> {
  variant: 'dark' | 'light' | 'primary' | 'secondary' | 'danger';
  block?: boolean;
}

const Button: React.FC<Props> = ({
  type = 'button',
  variant,
  block = false,
  children,
  ...rest
}) => {
  return (
    <Container type={type} className={variant} block={block} {...rest}>
      {children}
    </Container>
  );
};

export default Button;
