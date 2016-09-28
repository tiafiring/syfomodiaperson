import React, { PropTypes } from 'react';
import { Router, Route } from 'react-router';
import LandingssideContainer from '../containers/LandingssideContainer';
import SykmeldingerContainer from '../containers/SykmeldingerContainer';
import SykmeldingContainer from '../containers/SykmeldingContainer';

const AppRouter = ({ history }) => {
    return (<Router history={history}>
        <Route path="/sykefravaer" component={LandingssideContainer} />
        <Route path="/sykefravaer/:fnr" component={LandingssideContainer} />
        <Route path="/sykefravaer/naermeste-leder" component={LandingssideContainer} />
        <Route path="/sykefravaer/sykmeldinger" component={SykmeldingerContainer} />
        <Route path="/sykefravaer/sykmeldinger/:sykmeldingId" component={SykmeldingContainer} />
        <Route path="/" component={LandingssideContainer} />
    </Router>);
};

AppRouter.propTypes = {
    history: PropTypes.object.isRequired,
};

export default AppRouter;
