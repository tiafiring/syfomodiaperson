import React from "react";
import DineSykmeldingOpplysninger from "./sykmeldingOpplysninger/DineSykmeldingOpplysninger";
import SykmeldingStatuspanel from "../sykmeldingstatuspanel/SykmeldingStatuspanel";
import { SykmeldingOldFormat } from "../../../../data/sykmelding/types/SykmeldingOldFormat";
import Utvidbar from "../../../Utvidbar";

const texts = {
  dineOpplysninger: "Dine opplysninger",
};

interface DinAvbrutteSykmeldingProps {
  sykmelding: SykmeldingOldFormat;
}

const DinAvbrutteSykmelding = (
  dinAvbrutteSykmeldingProps: DinAvbrutteSykmeldingProps
) => {
  const { sykmelding } = dinAvbrutteSykmeldingProps;
  return (
    <div>
      <SykmeldingStatuspanel sykmelding={sykmelding} />
      <Utvidbar
        className="blokk"
        erApen
        tittel={texts.dineOpplysninger}
        ikon="svg/person.svg"
        ikonHover="svg/person_hover.svg"
        ikonAltTekst="Du"
        variant="lysebla"
        Overskrift="H2"
      >
        <DineSykmeldingOpplysninger sykmelding={sykmelding} />
      </Utvidbar>
    </div>
  );
};

export default DinAvbrutteSykmelding;
