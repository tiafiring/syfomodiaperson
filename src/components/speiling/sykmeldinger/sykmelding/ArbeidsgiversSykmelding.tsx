import React from "react";
import { Utvidbar } from "@navikt/digisyfo-npm";
import { SykmeldingOldFormat } from "../../../../data/sykmelding/types/SykmeldingOldFormat";
import ArbeidsgiversSykmeldingOpplysninger from "./ArbeidsgiversSykmeldingOpplysninger";

interface ArbeidsgiversSykmeldingProps {
  sykmelding: SykmeldingOldFormat;
  ledetekster: any;
  Overskrift?: string;
  erApen?: boolean;
}

const ArbeidsgiversSykmelding = (
  arbeidsgiversSykmeldingProps: ArbeidsgiversSykmeldingProps
) => {
  const {
    sykmelding,
    Overskrift = "h2",
    erApen = false,
  } = arbeidsgiversSykmeldingProps;
  return (
    <Utvidbar
      tittel="Dette får arbeidsgiveren din se"
      ikon="svg/doctor-2.svg"
      ikonHover="svg/doctor-2_hover.svg"
      ikonAltTekst="Lege"
      erApen={erApen}
      variant="lilla"
      Overskrift={Overskrift}
    >
      <ArbeidsgiversSykmeldingOpplysninger sykmelding={sykmelding} />
    </Utvidbar>
  );
};

export default ArbeidsgiversSykmelding;
