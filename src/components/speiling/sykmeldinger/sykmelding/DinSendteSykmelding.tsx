import React from "react";
import { SykmeldingOldFormat } from "@/data/sykmelding/types/SykmeldingOldFormat";
import ArbeidsgiversSykmelding from "./ArbeidsgiversSykmelding";
import DineSykmeldingOpplysninger from "./sykmeldingOpplysninger/DineSykmeldingOpplysninger";
import SykmeldingStatuspanel from "../sykmeldingstatuspanel/SykmeldingStatuspanel";
import Utvidbar from "../../../Utvidbar";
import {
  PersonHoverImage,
  PersonImage,
} from "../../../../../img/ImageComponents";

const texts = {
  tittel: "Dine opplysinger",
};

interface DinSendteSykmeldingProps {
  dinSykmelding: SykmeldingOldFormat;
  arbeidsgiversSykmelding: SykmeldingOldFormat;
}

const DinSendteSykmelding = (
  dinSendteSykmeldingProps: DinSendteSykmeldingProps
) => {
  const { dinSykmelding, arbeidsgiversSykmelding } = dinSendteSykmeldingProps;
  return (
    <div>
      <SykmeldingStatuspanel sykmelding={dinSykmelding} />
      <Utvidbar
        className="blokk"
        erApen
        tittel={texts.tittel}
        ikon={PersonImage}
        ikonHover={PersonHoverImage}
        ikonAltTekst="Du"
        variant="lysebla"
        Overskrift="h2"
      >
        <DineSykmeldingOpplysninger sykmelding={dinSykmelding} />
      </Utvidbar>
      <div className="blokk--l">
        <ArbeidsgiversSykmelding sykmelding={arbeidsgiversSykmelding} />
      </div>
    </div>
  );
};

export default DinSendteSykmelding;
