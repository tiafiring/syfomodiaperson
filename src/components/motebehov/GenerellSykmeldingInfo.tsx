import React from "react";
import { Checkbox } from "nav-frontend-skjema";
import {
  erArbeidsforEtterPerioden,
  erHensynPaaArbeidsplassenInformasjon,
  sykmeldingperioderSortertEldstTilNyest,
} from "../../utils/sykmeldinger/sykmeldingUtils";
import Diagnoser from "./Diagnoser.tsx";
import Perioder from "./Perioder";
import EkstraDiagnoseInformasjon from "./EkstraDiagnoseInformasjon";

const tekster = {
  generellSykmeldingInfo: {
    arbeidsforEtterPerioden: {
      tittel: "Pasienten er 100 % arbeidsfør etter perioden",
    },
    hensynPaaArbeidsplassen: {
      tittel: "Beskriv eventuelle hensyn som må tas på arbeidsplassen",
    },
  },
};

interface GenerellSykmeldingInfoProps {
  sykmelding: any;
}

export const GenerellSykmeldingInfo = (
  generellSykmeldingInfoProps: GenerellSykmeldingInfoProps
) => {
  const sykmelding = generellSykmeldingInfoProps.sykmelding;
  const hovedDiagnose = sykmelding.diagnose.hoveddiagnose;
  const biDiagnoser = sykmelding.diagnose.bidiagnoser
    ? sykmelding.diagnose.bidiagnoser
    : [];
  const sykmeldingPerioderSortertEtterDato = sykmeldingperioderSortertEldstTilNyest(
    sykmelding.mulighetForArbeid.perioder
  );
  return (
    <div className="sykmeldingMotebehovVisning__avsnitt">
      <Perioder perioder={sykmeldingPerioderSortertEtterDato} />

      <Diagnoser hovedDiagnose={hovedDiagnose} biDiagnoser={biDiagnoser} />

      <EkstraDiagnoseInformasjon sykmelding={sykmelding} />

      {erArbeidsforEtterPerioden(sykmelding) && (
        <Checkbox
          className="sykmeldingMotebehovVisning__checkbox"
          label={tekster.generellSykmeldingInfo.arbeidsforEtterPerioden.tittel}
          checked={sykmelding.friskmelding.arbeidsfoerEtterPerioden}
          disabled
        />
      )}
      {erHensynPaaArbeidsplassenInformasjon(sykmelding) && [
        <h6 key={0} className="sporsmal">
          {tekster.generellSykmeldingInfo.hensynPaaArbeidsplassen.tittel}
        </h6>,
        <p key={1}>{sykmelding.friskmelding.hensynPaaArbeidsplassen}</p>,
      ]}
    </div>
  );
};

export default GenerellSykmeldingInfo;
