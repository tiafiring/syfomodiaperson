import React, { ReactElement } from "react";
import Panel from "nav-frontend-paneler";
import HistorikkEventItem from "./HistorikkEventItem";
import UtvidbarHistorikk from "./UtvidbarHistorikk";
import {
  TilfellePeriode,
  tilfellerNewestToOldest,
} from "../../utils/periodeUtils";
import { tilLesbarPeriodeMedArstall } from "../../utils/datoUtils";
import { HistorikkEvent } from "../../data/historikk/types/historikkTypes";

const texts = {
  errorMessage:
    "Det skjedde en feil! Det er ikke sikkert du får all historikken som finnes.",
  tidligereHendelserUtvidbarTitle: "Tidligere hendelser",
  laterEventsTitle: "Hendelser",
  tilfellerTitle: "Sykefraværstilfeller",
};

const byTidspunkt: () => (
  h1: HistorikkEvent,
  h2: HistorikkEvent
) => number = () => (h1: HistorikkEvent, h2: HistorikkEvent) => {
  return new Date(h2.tidspunkt).getTime() - new Date(h1.tidspunkt).getTime();
};

const isEventInPeriode = (
  event: HistorikkEvent,
  periode: TilfellePerioderMedSkyggeFom
): boolean => {
  return (
    new Date(periode.skyggeFom) < new Date(event.tidspunkt) &&
    new Date(event.tidspunkt) < new Date(periode.tom)
  );
};

const hentSykeforloepMedEvents = (
  periodeliste: TilfellePerioderMedSkyggeFom[],
  eventliste: HistorikkEvent[]
) => {
  return periodeliste.filter((periode: TilfellePerioderMedSkyggeFom) => {
    return eventliste.some((event: HistorikkEvent) =>
      isEventInPeriode(event, periode)
    );
  });
};

interface TidligereHendelserProps {
  eventsForForsteSykefravaer: HistorikkEvent[];
}

const TidligereHendelser = ({
  eventsForForsteSykefravaer,
}: TidligereHendelserProps) => {
  return (
    <>
      {eventsForForsteSykefravaer.length > 0 && (
        <UtvidbarHistorikk tittel={texts.tidligereHendelserUtvidbarTitle}>
          <ol className="historikkeventliste">
            {eventsForForsteSykefravaer
              .sort(byTidspunkt())
              .map((event, idx) => {
                return <HistorikkEventItem key={idx} event={event} />;
              })}
          </ol>
        </UtvidbarHistorikk>
      )}
    </>
  );
};

interface HistorikkProps {
  historikkEvents: HistorikkEvent[];
  tilfeller: TilfellePeriode[];
}

type TilfellePerioderMedSkyggeFom = TilfellePeriode & { skyggeFom: Date };

// Dette er en hack for at alle historikkEvents skal få en plassering i et sykefraværstilfellet, selv om de skjer "utenfor".
const tilfellerSortertMedSkyggeFom = (
  tilfeller: TilfellePeriode[]
): TilfellePerioderMedSkyggeFom[] => {
  const tilfellerSortert = tilfellerNewestToOldest(tilfeller).map(
    (tilfellePeriode) => ({
      ...tilfellePeriode,
      skyggeFom: new Date(),
    })
  );

  for (let i = 0; i < tilfellerSortert.length; i += 1) {
    if (i === tilfellerSortert.length - 1) {
      tilfellerSortert[i].skyggeFom = new Date(tilfellerSortert[i].fom);
    } else {
      tilfellerSortert[i].skyggeFom?.setDate(
        new Date(tilfellerSortert[i + 1].tom).getDate() + 1
      );
    }
  }

  return tilfellerSortert;
};

const Historikk = ({
  historikkEvents,
  tilfeller,
}: HistorikkProps): ReactElement => {
  const tilfellerSortert = tilfellerSortertMedSkyggeFom(tilfeller);
  const eventsEtterSisteSykefravaer = historikkEvents.filter(
    (event: HistorikkEvent) => {
      return new Date(event.tidspunkt) > new Date(tilfellerSortert[0].tom);
    }
  );
  const eventsForForsteSykefravaer = historikkEvents.filter(
    (event: HistorikkEvent) => {
      return (
        new Date(event.tidspunkt) <
        new Date(tilfellerSortert[tilfellerSortert.length - 1].fom)
      );
    }
  );
  const perioderMedEvents = hentSykeforloepMedEvents(
    tilfellerSortert,
    historikkEvents
  );

  return (
    <>
      {eventsEtterSisteSykefravaer.length > 0 && (
        <Panel className="blokk">
          <h2 className="panel__tittel">{texts.laterEventsTitle}</h2>
          <ol className="historikkeventliste">
            {eventsEtterSisteSykefravaer
              .sort(byTidspunkt())
              .map((event: HistorikkEvent, index: number) => (
                <HistorikkEventItem event={event} key={index} />
              ))}
          </ol>
        </Panel>
      )}
      {perioderMedEvents.length > 0 && (
        <div className="blokk--l">
          <h2 className="panel__tittel">{texts.tilfellerTitle}</h2>
          {perioderMedEvents.map(
            (periode: TilfellePerioderMedSkyggeFom, index: number) => (
              <UtvidbarHistorikk
                key={index}
                tittel={tilLesbarPeriodeMedArstall(periode.fom, periode.tom)}
              >
                <ol className="historikkeventliste">
                  {historikkEvents
                    .filter((event) => isEventInPeriode(event, periode))
                    .sort(byTidspunkt())
                    .map((event, idx) => (
                      <HistorikkEventItem key={idx} event={event} />
                    ))}
                </ol>
              </UtvidbarHistorikk>
            )
          )}
        </div>
      )}
      <TidligereHendelser
        eventsForForsteSykefravaer={eventsForForsteSykefravaer}
      />
    </>
  );
};

export default Historikk;
