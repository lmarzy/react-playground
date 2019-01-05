import * as React from 'react';
import { BrowserRouter as Router, Route, Link } from 'react-router-dom';

import AppRoutes from '../../routes/routes';

import '../../styles/main.scss';

import { Header, Footer } from './components';
import { Home, Buttons } from '../../routes';

export const App = () => (
  <>
    <Header />
    <Router>
      <>
        <Route exact path={AppRoutes.Home} component={Home} />
        <Route exact path={AppRoutes.Buttons} component={Buttons} />
      </>
    </Router>
    <Footer />
  </>
);
