import React from 'react';

import { Container } from './styles';

const Loader: React.FC = () => {
  return (
    <Container>
      <div className="back-circle" />
      <div className="main-circle" />
      <h1>Carregando</h1>
    </Container>
  );
};

export default Loader;
