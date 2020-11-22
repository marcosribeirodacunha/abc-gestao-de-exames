import React from 'react';

import Header from '../../../components/Header';
import { Container } from './styles';

const Private: React.FC = ({ children }) => {
  return (
    <>
      <Header />
      <Container>{children}</Container>
    </>
  );
};

export default Private;
