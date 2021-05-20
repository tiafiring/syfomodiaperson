import React from "react";
import { BrowserRouter as Router, Route } from "react-router-dom";
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
import NokkelinformasjonContainer from "../components/nokkelinformasjon/container/NokkelinformasjonContainer";
import VedtakContainer from "../components/vedtak/container/VedtakContainer";
import DialogmoteInnkallingContainer from "../components/dialogmote/innkalling/DialogmoteInnkallingContainer";
import { erLokalEllerPreprod } from "../utils/miljoUtil";
import AvlysDialogmoteContainer from "../components/dialogmote/avlys/AvlysDialogmoteContainer";

const AppRouter = () => {
  const fnr = window.location.pathname.split("/")[2];
  if (!erGyldigFodselsnummer(fnr)) {
    return (
      <Router>
        <Route path="*" component={IngenBrukerContainer} />
      </Router>
    );
  }

  return (
    <Router>
      <Route
        path="/sykefravaer/:fnr"
        exact
        component={NokkelinformasjonContainer}
      />
      <Route
        path="/sykefravaer/:fnr/nokkelinformasjon"
        exact
        component={NokkelinformasjonContainer}
      />
      <Route path="/sykefravaer/:fnr/logg" component={HistorikkContainer} />
      <Route
        path="/sykefravaer/:fnr/moteoversikt"
        exact
        component={MotelandingssideContainer}
      />
      <Route
        path="/sykefravaer/:fnr/mote"
        exact
        component={MotebookingContainer}
      />
      {erLokalEllerPreprod && (
        <Route
          path="/sykefravaer/:fnr/dialogmote"
          exact
          component={DialogmoteInnkallingContainer}
        />
      )}
      {erLokalEllerPreprod && (
        <Route
          path="/sykefravaer/:fnr/dialogmote/:dialogmoteUuid/avlys"
          exact
          component={AvlysDialogmoteContainer}
        />
      )}
      <Route
        path="/sykefravaer/:fnr/mote/:moteUuid/avbryt"
        exact
        component={AvbrytMoteContainer}
      />
      <Route
        path="/sykefravaer/:fnr/mote/bekreft/:alternativId"
        exact
        component={BekreftMoteContainer}
      />
      <Route
        path="/sykefravaer/:fnr/sykmeldinger"
        exact
        component={SykmeldingerContainer}
      />
      <Route
        path="/sykefravaer/:fnr/sykepengesoknader"
        exact
        component={SykepengesoknaderContainer}
      />
      <Route
        path="/sykefravaer/:fnr/sykepengesoknader/:sykepengesoknadId"
        exact
        component={SykepengesoknadContainer}
      />
      <Route
        path="/sykefravaer/:fnr/sykmeldinger/:sykmeldingId"
        exact
        component={DinSykmeldingContainer}
      />
      <Route
        path="/sykefravaer/:fnr/oppfoelgingsplaner"
        exact
        component={OppfoelgingsPlanerOversiktContainer}
      />
      <Route
        path="/sykefravaer/:fnr/oppfoelgingsplaner/:oppfoelgingsdialogId"
        exact
        component={OppfoelgingsplanContainer}
      />
      <Route
        path="/sykefravaer/:fnr/vedtak"
        exact
        component={VedtakContainer}
      />
      <Route path="/sykefravaer" exact component={IngenBrukerContainer} />
    </Router>
  );
};

export default AppRouter;
