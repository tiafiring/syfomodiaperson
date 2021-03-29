import React, { useEffect } from "react";
import { useDispatch } from "react-redux";
import { Link } from "react-router-dom";
import Alertstripe from "nav-frontend-alertstriper";
import Sidetopp from "../../Sidetopp";
import {
  erIdag,
  erIkkeIdag,
  leggTilDagerPaDato,
  restdatoTilLesbarDato,
  tilLesbarPeriodeMedArstall,
} from "../../../utils/datoUtils";
import { hentVirksomhet } from "../../../data/virksomhet/virksomhet_actions";
import OppfolgingsplanerOversiktLPS from "../lps/OppfolgingsplanerOversiktLPS";
import { OppfolgingsplanLPS } from "../../../data/oppfolgingsplan/types/OppfolgingsplanLPS";
import { OppfolgingsplanDTO } from "../../../data/oppfolgingsplan/oppfoelgingsdialoger";

const texts = {
  titles: {
    relevantOppfolgingsplaner: "Aktive oppfølgingsplaner",
    inactiveOppfolgingsplaner: "Tidligere oppfølgingsplaner",
    lpsOppfolgingsplaner: "Oppfølgingsplaner med bistandsbehov",
  },
  alertMessages: {
    noRelevantOppfolgingsplaner: "Det er ingen aktive oppfølgingsplaner.",
    noInactiveOppfolgingsplaner: "Det er ingen tidligere oppfølgingsplaner.",
    noLPSOppfolgingsplaner: "Det er ingen oppfølgingsplaner med bistandsbehov",
  },
  duration: "Varighet",
  shared: "Delt med NAV",
};

const durationText = (plan: any) => {
  return `${texts.duration} ${tilLesbarPeriodeMedArstall(
    plan.godkjentPlan.gyldighetstidspunkt.fom,
    plan.godkjentPlan.gyldighetstidspunkt.tom
  )}`;
};

const deltMedNavText = (plan: any) => {
  const sharedDate =
    plan.godkjentPlan &&
    restdatoTilLesbarDato(plan.godkjentPlan.deltMedNAVTidspunkt);
  return `${texts.shared} ${sharedDate}`;
};

interface OppfolgingsplanerOversiktProps {
  aktiveDialoger: OppfolgingsplanDTO[];
  inaktiveDialoger: OppfolgingsplanDTO[];
  fnr: string;
  oppfolgingsplanerLPS: OppfolgingsplanLPS[];
  veilederIdent: string;
}

const OppfolgingsplanerOversikt = (
  oppfolgingsplanerOversiktProps: OppfolgingsplanerOversiktProps
) => {
  const {
    fnr,
    aktiveDialoger,
    inaktiveDialoger,
    oppfolgingsplanerLPS,
    veilederIdent,
  } = oppfolgingsplanerOversiktProps;

  const dispatch = useDispatch();

  const oppfolgingsplanerLPSUnprocessed = oppfolgingsplanerLPS
    .filter((oppfolgingsplanLPS: OppfolgingsplanLPS) => {
      if (oppfolgingsplanLPS.personoppgave) {
        if (oppfolgingsplanLPS.personoppgave.behandletTidspunkt) {
          return (
            Date.now() <
            leggTilDagerPaDato(
              oppfolgingsplanLPS.personoppgave.behandletTidspunkt,
              1
            ).getTime()
          );
        }
        return !oppfolgingsplanLPS.personoppgave.behandletTidspunkt;
      }
      return erIdag(oppfolgingsplanLPS.opprettet);
    })
    .sort((a, b) => {
      return new Date(a.opprettet).getTime() - new Date(b.opprettet).getTime();
    });

  const oppfolgingsplanerLPSProcessed = oppfolgingsplanerLPS
    .filter((oppfolgingsplanLPS) => {
      if (oppfolgingsplanLPS.personoppgave) {
        return oppfolgingsplanLPS.personoppgave.behandletTidspunkt;
      }
      return erIkkeIdag(oppfolgingsplanLPS.opprettet);
    })
    .sort((a, b) => {
      return new Date(a.opprettet).getTime() - new Date(b.opprettet).getTime();
    });

  useEffect(() => {
    const virksomhetsnummerSet = new Set();
    aktiveDialoger.forEach((plan) => {
      virksomhetsnummerSet.add(plan.virksomhet.virksomhetsnummer);
    });
    inaktiveDialoger.forEach((plan) => {
      virksomhetsnummerSet.add(plan.virksomhet.virksomhetsnummer);
    });
    oppfolgingsplanerLPS.forEach((planLPS) => {
      virksomhetsnummerSet.add(planLPS.virksomhetsnummer);
    });
    virksomhetsnummerSet.forEach((virksomhetsnummer: string) => {
      dispatch(hentVirksomhet(virksomhetsnummer));
    });
  }, []);

  aktiveDialoger.sort((a, b) => {
    return (
      new Date(b.godkjentPlan.deltMedNAVTidspunkt).getTime() -
      new Date(a.godkjentPlan.deltMedNAVTidspunkt).getTime()
    );
  });

  inaktiveDialoger.sort((a, b) => {
    return (
      new Date(b.godkjentPlan.deltMedNAVTidspunkt).getTime() -
      new Date(a.godkjentPlan.deltMedNAVTidspunkt).getTime()
    );
  });

  return (
    <div>
      <Sidetopp tittel="Oppfølgingsplaner" />
      <div className="blokk--l">
        <h2 className="typo-systemtittel blokk--xs">
          {texts.titles.relevantOppfolgingsplaner}
        </h2>
        {aktiveDialoger.length === 0 &&
          oppfolgingsplanerLPSUnprocessed.length === 0 && (
            <Alertstripe type="info">
              <p>{texts.alertMessages.noRelevantOppfolgingsplaner}</p>
            </Alertstripe>
          )}
        {oppfolgingsplanerLPSUnprocessed.map((planLPS, index) => {
          return (
            <OppfolgingsplanerOversiktLPS
              key={index}
              oppfolgingsplanLPSBistandsbehov={planLPS}
              veilederIdent={veilederIdent}
            />
          );
        })}
        {aktiveDialoger.map((dialog, index) => {
          return (
            <Link
              key={index}
              className="navigasjonspanel navigasjonspanel--stor"
              to={`/sykefravaer/${fnr}/oppfoelgingsplaner/${dialog.id}`}
            >
              <div className="navigasjonselement">
                <h3 className="panel__tittel navigasjonselement__tittel">
                  {dialog.virksomhet.navn}
                </h3>
                <p className="navigasjonselement__undertittel">
                  {durationText(dialog)}
                </p>
                <p className="navigasjonselement__undertekst">
                  {deltMedNavText(dialog)}
                </p>
              </div>
            </Link>
          );
        })}
      </div>

      <h2 className="typo-systemtittel blokk--xs">
        {texts.titles.inactiveOppfolgingsplaner}
      </h2>
      {inaktiveDialoger.length === 0 &&
        oppfolgingsplanerLPSProcessed.length === 0 && (
          <Alertstripe type="info">
            <p>{texts.alertMessages.noInactiveOppfolgingsplaner}</p>
          </Alertstripe>
        )}
      {inaktiveDialoger.map((dialog, index) => {
        return (
          <Link
            key={index}
            className="navigasjonspanel navigasjonspanel--stor"
            to={`/sykefravaer/${fnr}/oppfoelgingsplaner/${dialog.id}`}
          >
            <div className="navigasjonselement">
              <h3 className="panel__tittel navigasjonselement__tittel">
                {dialog.virksomhet.navn}
              </h3>
              <p className="navigasjonselement__undertittel">
                {durationText(dialog)}
              </p>
              <p className="navigasjonselement__undertekst">
                {deltMedNavText(dialog)}
              </p>
            </div>
          </Link>
        );
      })}
      {oppfolgingsplanerLPSProcessed.map((planLPS, index) => {
        return (
          <OppfolgingsplanerOversiktLPS
            key={index}
            oppfolgingsplanLPSBistandsbehov={planLPS}
            veilederIdent={veilederIdent}
          />
        );
      })}
    </div>
  );
};

export default OppfolgingsplanerOversikt;
