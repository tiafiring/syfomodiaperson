import React from "react";
import { SykmeldingOldFormat } from "../../../../../../data/sykmelding/types/SykmeldingOldFormat";
import { getSykmeldingOpplysning } from "../../../../../../utils/sykmeldingUtils";

const texts = {
  arbeidsevne: "Hva skal til for å bedre arbeidsevnen?",
  tilrettelegging: "Tilrettelegging/hensyn som bør tas på arbeidsplassen",
  tiltakNAV: "Tiltak i regi av NAV",
  tiltakAndre: "Eventuelle andre innspill til NAV",
};

interface BedreArbeidsevneProps {
  sykmelding: SykmeldingOldFormat;
}

const BedreArbeidsevne = (bedreArbeidsevneProps: BedreArbeidsevneProps) => {
  const { sykmelding } = bedreArbeidsevneProps;
  const visSeksjon =
    sykmelding.arbeidsevne.tilretteleggingArbeidsplass ||
    sykmelding.arbeidsevne.tiltakNAV ||
    sykmelding.arbeidsevne.tiltakAndre;
  if (!visSeksjon) {
    return <span />;
  }
  return (
    <div className="sykmeldingSeksjon">
      <h4 className="sykmeldingSeksjon__tittel">{texts.arbeidsevne}</h4>
      {getSykmeldingOpplysning(
        sykmelding.arbeidsevne,
        "tilretteleggingArbeidsplass",
        texts.tilrettelegging
      )}
      {getSykmeldingOpplysning(
        sykmelding.arbeidsevne,
        "tiltakNAV",
        texts.tiltakNAV
      )}
      {getSykmeldingOpplysning(
        sykmelding.arbeidsevne,
        "tiltakAndre",
        texts.tiltakAndre
      )}
    </div>
  );
};

export default BedreArbeidsevne;
