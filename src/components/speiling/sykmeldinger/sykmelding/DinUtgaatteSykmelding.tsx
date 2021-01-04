import React from "react";
import { Utvidbar } from "@navikt/digisyfo-npm";
import SykmeldingStatuspanel from "../sykmeldingstatuspanel/SykmeldingStatuspanel";
import DineSykmeldingOpplysninger from "./sykmeldingOpplysninger/DineSykmeldingOpplysninger";
import { SykmeldingOldFormat } from "../../../../data/sykmelding/types/SykmeldingOldFormat";

const texts = {
  tittel: "Dine opplysninger",
};

interface DinUtgaatteSykmeldingProps {
  sykmelding: SykmeldingOldFormat;
  ledetekster: any;
}

const DinUtgatteSykmelding = (
  dinUtgaatteSykmeldingProps: DinUtgaatteSykmeldingProps
) => {
  const { sykmelding, ledetekster } = dinUtgaatteSykmeldingProps;
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
        <DineSykmeldingOpplysninger
          sykmelding={sykmelding}
          ledetekster={ledetekster}
        />
      </Utvidbar>
    </div>
  );
};

export default DinUtgatteSykmelding;
