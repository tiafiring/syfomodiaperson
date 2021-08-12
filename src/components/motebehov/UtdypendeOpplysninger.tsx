import React from "react";
import { SykmeldingOldFormat } from "../../data/sykmelding/types/SykmeldingOldFormat";
import { erUtdypendeOpplysninger } from "../../utils/sykmeldinger/sykmeldingUtils";
import { SporsmalSvarDTO } from "../../data/sykmelding/types/SporsmalSvarDTO";

const tekster = {
  UtdypendeOpplysninger: {
    header: "Utdypende opplysninger ved 8 uker",
  },
};

interface OpplysningsGruppeProps {
  opplysningGruppe: Map<string, SporsmalSvarDTO>;
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
  sykmelding: SykmeldingOldFormat;
}

export const UtdypendeOpplysninger = ({
  sykmelding,
}: UtdypendeOpplysningerProps) => {
  const skalVise = sykmelding && erUtdypendeOpplysninger(sykmelding);
  return (
    <>
      {skalVise && (
        <div className="sykmeldingMotebehovVisning__avsnitt">
          <h5 className="undertittel">
            {tekster.UtdypendeOpplysninger.header}
          </h5>

          {Object.entries(sykmelding.utdypendeOpplysninger).map(
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
