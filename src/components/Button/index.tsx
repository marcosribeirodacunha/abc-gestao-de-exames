import React, { ButtonHTMLAttributes } from 'react';

import { Container, Loader } from './styles';

interface Props extends ButtonHTMLAttributes<HTMLButtonElement> {
  variant: 'dark' | 'light' | 'primary' | 'secondary' | 'danger';
  block?: boolean;
  isLoading?: boolean;
}

const Button: React.FC<Props> = ({
  type = 'button',
  variant,
  block = false,
  isLoading = false,
  disabled,
  children,
  ...rest
}) => {
  return (
    <Container
      type={type}
      className={variant}
      block={block}
      disabled={disabled || isLoading}
      {...rest}
    >
      {isLoading ? (
        <Loader className={variant}>
          <span className="first" />
          <span className="second" />
          <span className="third" />
        </Loader>
      ) : (
        children
      )}
    </Container>
  );
};

export default Button;
