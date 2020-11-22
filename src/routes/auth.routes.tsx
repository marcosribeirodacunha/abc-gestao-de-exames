import React from 'react';
import { Redirect, Route, Switch } from 'react-router-dom';

import Login from '../pages/Login';

const AuthRoutes: React.FC = () => {
  return (
    <Switch>
      <Route path="/login" component={Login} />
      <Route render={() => <Redirect to="/login" />} />
    </Switch>
  );
};

export default AuthRoutes;
