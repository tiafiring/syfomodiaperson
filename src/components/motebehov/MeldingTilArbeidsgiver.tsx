import React from "react";
import { erMeldingTilArbeidsgiverInformasjon } from "@/utils/sykmeldinger/sykmeldingUtils";
import { SykmeldingOldFormat } from "@/data/sykmelding/types/SykmeldingOldFormat";

const tekster = {
  meldingTilArbeidsgiver: {
    header: "Melding til arbeidsgiver",
    innspillTittel: "Andre innspill til arbeidsgiver",
  },
};

interface MeldingTilArbeidsgiverProps {
  sykmelding: SykmeldingOldFormat;
}

export const MeldingTilArbeidsgiver = ({
  sykmelding,
}: MeldingTilArbeidsgiverProps) => {
  const skalVise = erMeldingTilArbeidsgiverInformasjon(sykmelding);
  return (
    <>
      {skalVise && (
        <div className="sykmeldingMotebehovVisning__avsnitt">
          <h5 className="undertittel">
            {tekster.meldingTilArbeidsgiver.header}
          </h5>
          <h6 className="sporsmal">
            {tekster.meldingTilArbeidsgiver.innspillTittel}
          </h6>
          <p>{sykmelding.innspillTilArbeidsgiver}</p>
        </div>
      )}
    </>
  );
};

export default MeldingTilArbeidsgiver;
