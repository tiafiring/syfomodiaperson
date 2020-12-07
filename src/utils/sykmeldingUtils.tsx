import React from "react";
import { SykmeldingCheckbox } from "../components/sykmelding/sykmeldingOpplysninger/SykmeldingCheckbox";

export const getSykmeldingCheckbox = (
  sykmeldingBolk: any,
  felt: string,
  tekst: any,
  className: string
) => {
  if (sykmeldingBolk[felt]) {
    return (
      <SykmeldingCheckbox
        tekst={tekst}
        jsClassName={felt}
        className={className}
      />
    );
  }
  return null;
};
