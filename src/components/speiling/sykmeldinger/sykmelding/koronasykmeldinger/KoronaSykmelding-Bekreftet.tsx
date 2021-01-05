import React from "react";
import { Undertittel } from "nav-frontend-typografi";
import { SykmeldingOldFormat } from "../../../../../data/sykmelding/types/SykmeldingOldFormat";
import BekreftetSykmeldingStatuspanel from "../../sykmeldingstatuspanel/BekreftetSykmeldingStatuspanel";
import DineKoronaSykmeldingOpplysninger from "../sykmeldingOpplysninger/DineKoronaSykmeldingOpplysninger";
import Utvidbar from "../../../../Utvidbar";

const texts = {
  pageSubtitle: "for selvstendig næringsdrivende og frilansere",
  expandableTitle: "Dine opplysninger",
};

interface KoronaSykmeldingBekreftetProps {
  dinSykmelding: SykmeldingOldFormat;
}

const KoronaSykmeldingBekreftet = (
  koronaSykmeldingBekreftetProps: KoronaSykmeldingBekreftetProps
) => {
  const { dinSykmelding } = koronaSykmeldingBekreftetProps;
  return (
    <div>
      <Undertittel style={{ marginBottom: "2.5rem", textAlign: "center" }}>
        {texts.pageSubtitle}
      </Undertittel>
      <BekreftetSykmeldingStatuspanel sykmelding={dinSykmelding} />
      <Utvidbar
        erApen
        tittel={texts.expandableTitle}
        ikon="svg/person.svg"
        ikonHover="svg/person_hover.svg"
        ikonAltTekst="Du"
        className="blokk"
        variant="lysebla"
        Overskrift="h2"
      >
        <DineKoronaSykmeldingOpplysninger sykmelding={dinSykmelding} />
      </Utvidbar>
    </div>
  );
};

export default KoronaSykmeldingBekreftet;
