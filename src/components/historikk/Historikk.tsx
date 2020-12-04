import React from "react";
import Panel from "nav-frontend-paneler";
import Alertstripe from "nav-frontend-alertstriper";
import HistorikkEvent from "./HistorikkEvent";
import AppSpinner from "../AppSpinner";
import IngenHistorikk from "./IngenHistorikk";
import UtvidbarHistorikk from "./UtvidbarHistorikk";
import Sidetopp from "../Sidetopp";
import {
  tilfellerFromTilfelleperioder,
  tilfellerNewestToOldest,
} from "../../utils/periodeUtils";
import { tilLesbarPeriodeMedArstall } from "../../utils/datoUtils";

const texts = {
  errorMessage:
    "Det skjedde en feil! Det er ikke sikkert du får all historikken som finnes.",
  tidligereHendelserUtvidbarTitle: "Tidligere hendelser",
  laterEventsTitle: "Hendelser",
  tilfellerTitle: "Sykefraværstilfeller",
};

const hentSykeforloepMedEvents = (periodeliste: any[], eventliste: any[]) => {
  return periodeliste.filter((periode: any) => {
    return (
      eventliste.filter((event: any) => {
        return (
          new Date(periode.skyggeFom) < new Date(event.tidspunkt) &&
          new Date(event.tidspunkt) < new Date(periode.tom)
        );
      }).length > 0
    );
  });
};

const createHistorikkEventsFromLedere = (ledere: any[]) => {
  return ledere.map((leder: any) => {
    return {
      opprettetAv: leder.organisasjonsnavn,
      tekst: `${leder.organisasjonsnavn} har oppgitt ${leder.navn} som nærmeste leder`,
      tidspunkt: leder.fomDato,
      kilde: "LEDER",
    };
  });
};

const Feilmelding = () => {
  return (
    <Alertstripe type="advarsel" className="blokk">
      <p>{texts.errorMessage}</p>
    </Alertstripe>
  );
};

interface TidligereHendelserProps {
  eventsForForsteSykefravaer: any[];
}

const TidligereHendelser = (
  tidligereHendelserProps: TidligereHendelserProps
) => {
  const eventsForForsteSykefravaer =
    tidligereHendelserProps.eventsForForsteSykefravaer;
  return (
    <React.Fragment>
      {eventsForForsteSykefravaer.length > 0 && (
        <UtvidbarHistorikk tittel={texts.tidligereHendelserUtvidbarTitle}>
          <ol className="historikkeventliste">
            {eventsForForsteSykefravaer
              .sort((h1: any, h2: any) => {
                return (
                  new Date(h2.tidspunkt).getTime() -
                  new Date(h1.tidspunkt).getTime()
                );
              })
              .map((event, idx) => {
                return <HistorikkEvent key={idx} event={event} />;
              })}
          </ol>
        </UtvidbarHistorikk>
      )}
    </React.Fragment>
  );
};

interface HistorikkProps {
  historikk: any;
  ledere: any[];
  oppfolgingstilfelleperioder: any;
}

const Historikk = (historikkProps: HistorikkProps) => {
  const { historikk, ledere, oppfolgingstilfelleperioder } = historikkProps;
  const tilfeller = tilfellerFromTilfelleperioder(oppfolgingstilfelleperioder);
  const lederHistorikk = createHistorikkEventsFromLedere(ledere);
  const historikkEvents = historikk.motebehovHistorikk
    .concat(historikk.moteHistorikk)
    .concat(historikk.oppfoelgingsdialogHistorikk)
    .concat(lederHistorikk);
  if (
    !tilfeller ||
    tilfeller.length === 0 ||
    (historikk.hentetMoter &&
      historikk.hentetMotebehov &&
      historikk.hentetOppfoelgingsdialoger &&
      historikkEvents.length === 0)
  ) {
    return <IngenHistorikk />;
  }

  const tilfellerSortert = tilfellerNewestToOldest(tilfeller);
  // Dette er en hack for at alle historikkEvents skal få en plassering i et sykefraværstilfellet, selv om de skjer "utenfor".
  for (let i = 0; i < tilfellerSortert.length; i += 1) {
    if (i === tilfellerSortert.length - 1) {
      tilfellerSortert[i].skyggeFom = new Date(tilfellerSortert[i].fom);
    } else {
      tilfellerSortert[i].skyggeFom = new Date(tilfellerSortert[i + 1].tom);
      tilfellerSortert[i].skyggeFom.setDate(
        tilfellerSortert[i].skyggeFom.getDate() + 1
      );
    }
  }

  const eventsEtterSisteSykefravaer = historikkEvents.filter((event: any) => {
    return new Date(event.tidspunkt) > new Date(tilfellerSortert[0].tom);
  });

  const eventsForForsteSykefravaer = historikkEvents.filter((event: any) => {
    return (
      new Date(event.tidspunkt) <
      new Date(tilfellerSortert[tilfellerSortert.length - 1].fom)
    );
  });

  const perioderMedEvents = hentSykeforloepMedEvents(
    tilfellerSortert,
    historikkEvents
  );

  return (
    <div>
      {historikk.hentingFeilet && <Feilmelding />}
      <Sidetopp tittel="Logg" />
      <div>
        {(historikk.henterOppfoelgingsdialoger ||
          historikk.henterMotebehov ||
          historikk.henterMoter) && <AppSpinner />}
        {eventsEtterSisteSykefravaer.length > 0 && (
          <Panel className="blokk">
            <h2 className="panel__tittel">{texts.laterEventsTitle}</h2>
            <ol className="historikkeventliste">
              {eventsEtterSisteSykefravaer
                .sort((h1: any, h2: any) => {
                  return (
                    new Date(h2.tidspunkt).getTime() -
                    new Date(h1.tidspunkt).getTime()
                  );
                })
                .map((event: any, index: number) => {
                  return <HistorikkEvent event={event} key={index} />;
                })}
            </ol>
          </Panel>
        )}
        {perioderMedEvents.length > 0 && (
          <div className="blokk--l">
            <h2 className="panel__tittel">{texts.tilfellerTitle}</h2>
            {perioderMedEvents.map((periode: any, index: number) => {
              return (
                <UtvidbarHistorikk
                  key={index}
                  tittel={tilLesbarPeriodeMedArstall(periode.fom, periode.tom)}
                >
                  <ol className="historikkeventliste">
                    {historikkEvents
                      .sort((h1: any, h2: any) => {
                        return (
                          new Date(h2.tidspunkt).getTime() -
                          new Date(h1.tidspunkt).getTime()
                        );
                      })
                      .map((event: any, idx: number) => {
                        if (
                          new Date(periode.skyggeFom) <
                            new Date(event.tidspunkt) &&
                          new Date(event.tidspunkt) < new Date(periode.tom)
                        ) {
                          return <HistorikkEvent key={idx} event={event} />;
                        }
                        return null;
                      })}
                  </ol>
                </UtvidbarHistorikk>
              );
            })}
          </div>
        )}
        <TidligereHendelser
          eventsForForsteSykefravaer={eventsForForsteSykefravaer}
        />
      </div>
    </div>
  );
};

export default Historikk;
