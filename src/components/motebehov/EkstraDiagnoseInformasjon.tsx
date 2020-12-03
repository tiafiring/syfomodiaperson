import React from "react";
import { Checkbox } from "nav-frontend-skjema";
import { erEkstraDiagnoseInformasjon } from "../../utils/sykmeldinger/sykmeldingUtils";
import { tilDatoMedUkedagOgManedNavn } from "../../utils/datoUtils";

const tekster = {
  ekstraDiagnoseInformasjon: {
    fravaersgrunnLovfestet: {
      lovfestetGrunn: "Annen lovfestet fraværsgrunn",
      beskrivFravaeret: "Beskriv fraværet",
    },
    yrkesskade: {
      kanSkyldesYrkesskade:
        "Sykmeldingen kan skyldes en yrkesskade/yrkessykdom",
      skadedato: "Skadedato",
    },
    svangerskap: {
      svangerskapsrelatert: "Sykdommen er svangerskapsrelatert",
    },
  },
};

interface AnnenLovfestetFravaersgrunnProps {
  diagnose: any;
}

const AnnenLovfestetFravaersgrunn = (
  annenLovfestetFravaersgrunnProps: AnnenLovfestetFravaersgrunnProps
) => {
  const diagnose = annenLovfestetFravaersgrunnProps.diagnose;
  return (
    <div className="annenLovfestetFravaersgrunn">
      <h6 className="sporsmal">
        {
          tekster.ekstraDiagnoseInformasjon.fravaersgrunnLovfestet
            .lovfestetGrunn
        }
      </h6>
      <p>{diagnose.fravaersgrunnLovfestet}</p>
      {diagnose.fravaerBeskrivelse && [
        <h6 key={0} className="sporsmal">
          {
            tekster.ekstraDiagnoseInformasjon.fravaersgrunnLovfestet
              .beskrivFravaeret
          }
        </h6>,
        <p key={1} className="annenLovfestetFravaersgrunnBeskrivelse">
          {diagnose.fravaerBeskrivelse}
        </p>,
      ]}
    </div>
  );
};

interface YrkesskadeProps {
  diagnose: any;
}

const Yrkesskade = (yrkesskadeProps: YrkesskadeProps) => {
  const diagnose = yrkesskadeProps.diagnose;
  return (
    <div className="yrkesskade">
      <Checkbox
        className="sykmeldingMotebehovVisning__checkbox"
        label={
          tekster.ekstraDiagnoseInformasjon.yrkesskade.kanSkyldesYrkesskade
        }
        checked
        disabled
      />
      {diagnose.yrkesskadeDato && [
        <h6 key={0} className="sporsmal">
          {tekster.ekstraDiagnoseInformasjon.yrkesskade.skadedato}
        </h6>,
        <p key={1} className="yrkesskadeDato">
          {tilDatoMedUkedagOgManedNavn(diagnose.yrkesskadeDato)}
        </p>,
      ]}
    </div>
  );
};

interface EkstraDiagnoseInformasjonProps {
  sykmelding: any;
}

const EkstraDiagnoseInformasjon = (
  ekstraDiagnoseInformasjonProps: EkstraDiagnoseInformasjonProps
) => {
  const sykmelding = ekstraDiagnoseInformasjonProps.sykmelding;
  const diagnose = sykmelding.diagnose;
  const skalVise = erEkstraDiagnoseInformasjon(sykmelding);
  return (
    <>
      {skalVise && (
        <div className="sykmeldingMotebehovVisning__avsnitt">
          {diagnose.fravaersgrunnLovfestet && (
            <AnnenLovfestetFravaersgrunn diagnose={diagnose} />
          )}

          {diagnose.svangerskap && (
            <Checkbox
              className="sykmeldingMotebehovVisning__checkbox"
              label={
                tekster.ekstraDiagnoseInformasjon.svangerskap
                  .svangerskapsrelatert
              }
              checked
              disabled
            />
          )}

          {diagnose.yrkesskade && <Yrkesskade diagnose={diagnose} />}
        </div>
      )}
    </>
  );
};

export default EkstraDiagnoseInformasjon;
