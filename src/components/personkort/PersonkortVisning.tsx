import React from "react";
import { PERSONKORTVISNING_TYPE } from "../../konstanter";
import { BehandlendeEnhet } from "../../data/behandlendeenhet/types/BehandlendeEnhet";
import { Leder } from "../../data/leder/ledere";
import VisningLege from "./PersonkortLege";
import VisningLedere from "./ledere/PersonkortLedere";
import PersonkortSykmeldt from "./PersonkortSykmeldt";
import VisningEnhet from "./PersonkortEnhet";

interface PersonkortVisningProps {
  behandlendeEnhet: BehandlendeEnhet;
  fastleger: any;
  ledere: Leder[];
  navbruker: any;
  personadresse: any;
  sykmeldinger: any[];
  visning: string;
}

const PersonkortVisning = (personkortVisningProps: PersonkortVisningProps) => {
  const {
    behandlendeEnhet,
    fastleger,
    ledere,
    navbruker,
    personadresse,
    sykmeldinger,
    visning,
  } = personkortVisningProps;
  const { LEGE, LEDER, ENHET } = PERSONKORTVISNING_TYPE;

  return (
    <div className="personkortVisning">
      {(() => {
        switch (visning) {
          case LEGE: {
            return <VisningLege fastleger={fastleger} />;
          }
          case LEDER: {
            return (
              <VisningLedere ledere={ledere} sykmeldinger={sykmeldinger} />
            );
          }
          case ENHET: {
            return <VisningEnhet behandlendeEnhet={behandlendeEnhet} />;
          }
          default: {
            return (
              <PersonkortSykmeldt
                navbruker={navbruker}
                personadresse={personadresse}
              />
            );
          }
        }
      })()}
    </div>
  );
};

export default PersonkortVisning;
