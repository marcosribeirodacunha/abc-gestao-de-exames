import React from 'react';
import { Redirect, Route, Switch } from 'react-router-dom';

import Layout from '../pages/_layout/Private';
import Home from '../pages/Home';
import Jobs from '../pages/Jobs';

const PrivateRoutes: React.FC = () => {
  return (
    <Layout>
      <Switch>
        <Route path="/" exact component={Home} />
        <Route path="/funcoes" component={Jobs} />

        <Route render={() => <Redirect to="/" />} />
      </Switch>
    </Layout>
  );
};

export default PrivateRoutes;
