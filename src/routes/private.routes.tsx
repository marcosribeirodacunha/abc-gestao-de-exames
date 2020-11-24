import React from 'react';
import { Redirect, Route, Switch } from 'react-router-dom';

import Layout from '../pages/_layout/Private';
import Categories from '../pages/Categories';
import EmployeesCreate from '../pages/EmployeesCreate';
import EmployeesList from '../pages/EmployeesList';
import ExamsCreate from '../pages/ExamsCreate';
import ExamsList from '../pages/ExamsList';
import ExamTypes from '../pages/ExamTypes';
import Home from '../pages/Home';
import Jobs from '../pages/Jobs';

const PrivateRoutes: React.FC = () => {
  return (
    <Layout>
      <Switch>
        <Route path="/" exact component={Home} />

        <Route path="/funcoes" component={Jobs} />
        <Route path="/categorias" component={Categories} />
        <Route path="/tipos-de-exames" component={ExamTypes} />

        <Route path="/funcionarios" exact component={EmployeesList} />
        <Route path="/funcionarios/inserir" component={EmployeesCreate} />

        <Route path="/exames" exact component={ExamsList} />
        <Route path="/exames/inserir" component={ExamsCreate} />

        <Route render={() => <Redirect to="/" />} />
      </Switch>
    </Layout>
  );
};

export default PrivateRoutes;
