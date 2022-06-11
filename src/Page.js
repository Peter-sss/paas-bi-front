import React from 'react';
import { HashRouter as Router, Route, Switch, Redirect } from 'react-router-dom';
import App from './App';
import NotFound from './components/widget/NotFound';

export default () => (
    <Router>
        <Switch>
            <Route exact path="/" render={() => <Redirect to="/addChart" push />} />
            <Route path="/" component={App} />
            <Route component={NotFound} />
        </Switch>
    </Router>
);
