import React from "react";
import { UtdypendeOpplysning } from "../../data/sykmelding/types/SykmeldingNewFormatDTO";

const tekster = {
  UtdypendeOpplysninger: {
    header: "Utdypende opplysninger ved 8 uker",
  },
};

interface OpplysningsGruppeProps {
  opplysningGruppe: Map<string, UtdypendeOpplysning>;
}

const OpplysningsGruppe = ({ opplysningGruppe }: OpplysningsGruppeProps) => {
  const sporsmal = Object.entries(opplysningGruppe).map(
    ([key, sporsmalSvar]) => (
      <div key={key}>
        <h6 className="sporsmal">{sporsmalSvar.sporsmal}</h6>
        <p>{sporsmalSvar.svar}</p>
      </div>
    )
  );
  return <>{sporsmal}</>;
};

interface UtdypendeOpplysningerProps {
  utdypendeOpplysninger: Map<string, Map<string, UtdypendeOpplysning>>;
}

export const UtdypendeOpplysninger = (
  utdypendeOpplysningerProps: UtdypendeOpplysningerProps
) => {
  const utdypendeOpplysninger =
    utdypendeOpplysningerProps.utdypendeOpplysninger;

  return (
    <>
      {utdypendeOpplysninger && (
        <div className="sykmeldingMotebehovVisning__avsnitt">
          <h5 className="undertittel">
            {tekster.UtdypendeOpplysninger.header}
          </h5>

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
