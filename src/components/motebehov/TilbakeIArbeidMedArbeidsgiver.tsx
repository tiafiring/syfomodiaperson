import React from "react";
import { Checkbox } from "nav-frontend-skjema";
import TilbakeIArbeidCheckboxMedSporsmalOgDato from "./TilbakeIArbeidCheckboxMedSporsmalOgDato";
import { FriskmeldingDTO } from "@/data/sykmelding/types/SykmeldingOldFormat";

const tekster = {
  header: "8 uker: Pasient med arbeidsgiver, utdypende opplysninger",
  returSammeArbeidsgiver:
    "Jeg antar at pasienten på sikt kan komme tilbake til samme arbeidsgiver",
  datoSporsmal: "Anslå når du tror dette kan skje",
  returAnnenArbeidsgiver:
    "Jeg antar at pasienten på sikt kan komme i arbeid hos annen arbeidsgiver",
  usikkerDatoSporsmal: "Når antar du å kunne gi tilbakemelding på dette?",
  usikkerCheckboxLabel:
    "Jeg er usikker på om pasienten kan komme tilbake i arbeid hos egen eller annen arbeidsgiver",
};

interface ReturSammeArbeidsgiverProps {
  friskmelding: FriskmeldingDTO;
}

const ReturSammeArbeidsgiver = ({
  friskmelding,
}: ReturSammeArbeidsgiverProps) => {
  return (
    <div>
      {friskmelding.antarReturSammeArbeidsgiver && (
        <TilbakeIArbeidCheckboxMedSporsmalOgDato
          checkboxLabel={tekster.returSammeArbeidsgiver}
          sporsmal={tekster.datoSporsmal}
          returDato={friskmelding.antattDatoReturSammeArbeidsgiver}
        />
      )}
      {friskmelding.antarReturAnnenArbeidsgiver && (
        <Checkbox
          className="sykmeldingMotebehovVisning__checkbox"
          label={tekster.returAnnenArbeidsgiver}
          checked
          disabled
        />
      )}
    </div>
  );
};

interface TilbakeIArbeidMedArbeidsgiverProps {
  friskmelding: FriskmeldingDTO;
}

const TilbakeIArbeidMedArbeidsgiver = ({
  friskmelding,
}: TilbakeIArbeidMedArbeidsgiverProps) => {
  const skalVise =
    friskmelding.antarReturSammeArbeidsgiver ||
    friskmelding.antarReturAnnenArbeidsgiver ||
    friskmelding.tilbakemeldingReturArbeid;
  const antarRetur =
    friskmelding.antarReturSammeArbeidsgiver ||
    friskmelding.antarReturAnnenArbeidsgiver;

  if (!skalVise) {
    return null;
  }

  return (
    <div className="sykmeldingMotebehovVisning__tilbakeIArbeid--medArbeidsgiver">
      <h5 className="undertittel">{tekster.header}</h5>
      {antarRetur ? (
        <ReturSammeArbeidsgiver friskmelding={friskmelding} />
      ) : (
        <TilbakeIArbeidCheckboxMedSporsmalOgDato
          checkboxLabel={tekster.usikkerCheckboxLabel}
          sporsmal={tekster.usikkerDatoSporsmal}
          returDato={friskmelding.tilbakemeldingReturArbeid}
        />
      )}
    </div>
  );
};

export default TilbakeIArbeidMedArbeidsgiver;
