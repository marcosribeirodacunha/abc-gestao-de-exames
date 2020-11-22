import React from 'react';
import { Link } from 'react-router-dom';

import { Container } from './styles';

const Jobs: React.FC = () => {
  return (
    <Container>
      <h1>Jobs</h1>
      <Link to="/">Home</Link>
    </Container>
  );
};

export default Jobs;
