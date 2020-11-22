import React from 'react';
import { Redirect, Route, Switch } from 'react-router-dom';

import Home from '../pages/Home';
import Jobs from '../pages/Jobs';

const PrivateRoutes: React.FC = () => {
  return (
    <>
      <h1>Header</h1>
      <Switch>
        <Route path="/" exact component={Home} />
        <Route path="/jobs" component={Jobs} />

        <Route render={() => <Redirect to="/" />} />
      </Switch>
    </>
  );
};

export default PrivateRoutes;
