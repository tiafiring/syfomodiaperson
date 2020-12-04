import React from "react";
import TilbakeIArbeidCheckboxMedSporsmalOgDato from "./TilbakeIArbeidCheckboxMedSporsmalOgDato";

const tekster = {
  header: "8 uker: Pasient uten arbeidsgiver, utdypende opplysninger",
  retur: "Jeg antar at pasienten på sikt kan komme tilbake i arbeid",
  returDatoSporsmal: "Anslå når du tror dette kan skje",
  usikkerCheckboxLabel:
    "Jeg er usikker på om pasienten kan komme tilbake i arbeid",
  usikkerDatoSporsmal: "Når antar du å kunne gi tilbakemelding på dette?",
};

const getTilbakeIArbeidCheckbox = (returDato: Date) => {
  return (
    <TilbakeIArbeidCheckboxMedSporsmalOgDato
      checkboxLabel={tekster.retur}
      sporsmal={tekster.returDatoSporsmal}
      returDato={returDato}
    />
  );
};

const getUsikkerIArbeidCheckbox = (returDato: Date) => {
  return (
    <TilbakeIArbeidCheckboxMedSporsmalOgDato
      checkboxLabel={tekster.usikkerCheckboxLabel}
      sporsmal={tekster.usikkerDatoSporsmal}
      returDato={returDato}
    />
  );
};

interface TilbakeIArbeidUtenArbeidsgiverProps {
  friskmelding: any;
}

const TilbakeIArbeidUtenArbeidsgiver = (
  tilbakeIArbeidUtenArbeidsgiverProps: TilbakeIArbeidUtenArbeidsgiverProps
) => {
  const friskmelding = tilbakeIArbeidUtenArbeidsgiverProps.friskmelding;
  const skalVise =
    friskmelding.utenArbeidsgiverAntarTilbakeIArbeid ||
    friskmelding.utenArbeidsgiverTilbakemelding;
  const antarTilbakeIArbeid = friskmelding.utenArbeidsgiverAntarTilbakeIArbeid;
  const tilbakeIArbeidCheckbox = getTilbakeIArbeidCheckbox(
    friskmelding.utenArbeidsgiverAntarTilbakeIArbeidDato
  );
  const usikkerIArbeidCheckbox = getUsikkerIArbeidCheckbox(
    friskmelding.utenArbeidsgiverTilbakemelding
  );
  return (
    skalVise && (
      <div className="sykmeldingMotebehovVisning__tilbakeIArbeid--utenArbeidsgiver">
        <h5 className="undertittel">{tekster.header}</h5>
        {antarTilbakeIArbeid ? tilbakeIArbeidCheckbox : usikkerIArbeidCheckbox}
      </div>
    )
  );
};

export default TilbakeIArbeidUtenArbeidsgiver;
