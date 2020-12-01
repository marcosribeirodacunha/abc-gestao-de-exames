import React from 'react';

import { Container } from './styles';

interface Props {
  size?: number;
  message?: boolean | string;
}

const Loader: React.FC<Props> = ({ size = 3, message = 'Carregando' }) => {
  return (
    <Container size={size}>
      <div className="back-circle" />
      <div className="main-circle" />
      {message && <h1>{message}</h1>}
    </Container>
  );
};

export default Loader;
