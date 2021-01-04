import React from "react";
import { SykmeldingOldFormat } from "../../../../../../data/sykmelding/types/SykmeldingOldFormat";
import { tilLesbarDatoMedArstall } from "../../../../../../utils/datoUtils";
import { getSykmeldingOpplysning } from "../../../../../../utils/sykmeldingUtils";
import MulighetForArbeid from "./MulighetForArbeid";
import Friskmelding from "./Friskmelding";
import UtdypendeOpplysninger from "./UtdypendeOpplysninger";
import BedreArbeidsevne from "./BedreArbeidsevne";
import MeldingTilNAV from "./MeldingTilNAV";
import Tilbakedatering from "./Tilbakedatering";
import MeldingTilArbeidsgiver from "./MeldingTilArbeidsgiver";
import AndreSykmeldingOpplysninger from "./AndreSykmeldingOpplysninger";

const texts = {
  utstedelsesdato: "Dato sykmeldingen ble skrevet",
  startLegemeldtFravaer: "Når startet det legemeldte fraværet?",
};

interface FlereOpplysningerProps {
  sykmelding: SykmeldingOldFormat;
}

const FlereOpplysninger = (flereOpplysningerProps: FlereOpplysningerProps) => {
  const { sykmelding } = flereOpplysningerProps;
  return (
    <div>
      <div className="sykmeldingSeksjon">
        {getSykmeldingOpplysning(
          sykmelding.bekreftelse,
          "utstedelsesdato",
          texts.utstedelsesdato,
          tilLesbarDatoMedArstall(sykmelding.bekreftelse.utstedelsesdato),
          "h4"
        )}
        {getSykmeldingOpplysning(
          sykmelding,
          "startLegemeldtFravaer",
          texts.startLegemeldtFravaer,
          tilLesbarDatoMedArstall(sykmelding.startLegemeldtFravaer),
          "h4"
        )}
      </div>
      <MulighetForArbeid sykmelding={sykmelding} />
      <Friskmelding sykmelding={sykmelding} />
      <UtdypendeOpplysninger sykmelding={sykmelding} />
      <BedreArbeidsevne sykmelding={sykmelding} />
      <MeldingTilNAV sykmelding={sykmelding} />
      <MeldingTilArbeidsgiver sykmelding={sykmelding} />
      <Tilbakedatering sykmelding={sykmelding} />
      <AndreSykmeldingOpplysninger sykmelding={sykmelding} />
    </div>
  );
};

export default FlereOpplysninger;
