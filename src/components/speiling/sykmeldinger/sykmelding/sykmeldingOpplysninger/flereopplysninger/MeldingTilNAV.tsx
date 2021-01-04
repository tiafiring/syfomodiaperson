import React from "react";
import { SykmeldingOldFormat } from "../../../../../../data/sykmelding/types/SykmeldingOldFormat";
import { SykmeldingCheckboxSelvstendig } from "../SykmeldingCheckbox";

const texts = {
  begrunnelse: "Begrunn nærmere",
  bistandNAV: "Ønskes bistand fra NAV nå?",
  meldingTilNAV: "Melding til NAV",
};

interface MeldingTilNAVProps {
  sykmelding: SykmeldingOldFormat;
}

const MeldingTilNAV = (meldingTilNAVProps: MeldingTilNAVProps) => {
  const { sykmelding } = meldingTilNAVProps;
  if (!sykmelding.meldingTilNav.navBoerTaTakISaken) {
    return <span />;
  }
  return (
    <div className="sykmeldingSeksjon">
      <h4 className="sykmeldingSeksjon__tittel">{texts.meldingTilNAV}</h4>
      <SykmeldingCheckboxSelvstendig
        tekst={texts.bistandNAV}
        jsClassName="navBoerTaTakISaken"
      />
      {!sykmelding.meldingTilNav.navBoerTaTakISakenBegrunnelse ? null : (
        <div className="opplysning subopplysning">
          <h6 className="opplysning__tittel">{texts.begrunnelse}</h6>
          <p className="opplysning__verdi js-navBoerTaTakISakenBegrunnelse">
            {sykmelding.meldingTilNav.navBoerTaTakISakenBegrunnelse}
          </p>
        </div>
      )}
    </div>
  );
};

export default MeldingTilNAV;
