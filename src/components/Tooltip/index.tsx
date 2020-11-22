import React from 'react';

import { Container } from './styles';

interface Props {
  title: string;
  variant?: 'default' | 'error';
  className?: string;
}

const Tooltip: React.FC<Props> = ({
  title,
  variant = 'default',
  className,
  children,
}) => {
  return (
    <Container className={className}>
      {children}
      <span className={variant}>{title}</span>
    </Container>
  );
};

export default Tooltip;
