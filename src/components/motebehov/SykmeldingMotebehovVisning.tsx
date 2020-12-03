import React from "react";
import MeldingTilArbeidsgiver from "./MeldingTilArbeidsgiver.tsx";
import MeldingTilNav from "./MeldingTilNav.tsx";
import BedreArbeidsevnen from "./BedreArbeidsevnen.tsx";
import UtdypendeOpplysninger from "./UtdypendeOpplysninger.tsx";
import TilbakeIArbeid from "./TilbakeIArbeid.tsx";
import GenerellSykmeldingInfo from "./GenerellSykmeldingInfo";
import MulighetForArbeid from "./MulighetForArbeid.tsx";

interface SykmeldingMotebehovVisningProps {
  sykmelding: any;
}

const SykmeldingMotebehovVisning = (
  sykmeldingMotebehovVisningProps: SykmeldingMotebehovVisningProps
) => {
  const sykmelding = sykmeldingMotebehovVisningProps.sykmelding;
  return (
    <div className="sykmeldingMotebehovVisning">
      <GenerellSykmeldingInfo sykmelding={sykmelding} />
      <MulighetForArbeid sykmelding={sykmelding} />
      <TilbakeIArbeid sykmelding={sykmelding} />
      <UtdypendeOpplysninger sykmelding={sykmelding} />
      <BedreArbeidsevnen sykmelding={sykmelding} />
      <MeldingTilNav sykmelding={sykmelding} />
      <MeldingTilArbeidsgiver sykmelding={sykmelding} />
    </div>
  );
};

export default SykmeldingMotebehovVisning;
