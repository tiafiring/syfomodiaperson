import React, { PropTypes } from 'react';
import { Router, Route } from 'react-router';
import LandingssideContainer from '../containers/LandingssideContainer.js';

const AppRouter = ({ history }) => {
    return (<Router history={history}>
        <Route path="/sykefravaer" component={LandingssideContainer} />
        <Route path="*" component={LandingssideContainer} />
    </Router>);
};

AppRouter.propTypes = {
    history: PropTypes.object.isRequired,
};

export default AppRouter;
