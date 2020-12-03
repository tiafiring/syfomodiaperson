import React from "react";
import PropTypes from "prop-types";
import { erFriskmeldingInformasjon } from "../../utils/sykmeldinger/sykmeldingUtils";
import TilbakeIArbeidMedArbeidsgiver from "./TilbakeIArbeidMedArbeidsgiver";
import TilbakeIArbeidUtenArbeidsgiver from "./TilbakeIArbeidUtenArbeidsgiver";

interface TilbakeIArbeidProps {
  sykmelding: any;
}

export const TilbakeIArbeid = (tilbakeIArbeidProps: TilbakeIArbeidProps) => {
  const sykmelding = tilbakeIArbeidProps.sykmelding;
  const friskmelding = sykmelding.friskmelding;
  const skalVise = erFriskmeldingInformasjon(sykmelding);
  return (
    skalVise && (
      <div className="sykmeldingMotebehovVisning__avsnitt">
        <TilbakeIArbeidMedArbeidsgiver friskmelding={friskmelding} />
        <TilbakeIArbeidUtenArbeidsgiver friskmelding={friskmelding} />
      </div>
    )
  );
};

TilbakeIArbeid.propTypes = {
  sykmelding: PropTypes.object,
};

export default TilbakeIArbeid;
