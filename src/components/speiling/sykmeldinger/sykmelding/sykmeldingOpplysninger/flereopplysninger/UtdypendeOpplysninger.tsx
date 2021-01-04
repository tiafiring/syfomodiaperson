import React from "react";
import { SykmeldingOldFormat } from "../../../../../../data/sykmelding/types/SykmeldingOldFormat";
import { UtdypendeOpplysning } from "../../../../../../data/sykmelding/types/SykmeldingNewFormatDTO";
import SykmeldingOpplysning from "./SykmeldingOpplysning";

const texts = {
  title: "Utdypende opplysninger",
};

interface OpplysningsGruppeProps {
  opplysningGruppe: UtdypendeOpplysning;
}

const OpplysningsGruppe = (opplysningsGruppeProps: OpplysningsGruppeProps) => {
  const { opplysningGruppe } = opplysningsGruppeProps;
  const sporsmal = Object.entries(opplysningGruppe).map(
    ([key, sporsmalSvar]) => (
      <SykmeldingOpplysning key={key} tittel={sporsmalSvar.sporsmal}>
        <p className="opplysning__verdi">{sporsmalSvar.svar}</p>
      </SykmeldingOpplysning>
    )
  );
  return <>{sporsmal}</>;
};

interface UtdypendeOpplysningerProps {
  sykmelding: SykmeldingOldFormat;
}

const UtdypendeOpplysninger = (
  utdypendeOpplysningerProps: UtdypendeOpplysningerProps
) => {
  const { sykmelding } = utdypendeOpplysningerProps;
  const utdypendeOpplysninger = sykmelding.utdypendeOpplysninger;
  return (
    <>
      {utdypendeOpplysninger && (
        <div className="sykmeldingSeksjon">
          <h4 className="sykmeldingSeksjon__tittel">{texts.title}</h4>

          {Object.entries(utdypendeOpplysninger).map(
            ([key, opplysningGruppe]) => (
              <OpplysningsGruppe
                key={key}
                opplysningGruppe={opplysningGruppe}
              />
            )
          )}
        </div>
      )}
    </>
  );
};

export default UtdypendeOpplysninger;
