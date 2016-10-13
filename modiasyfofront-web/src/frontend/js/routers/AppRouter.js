import React, { PropTypes } from 'react';
import { Router, Route } from 'react-router';
import NaermesteLedereContainer from '../containers/NaermesteLedereContainer';
import FeilsideContainer from '../containers/FeilsideContainer';
import MotebookingContainer from '../containers/MotebookingContainer';

const AppRouter = ({ history }) => {
    return (<Router history={history}>
        <Route path="/sykefravaer" component={FeilsideContainer} />
        <Route path="/sykefravaer/:fnr" component={NaermesteLedereContainer} />
        <Route path="/sykefravaer/:fnr/naermeste-ledere" component={NaermesteLedereContainer} />
        <Route path="/sykefravaer/:fnr/mote" component={MotebookingContainer} />
        <Route path="/" component={FeilsideContainer} />
    </Router>);
};

AppRouter.propTypes = {
    history: PropTypes.object.isRequired,
};

export default AppRouter;
