import React, { ButtonHTMLAttributes } from 'react';
import { IconBaseProps } from 'react-icons/lib';

import { Container } from './styles';

interface Props extends ButtonHTMLAttributes<HTMLButtonElement> {
  variant?: 'primary' | 'danger' | 'success';
  icon: React.ComponentType<IconBaseProps>;
}

const FabButton: React.FC<Props> = ({
  variant = 'primary',
  icon: Icon,
  type = 'button',
  ...rest
}) => {
  return (
    <Container className={variant} type={type} {...rest}>
      <Icon size={20} />
    </Container>
  );
};

export default FabButton;
