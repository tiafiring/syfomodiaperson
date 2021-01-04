import React from "react";
import { SykmeldingCheckbox } from "../components/speiling/sykmeldinger/sykmelding/sykmeldingOpplysninger/SykmeldingCheckbox";
import SykmeldingOpplysning from "../components/speiling/sykmeldinger/sykmelding/sykmeldingOpplysninger/flereopplysninger/SykmeldingOpplysning";

export const getSykmeldingCheckbox = (
  sykmeldingBolk: any,
  felt: string,
  tekst: any,
  className?: string
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

export const getSykmeldingOpplysning = (
  sykmeldingBolk: any,
  felt: any,
  tittel: string,
  opplysning?: any,
  Overskrift = "h5"
) => {
  if (sykmeldingBolk[felt]) {
    return (
      <SykmeldingOpplysning tittel={tittel} Overskrift={Overskrift}>
        <p className={`opplysning__verdi js-${felt}`}>
          {opplysning || sykmeldingBolk[felt]}
        </p>
      </SykmeldingOpplysning>
    );
  }
  return null;
};
