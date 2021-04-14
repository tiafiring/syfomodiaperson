import React from "react";
import { Checkbox } from "nav-frontend-skjema";
import { tilLesbarDatoMedArstall } from "../../utils/datoUtils";

interface TilbakeIArbeidCheckboxMedSporsmalOgDatoProps {
  checkboxLabel: string;
  sporsmal: string;
  returDato?: string;
}

const TilbakeIArbeidCheckboxMedSporsmalOgDato = ({
  checkboxLabel,
  sporsmal,
  returDato,
}: TilbakeIArbeidCheckboxMedSporsmalOgDatoProps) => (
  <div>
    <Checkbox
      className="sykmeldingMotebehovVisning__checkbox"
      label={checkboxLabel}
      checked
      disabled
    />
    <h6 className="sporsmal">{sporsmal}</h6>
    <p>{tilLesbarDatoMedArstall(returDato)}</p>
  </div>
);

export default TilbakeIArbeidCheckboxMedSporsmalOgDato;
