import React from 'react';
import { Link } from 'react-router-dom';

import { Container } from './styles';

const Home: React.FC = () => {
  return (
    <Container>
      <h1>Home</h1>
      <Link to="/funcoes">Jobs</Link>
    </Container>
  );
};

export default Home;
