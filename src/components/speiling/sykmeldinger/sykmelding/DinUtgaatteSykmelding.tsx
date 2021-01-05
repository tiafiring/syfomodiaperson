import React from "react";
import SykmeldingStatuspanel from "../sykmeldingstatuspanel/SykmeldingStatuspanel";
import DineSykmeldingOpplysninger from "./sykmeldingOpplysninger/DineSykmeldingOpplysninger";
import { SykmeldingOldFormat } from "../../../../data/sykmelding/types/SykmeldingOldFormat";
import Utvidbar from "../../../Utvidbar";

const texts = {
  tittel: "Dine opplysninger",
};

interface DinUtgaatteSykmeldingProps {
  sykmelding: SykmeldingOldFormat;
}

const DinUtgatteSykmelding = (
  dinUtgaatteSykmeldingProps: DinUtgaatteSykmeldingProps
) => {
  const { sykmelding } = dinUtgaatteSykmeldingProps;
  return (
    <div>
      <SykmeldingStatuspanel sykmelding={sykmelding} />
      <Utvidbar
        className="blokk"
        erApen
        tittel={texts.tittel}
        ikon="svg/doctor-2.svg"
        ikonHover="svg/doctor-2_hover.svg"
        ikonAltTekst="Lege"
        variant="lysebla"
      >
        <DineSykmeldingOpplysninger sykmelding={sykmelding} />
      </Utvidbar>
    </div>
  );
};

export default DinUtgatteSykmelding;
