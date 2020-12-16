import React from "react";
import PropTypes from "prop-types";
import { Router, Route } from "react-router";
import IngenBrukerContainer from "../containers/IngenBrukerContainer";
import MotebookingContainer from "../components/mote/container/MotebookingContainer";
import AvbrytMoteContainer from "../components/mote/container/AvbrytMoteContainer";
import BekreftMoteContainer from "../components/mote/container/BekreftMoteContainer";
import SykmeldingerContainer from "../components/speiling/sykmeldinger/container/SykmeldingerContainer";
import SykepengesoknaderContainer from "../components/speiling/sykepengsoknader/container/SykepengesoknaderContainer";
import SykepengesoknadContainer from "../components/speiling/sykepengsoknader/container/SykepengesoknadContainer";
import OppfoelgingsPlanerOversiktContainer from "../components/oppfolgingsplan/container/OppfoelgingsPlanerOversiktContainer";
import OppfoelgingsplanContainer from "../components/oppfolgingsplan/container/OppfoelgingsplanContainer";
import DinSykmeldingContainer from "../components/speiling/sykmeldinger/container/DinSykmeldingContainer";
import HistorikkContainer from "../components/historikk/container/HistorikkContainer";
import { erGyldigFodselsnummer } from "../utils/frnValideringUtils";
import MotelandingssideContainer from "../components/mote/container/MotelandingssideContainer";
import MotebehovContainer from "../components/motebehov/container/MotebehovContainer";
import NokkelinformasjonContainer from "../components/nokkelinformasjon/container/NokkelinformasjonContainer";
import VedtakContainer from "../components/vedtak/container/VedtakContainer";

const AppRouter = ({ history }) => {
  const fnr = window.location.pathname.split("/")[2];
  if (!erGyldigFodselsnummer(fnr)) {
    return (
      <Router history={history}>
        <Route path="*" component={IngenBrukerContainer} />
      </Router>
    );
  }

  return (
    <Router history={history}>
      <Route path="/sykefravaer/:fnr" component={NokkelinformasjonContainer} />
      <Route
        path="/sykefravaer/:fnr/nokkelinformasjon"
        component={NokkelinformasjonContainer}
      />
      <Route path="/sykefravaer/:fnr/logg" component={HistorikkContainer} />
      <Route
        path="/sykefravaer/:fnr/moteoversikt"
        component={MotelandingssideContainer}
      />
      <Route path="/sykefravaer/:fnr/mote" component={MotebookingContainer} />
      <Route
        path="/sykefravaer/:fnr/motebehov"
        component={MotebehovContainer}
      />
      <Route
        path="/sykefravaer/:fnr/mote/:moteUuid/avbryt"
        component={AvbrytMoteContainer}
      />
      <Route
        path="/sykefravaer/:fnr/mote/bekreft/:alternativId"
        component={BekreftMoteContainer}
      />
      <Route
        path="/sykefravaer/:fnr/sykmeldinger"
        component={SykmeldingerContainer}
      />
      <Route
        path="/sykefravaer/:fnr/sykepengesoknader"
        component={SykepengesoknaderContainer}
      />
      <Route
        path="/sykefravaer/:fnr/sykepengesoknader/:sykepengesoknadId"
        component={SykepengesoknadContainer}
      />
      <Route
        path="/sykefravaer/:fnr/sykmeldinger/:sykmeldingId"
        component={DinSykmeldingContainer}
      />
      <Route
        path="/sykefravaer/:fnr/oppfoelgingsplaner"
        component={OppfoelgingsPlanerOversiktContainer}
      />
      <Route
        path="/sykefravaer/:fnr/oppfoelgingsplaner/:oppfoelgingsdialogId"
        component={OppfoelgingsplanContainer}
      />
      <Route path="/sykefravaer/:fnr/vedtak" component={VedtakContainer} />
      <Route
        path="/sykefravaer/:fnr/*"
        component={NokkelinformasjonContainer}
      />
      <Route path="/sykefravaer" component={IngenBrukerContainer} />
    </Router>
  );
};

AppRouter.propTypes = {
  history: PropTypes.object.isRequired,
};

export default AppRouter;
