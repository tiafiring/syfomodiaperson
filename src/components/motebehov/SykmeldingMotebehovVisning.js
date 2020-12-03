import React from "react";
import PropTypes from "prop-types";
import MeldingTilArbeidsgiver from "./MeldingTilArbeidsgiver.tsx";
import MeldingTilNav from "./MeldingTilNav.tsx";
import BedreArbeidsevnen from "./BedreArbeidsevnen.tsx";
import UtdypendeOpplysninger from "./UtdypendeOpplysninger";
import TilbakeIArbeid from "./TilbakeIArbeid";
import GenerellSykmeldingInfo from "./GenerellSykmeldingInfo";
import MulighetForArbeid from "./MulighetForArbeid";

const SykmeldingMotebehovVisning = ({ sykmelding }) => {
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

SykmeldingMotebehovVisning.propTypes = {
  sykmelding: PropTypes.object,
};

export default SykmeldingMotebehovVisning;
