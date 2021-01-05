import React from "react";
import { Undertittel } from "nav-frontend-typografi";
import { SykmeldingOldFormat } from "../../../../../data/sykmelding/types/SykmeldingOldFormat";
import SykmeldingStatuspanel from "../../sykmeldingstatuspanel/SykmeldingStatuspanel";
import DineKoronaSykmeldingOpplysninger from "../sykmeldingOpplysninger/DineKoronaSykmeldingOpplysninger";
import Utvidbar from "../../../../Utvidbar";

const texts = {
  pageSubtitle: "for selvstendig næringsdrivende og frilansere",
  expandableTitle: "Dine opplysninger",
};

interface KoronaSykmeldingAvbruttProps {
  sykmelding: SykmeldingOldFormat;
}

const KoronaSykmeldingAvbrutt = (
  koronaSykmeldingAvbruttProps: KoronaSykmeldingAvbruttProps
) => {
  const { sykmelding } = koronaSykmeldingAvbruttProps;
  return (
    <div>
      <Undertittel style={{ marginBottom: "2.5rem", textAlign: "center" }}>
        {texts.pageSubtitle}
      </Undertittel>
      <SykmeldingStatuspanel sykmelding={sykmelding} />
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
        <DineKoronaSykmeldingOpplysninger sykmelding={sykmelding} />
      </Utvidbar>
    </div>
  );
};

export default KoronaSykmeldingAvbrutt;
