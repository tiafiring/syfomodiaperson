import React, { PropTypes } from 'react';
import { Router, Route } from 'react-router';
import NaermesteLedereContainer from '../containers/NaermesteLedereContainer';
import FeilsideContainer from '../containers/FeilsideContainer';
import MotebookingContainer from '../containers/MotebookingContainer';
import AvbrytMoteContainer from '../containers/AvbrytMoteContainer';
import BekreftMoteContainer from '../containers/BekreftMoteContainer';
import TidslinjeContainer from '../containers/TidslinjeContainer';
import SykmeldingerContainer from '../containers/SykmeldingerContainer';
import SykepengesoknaderContainer from '../containers/SykepengesoknaderContainer';
import SykepengesoknadContainer from '../containers/SykepengesoknadContainer';
import OppfoelgingsPlanerOversiktContainer from '../containers/OppfoelgingsPlanerOversiktContainer';
import OppfoelgingsplanContainer from '../containers/OppfoelgingsplanContainer';
import DinSykmeldingContainer from '../containers/DinSykmeldingContainer';
import HistorikkContainer from '../containers/HistorikkContainer';

const AppRouter = ({ history }) => {
    return (<Router history={history}>
        <Route path="/sykefravaer" component={FeilsideContainer} />
        <Route path="/sykefravaer/:fnr" component={NaermesteLedereContainer} />
        <Route path="/sykefravaer/:fnr/naermeste-leder" component={NaermesteLedereContainer} />
        <Route path="/sykefravaer/:fnr/mote" component={MotebookingContainer} />
        <Route path="/sykefravaer/:fnr/mote/:moteUuid/avbryt" component={AvbrytMoteContainer} />
        <Route path="/sykefravaer/:fnr/mote/bekreft/:alternativId" component={BekreftMoteContainer} />
        <Route path="/sykefravaer/:fnr/tidslinjen" component={TidslinjeContainer} />
        <Route path="/sykefravaer/:fnr/tidslinjen/:valgtArbeidssituasjon" component={TidslinjeContainer} />
        <Route path="/sykefravaer/:fnr/sykmeldinger" component={SykmeldingerContainer} />
        <Route path="/sykefravaer/:fnr/sykepengesoknader" component={SykepengesoknaderContainer} />
        <Route path="/sykefravaer/:fnr/sykepengesoknader/:sykepengesoknadId" component={SykepengesoknadContainer} />
        <Route path="/sykefravaer/:fnr/sykmeldinger/:sykmeldingId" component={DinSykmeldingContainer} />
        <Route path="/sykefravaer/:fnr/oppfoelgingsplaner" component={OppfoelgingsPlanerOversiktContainer} />
        <Route path="/sykefravaer/:fnr/oppfoelgingsplaner/:oppfoelgingsdialogId" component={OppfoelgingsplanContainer} />
        <Route path="/sykefravaer/:fnr/historikk" component={HistorikkContainer} />
        <Route path="/" component={FeilsideContainer} />
    </Router>);
};

AppRouter.propTypes = {
    history: PropTypes.object.isRequired,
};

export default AppRouter;
