import React from "react";
import {
  getLedetekst,
  keyValue,
  sykmelding as sykmeldingPt,
} from "@navikt/digisyfo-npm";
import SykmeldingOpplysning from "./SykmeldingOpplysning";

const OpplysningsGruppe = ({ opplysningGruppe }) => {
  const sporsmal = Object.entries(opplysningGruppe).map(
    ([key, sporsmalSvar]) => (
      <SykmeldingOpplysning key={key} tittel={sporsmalSvar.sporsmal}>
        <p className="opplysning__verdi">{sporsmalSvar.svar}</p>
      </SykmeldingOpplysning>
    )
  );
  return <>{sporsmal}</>;
};

const UtdypendeOpplysninger = ({ sykmelding, ledetekster }) => {
  const utdypendeOpplysninger = sykmelding.utdypendeOpplysninger;
  return (
    <>
      {utdypendeOpplysninger && (
        <div className="sykmeldingSeksjon">
          <h4 className="sykmeldingSeksjon__tittel">
            {getLedetekst("din-sykmelding.utdypende.tittel", ledetekster)}
          </h4>

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

UtdypendeOpplysninger.propTypes = {
  sykmelding: sykmeldingPt,
  ledetekster: keyValue,
};

export default UtdypendeOpplysninger;
