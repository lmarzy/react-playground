import * as React from 'react';
import '../styles/app.scss';

import { BrowserRouter } from 'react-router-dom';
import AppContainer from './App.container';
import ScrollToTop from './Scroll-To-Top';
import { withGoogleAnalyticsHoc } from '../shared/analytics';

export const App = (): JSX.Element => (
  <BrowserRouter>
    <ScrollToTop>
      <AppWithAnalytics />
    </ScrollToTop>
  </BrowserRouter>
);

const AppWithAnalytics = withGoogleAnalyticsHoc(AppContainer);
