import React from 'react';
import { Route, DefaultRoute, Link } from 'react-router';

import Application from './Application.js';
import LiveView from './views/LiveView.js';
import HistoryView from './views/HistoryView.js';
import WelcomeView from './views/WelcomeView.js';

let routes = (
    <Route name="/" handler={Application}>
        <DefaultRoute handler={WelcomeView}></DefaultRoute>
        <Route name="index" path="index.html" handler={WelcomeView}></Route>
        <Route name="live" path="live" handler={LiveView}></Route>
        <Route name="history" path="history" handler={HistoryView}></Route>
    </Route>
);

export default routes;