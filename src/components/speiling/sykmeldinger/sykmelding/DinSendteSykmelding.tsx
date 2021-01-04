import React from "react";
import { Utvidbar } from "@navikt/digisyfo-npm";
import { SykmeldingOldFormat } from "../../../../data/sykmelding/types/SykmeldingOldFormat";
import ArbeidsgiversSykmelding from "./ArbeidsgiversSykmelding";
import DineSykmeldingOpplysninger from "./sykmeldingOpplysninger/DineSykmeldingOpplysninger";
import SykmeldingStatuspanel from "../sykmeldingstatuspanel/SykmeldingStatuspanel";

const texts = {
  tittel: "Dine opplysinger",
};

interface DinSendteSykmeldingProps {
  dinSykmelding: SykmeldingOldFormat;
  ledetekster: any;
  arbeidsgiversSykmelding: SykmeldingOldFormat;
}

const DinSendteSykmelding = (
  dinSendteSykmeldingProps: DinSendteSykmeldingProps
) => {
  const {
    dinSykmelding,
    ledetekster,
    arbeidsgiversSykmelding,
  } = dinSendteSykmeldingProps;
  return (
    <div>
      <SykmeldingStatuspanel sykmelding={dinSykmelding} />
      <Utvidbar
        className="blokk"
        erApen
        tittel={texts.tittel}
        ikon="svg/person.svg"
        ikonHover="svg/person_hover.svg"
        ikonAltTekst="Du"
        variant="lysebla"
        Overskrift="h2"
      >
        <DineSykmeldingOpplysninger sykmelding={dinSykmelding} />
      </Utvidbar>
      <div className="blokk--l">
        <ArbeidsgiversSykmelding
          sykmelding={arbeidsgiversSykmelding}
          ledetekster={ledetekster}
        />
      </div>
    </div>
  );
};

export default DinSendteSykmelding;
