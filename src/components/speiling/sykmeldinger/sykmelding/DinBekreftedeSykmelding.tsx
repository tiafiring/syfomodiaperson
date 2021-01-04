import React from "react";
import { Utvidbar } from "@navikt/digisyfo-npm";
import { SykmeldingOldFormat } from "../../../../data/sykmelding/types/SykmeldingOldFormat";
import ArbeidsgiversSykmelding from "./ArbeidsgiversSykmelding";
import BekreftetSykmeldingStatuspanel from "../sykmeldingstatuspanel/BekreftetSykmeldingStatuspanel";
import DineSykmeldingOpplysninger from "./sykmeldingOpplysninger/DineSykmeldingOpplysninger";

const texts = {
  tittel: "Dine opplysinger",
};

interface DinBekreftedeSykmeldingProps {
  dinSykmelding: SykmeldingOldFormat;
  arbeidsgiversSykmelding: SykmeldingOldFormat;
  ledetekster: any;
}

const DinBekreftedeSykmelding = (
  dinBekreftedeSykmeldingProps: DinBekreftedeSykmeldingProps
) => {
  const {
    dinSykmelding,
    arbeidsgiversSykmelding,
    ledetekster,
  } = dinBekreftedeSykmeldingProps;
  return (
    <div>
      <BekreftetSykmeldingStatuspanel sykmelding={dinSykmelding} />
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
      {dinSykmelding.valgtArbeidssituasjon === "ARBEIDSTAKER" && (
        <div className="blokk">
          <ArbeidsgiversSykmelding
            sykmelding={arbeidsgiversSykmelding}
            ledetekster={ledetekster}
          />
        </div>
      )}
    </div>
  );
};

export default DinBekreftedeSykmelding;
