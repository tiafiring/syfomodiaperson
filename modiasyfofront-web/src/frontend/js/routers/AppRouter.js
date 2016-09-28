import React, { PropTypes } from 'react';
import { Router, Route } from 'react-router';
import NaermesteLedereContainer from '../containers/NaermesteLedereContainer';
import FeilsideContainer from '../containers/FeilsideContainer';

const AppRouter = ({ history }) => {
    return (<Router history={history}>
        <Route path="/sykefravaer" component={FeilsideContainer} />
        <Route path="/sykefravaer/:fnr" component={NaermesteLedereContainer} />
        <Route path="/sykefravaer/:fnr/naermeste-leder" component={NaermesteLedereContainer} />
        <Route path="/" component={FeilsideContainer} />
    </Router>);
};

AppRouter.propTypes = {
    history: PropTypes.object.isRequired,
};

export default AppRouter;
