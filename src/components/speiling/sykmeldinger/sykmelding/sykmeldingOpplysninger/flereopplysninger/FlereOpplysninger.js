import React from "react";
import {
  keyValue,
  getLedetekst,
  getSykmeldingOpplysning,
  sykmelding as sykmeldingPt,
} from "@navikt/digisyfo-npm";
import { tilLesbarDatoMedArstall } from "../../../../../../utils/datoUtils";
import MulighetForArbeid from "./MulighetForArbeid";
import Friskmelding from "./Friskmelding";
import UtdypendeOpplysninger from "./UtdypendeOpplysninger";
import BedreArbeidsevne from "./BedreArbeidsevne";
import MeldingTilNAV from "./MeldingTilNAV";
import Tilbakedatering from "./Tilbakedatering";
import MeldingTilArbeidsgiver from "./MeldingTilArbeidsgiver";
import AndreSykmeldingOpplysninger from "./AndreSykmeldingOpplysninger";

const FlereOpplysninger = ({ sykmelding, ledetekster }) => {
  return (
    <div>
      <div className="sykmeldingSeksjon">
        {getSykmeldingOpplysning(
          sykmelding.bekreftelse,
          "utstedelsesdato",
          getLedetekst("din-sykmelding.annet.utstedelsesdato", ledetekster),
          tilLesbarDatoMedArstall(sykmelding.bekreftelse.utstedelsesdato),
          "h4"
        )}
        {getSykmeldingOpplysning(
          sykmelding,
          "startLegemeldtFravaer",
          getLedetekst(
            "din-sykmelding.mulighet.for.arbeid.start.legemeldt.fravaer.tittel",
            ledetekster
          ),
          tilLesbarDatoMedArstall(sykmelding.startLegemeldtFravaer),
          "h4"
        )}
      </div>
      <MulighetForArbeid sykmelding={sykmelding} />
      <Friskmelding sykmelding={sykmelding} ledetekster={ledetekster} />
      <UtdypendeOpplysninger sykmelding={sykmelding} />
      <BedreArbeidsevne sykmelding={sykmelding} />
      <MeldingTilNAV sykmelding={sykmelding} />
      <MeldingTilArbeidsgiver
        sykmelding={sykmelding}
        ledetekster={ledetekster}
      />
      <Tilbakedatering sykmelding={sykmelding} />
      <AndreSykmeldingOpplysninger sykmelding={sykmelding} />
    </div>
  );
};

FlereOpplysninger.propTypes = {
  sykmelding: sykmeldingPt,
  ledetekster: keyValue,
};

export default FlereOpplysninger;
