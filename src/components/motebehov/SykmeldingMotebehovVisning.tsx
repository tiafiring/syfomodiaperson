import React from "react";
import MeldingTilArbeidsgiver from "./MeldingTilArbeidsgiver";
import MeldingTilNav from "./MeldingTilNav";
import BedreArbeidsevnen from "./BedreArbeidsevnen";
import UtdypendeOpplysninger from "./UtdypendeOpplysninger";
import TilbakeIArbeid from "./TilbakeIArbeid";
import GenerellSykmeldingInfo from "./GenerellSykmeldingInfo";
import MulighetForArbeid from "./MulighetForArbeid";

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
