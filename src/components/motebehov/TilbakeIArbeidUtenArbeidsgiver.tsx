import React from "react";
import TilbakeIArbeidCheckboxMedSporsmalOgDato from "./TilbakeIArbeidCheckboxMedSporsmalOgDato";
import { FriskmeldingDTO } from "../../data/sykmelding/types/SykmeldingOldFormat";

const tekster = {
  header: "8 uker: Pasient uten arbeidsgiver, utdypende opplysninger",
  retur: "Jeg antar at pasienten på sikt kan komme tilbake i arbeid",
  returDatoSporsmal: "Anslå når du tror dette kan skje",
  usikkerCheckboxLabel:
    "Jeg er usikker på om pasienten kan komme tilbake i arbeid",
  usikkerDatoSporsmal: "Når antar du å kunne gi tilbakemelding på dette?",
};

const getTilbakeIArbeidCheckbox = (returDato?: string) => {
  return (
    <TilbakeIArbeidCheckboxMedSporsmalOgDato
      checkboxLabel={tekster.retur}
      sporsmal={tekster.returDatoSporsmal}
      returDato={returDato}
    />
  );
};

const getUsikkerIArbeidCheckbox = (returDato?: string) => {
  return (
    <TilbakeIArbeidCheckboxMedSporsmalOgDato
      checkboxLabel={tekster.usikkerCheckboxLabel}
      sporsmal={tekster.usikkerDatoSporsmal}
      returDato={returDato}
    />
  );
};

interface TilbakeIArbeidUtenArbeidsgiverProps {
  friskmelding: FriskmeldingDTO;
}

const TilbakeIArbeidUtenArbeidsgiver = ({
  friskmelding,
}: TilbakeIArbeidUtenArbeidsgiverProps) => {
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

  if (!skalVise) {
    return null;
  }

  return (
    <div className="sykmeldingMotebehovVisning__tilbakeIArbeid--utenArbeidsgiver">
      <h5 className="undertittel">{tekster.header}</h5>
      {antarTilbakeIArbeid ? tilbakeIArbeidCheckbox : usikkerIArbeidCheckbox}
    </div>
  );
};

export default TilbakeIArbeidUtenArbeidsgiver;
