import React from "react";
import {
  ledereWithActiveLedereFirst,
  virksomheterWithoutLeder,
} from "../../../utils/ledereUtils";
import { Leder } from "../../../data/leder/ledere";
import { groupArrayByKey } from "../../../utils/sortUtils";
import PersonkortFeilmelding from "../PersonkortFeilmelding";
import PersonKortVirksomhetLedere from "./PersonKortVirksomhetLedere";
import PersonKortVirksomhetHeader from "./PersonKortVirksomhetHeader";

const texts = {
  noLeader:
    "Nærmeste leder mangler. Arbeidsgiveren må melde inn nærmeste leder i Altinn.",
};

export const sortLeaderListNewestFomDatoFirst = (leaderList: any[]) => {
  return [...leaderList].sort((l1, l2) => {
    return new Date(l2.fomDato).getTime() - new Date(l1.fomDato).getTime();
  });
};

interface PersonkortLedereProps {
  ledere: Leder[];
  sykmeldinger: any[];
}

const PersonkortLedere = (personkortLedereProps: PersonkortLedereProps) => {
  const { ledere, sykmeldinger } = personkortLedereProps;
  const virksomheterFromSykmeldinger = virksomheterWithoutLeder(
    ledere,
    sykmeldinger
  );
  const ledereWithActiveFirst = ledereWithActiveLedereFirst(
    ledere,
    sykmeldinger
  );

  const virksomhetLederMap = groupArrayByKey(
    sortLeaderListNewestFomDatoFirst(ledereWithActiveFirst),
    "orgnummer"
  );
  if (Object.keys(virksomhetLederMap).length === 0) {
    return <PersonkortFeilmelding>{texts.noLeader}</PersonkortFeilmelding>;
  } else {
    return (
      <div>
        {Object.keys(virksomhetLederMap).map((virksomhetsnummer, idx) => {
          return (
            <PersonKortVirksomhetLedere
              key={idx}
              sykmeldinger={sykmeldinger}
              virksomhetLederMap={virksomhetLederMap}
              virksomhetsnummer={virksomhetsnummer}
            />
          );
        })}
        {virksomheterFromSykmeldinger.map((virksomhet: any, idx: number) => {
          return (
            <PersonKortVirksomhetHeader
              key={idx}
              currentLeder={virksomhet}
              sykmeldinger={sykmeldinger}
            />
          );
        })}
      </div>
    );
  }
};

export default PersonkortLedere;
