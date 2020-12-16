import React from "react";
import { sorterSykmeldinger } from "@navikt/digisyfo-npm";
import {
  SykmeldingOldFormat,
  SykmeldingStatus,
} from "../../../../data/sykmelding/types/SykmeldingOldFormat";
import SykmeldingTeasere from "./SykmeldingTeasere";
import SykmeldingerSorteringContainer from "./SykmeldingerSorteringContainer";

const texts = {
  ingenSykmeldinger: "Tidligere sykmeldinger",
  ingenNyeSykmeldinger: "Du har ingen nye sykmeldinger",
  nyeSykmeldinger: "Nye sykmeldinger",
};

interface DineSykmeldingerProps {
  fnr: string;
  ledetekster: any;
  sortering: any;
  sykmeldinger: SykmeldingOldFormat[];
}

const DineSykmeldinger = (dineSykmeldingerProps: DineSykmeldingerProps) => {
  const {
    sykmeldinger = [],
    ledetekster = {},
    sortering,
    fnr,
  } = dineSykmeldingerProps;
  const nyeSykmeldinger = sykmeldinger.filter((sykmld) => {
    return sykmld.status === SykmeldingStatus.NY;
  });
  const tidligereSykmeldinger = sykmeldinger.filter((sykmld) => {
    return sykmld.status !== SykmeldingStatus.NY;
  });
  const tidligereSortering =
    sortering && sortering.tidligere ? sortering.tidligere : undefined;
  return (
    <div>
      <SykmeldingTeasere
        sykmeldinger={sorterSykmeldinger(nyeSykmeldinger)}
        tittel={texts.nyeSykmeldinger}
        ingenSykmeldingerMelding={texts.ingenNyeSykmeldinger}
        className="js-nye-sykmeldinger"
        ledetekster={ledetekster}
        fnr={fnr}
        id="sykmelding-liste-nye"
      />
      {tidligereSykmeldinger.length > 0 && (
        <SykmeldingTeasere
          sykmeldinger={sorterSykmeldinger(
            tidligereSykmeldinger,
            tidligereSortering
          )}
          tittel={texts.ingenSykmeldinger}
          ingenSykmeldingerMelding={texts.ingenSykmeldinger}
          className="js-tidligere-sykmeldinger"
          ledetekster={ledetekster}
          fnr={fnr}
          id="sykmelding-liste-tidligere"
        >
          <SykmeldingerSorteringContainer status="tidligere" />
        </SykmeldingTeasere>
      )}
    </div>
  );
};

export default DineSykmeldinger;
