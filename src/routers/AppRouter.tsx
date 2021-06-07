import React, { ReactElement, useEffect } from "react";
import { BrowserRouter as Router, Route } from "react-router-dom";
import IngenBrukerContainer from "../containers/IngenBrukerContainer";
import MotebookingContainer from "../components/mote/container/MotebookingContainer";
import AvbrytMoteContainer from "../components/mote/container/AvbrytMoteContainer";
import BekreftMoteContainer from "../components/mote/container/BekreftMoteContainer";
import SykmeldingerContainer from "../components/speiling/sykmeldinger/container/SykmeldingerContainer";
import SykepengesoknaderContainer from "../components/speiling/sykepengsoknader/container/SykepengesoknaderSide";
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
import { useValgtPersonident } from "../hooks/useValgtBruker";
import { useDispatch } from "react-redux";
import {
  hentAktivBruker,
  pushModiaContext,
} from "../data/modiacontext/modiacontext_actions";
import { EventType } from "../data/modiacontext/modiacontextTypes";
import AppSpinner from "../components/AppSpinner";
import { useAppSelector } from "../hooks/hooks";
import DialogmoteReferatContainer from "../components/dialogmote/referat/DialogmoteReferatContainer";

const getFnrFromParams = (): string => {
  return window.location.pathname.split("/")[2];
};

const setAktivBrukerFromParams = (brukerIdent: string) => {
  const dispatch = useDispatch();
  dispatch(
    pushModiaContext({
      verdi: brukerIdent,
      eventType: EventType.NY_AKTIV_BRUKER,
    })
  );
};

const AktivBrukerRouter = (): ReactElement => {
  return (
    <Router>
      <Route path="/sykefravaer" exact component={NokkelinformasjonContainer} />
      <Route
        path="/sykefravaer/nokkelinformasjon"
        exact
        component={NokkelinformasjonContainer}
      />
      <Route path="/sykefravaer/logg" component={HistorikkContainer} />
      <Route
        path="/sykefravaer/moteoversikt"
        exact
        component={MotelandingssideContainer}
      />
      <Route path="/sykefravaer/mote" exact component={MotebookingContainer} />
      {erLokalEllerPreprod && (
        <Route
          path="/sykefravaer/dialogmote"
          exact
          component={DialogmoteInnkallingContainer}
        />
      )}
      {erLokalEllerPreprod && (
        <Route
          path="/sykefravaer/dialogmote/:dialogmoteUuid/avlys"
          exact
          component={AvlysDialogmoteContainer}
        />
      )}
      {erLokalEllerPreprod && (
        <Route
          path="/sykefravaer/dialogmote/:dialogmoteUuid/referat"
          exact
          component={DialogmoteReferatContainer}
        />
      )}
      <Route
        path="/sykefravaer/mote/:moteUuid/avbryt"
        exact
        component={AvbrytMoteContainer}
      />
      <Route
        path="/sykefravaer/mote/bekreft/:alternativId"
        exact
        component={BekreftMoteContainer}
      />
      <Route
        path="/sykefravaer/sykmeldinger"
        exact
        component={SykmeldingerContainer}
      />
      <Route
        path="/sykefravaer/sykepengesoknader"
        exact
        component={SykepengesoknaderContainer}
      />
      <Route
        path="/sykefravaer/sykepengesoknader/:sykepengesoknadId"
        exact
        component={SykepengesoknadContainer}
      />
      <Route
        path="/sykefravaer/sykmeldinger/:sykmeldingId"
        exact
        component={DinSykmeldingContainer}
      />
      <Route
        path="/sykefravaer/oppfoelgingsplaner"
        exact
        component={OppfoelgingsPlanerOversiktContainer}
      />
      <Route
        path="/sykefravaer/oppfoelgingsplaner/:oppfoelgingsdialogId"
        exact
        component={OppfoelgingsplanContainer}
      />
      <Route path="/sykefravaer/vedtak" exact component={VedtakContainer} />
    </Router>
  );
};

const IngenAktivBrukerRouter = (): ReactElement => {
  return (
    <Router>
      <Route path="*" component={IngenBrukerContainer} />
    </Router>
  );
};

const AktivBrukerHentet = (): ReactElement => {
  const fnr = useValgtPersonident();
  if (!erGyldigFodselsnummer(fnr)) {
    return <IngenAktivBrukerRouter />;
  }
  return <AktivBrukerRouter />;
};

const AktivBrukerLoader = () => {
  const modiacontextState = useAppSelector((state) => state.modiacontext);
  const harForsoktHentetAktivBruker = modiacontextState.hentingBrukerForsokt;

  const dispatch = useDispatch();
  useEffect(() => {
    if (!modiacontextState.henterBruker && !harForsoktHentetAktivBruker) {
      dispatch(hentAktivBruker());
    }
  }, []);

  if (!harForsoktHentetAktivBruker) {
    return <AppSpinner />;
  }
  return <AktivBrukerHentet />;
};

const AppRouter = () => {
  const fnrFromParam = getFnrFromParams();

  if (erGyldigFodselsnummer(fnrFromParam)) {
    setAktivBrukerFromParams(fnrFromParam);
  }
  return AktivBrukerLoader();
};

export default AppRouter;
