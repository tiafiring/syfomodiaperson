import React from "react";
import {
  SykmeldingOldFormat,
  SykmeldingStatus,
} from "../../../../data/sykmelding/types/SykmeldingOldFormat";
import { sorterSykmeldinger } from "../../../../utils/sorterSykmeldingerUtils";
import SykmeldingTeasere from "./SykmeldingTeasere";
import SykmeldingerSorteringContainer from "./SykmeldingerSorteringContainer";
import { useTrackOnClick } from "../../../../data/logging/loggingHooks";

const texts = {
  ingenSykmeldinger: "Tidligere sykmeldinger",
  ingenNyeSykmeldinger: "Du har ingen nye sykmeldinger",
  nyeSykmeldinger: "Nye sykmeldinger",
  apneSykmelding: "Åpne sykmelding",
};

interface DineSykmeldingerProps {
  fnr: string;
  sortering: any;
  sykmeldinger: SykmeldingOldFormat[];
}

const DineSykmeldinger = (dineSykmeldingerProps: DineSykmeldingerProps) => {
  const { sykmeldinger = [], sortering, fnr } = dineSykmeldingerProps;
  const nyeSykmeldinger = sykmeldinger.filter((sykmld) => {
    return sykmld.status === SykmeldingStatus.NY;
  });
  const tidligereSykmeldinger = sykmeldinger.filter((sykmld) => {
    return sykmld.status !== SykmeldingStatus.NY;
  });
  const tidligereSortering =
    sortering && sortering.tidligere ? sortering.tidligere : undefined;
  const trackOnClick = useTrackOnClick();

  return (
    <div>
      <SykmeldingTeasere
        sykmeldinger={sorterSykmeldinger(nyeSykmeldinger)}
        tittel={texts.nyeSykmeldinger}
        ingenSykmeldingerMelding={texts.ingenNyeSykmeldinger}
        className="js-nye-sykmeldinger"
        fnr={fnr}
        id="sykmelding-liste-nye"
        trackOnClick={() => trackOnClick(texts.apneSykmelding)}
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
          fnr={fnr}
          id="sykmelding-liste-tidligere"
          trackOnClick={() => trackOnClick(texts.apneSykmelding)}
        >
          <SykmeldingerSorteringContainer status="tidligere" />
        </SykmeldingTeasere>
      )}
    </div>
  );
};

export default DineSykmeldinger;
