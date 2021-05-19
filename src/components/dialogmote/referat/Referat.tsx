import React from "react";
import { Field, Form } from "react-final-form";
import Panel from "nav-frontend-paneler";
import AlertStripe from "nav-frontend-alertstriper";
import styled from "styled-components";
import { tilDatoMedUkedagOgManedNavn } from "../../../utils/datoUtils";
import TextField from "../../mote/TextField";
import Stillingsprosent from "./Stillingsprosent";
import Deltakere from "./Deltakere";
import Buttonrow from "./Buttonrow";
import { useNavBrukerData } from "../../../data/navbruker/navbruker_hooks";
import { DialogmoteDTO } from "../../../data/dialogmote/dialogmoteTypes";

const texts = {
  header: "Dialogmøte holdt ",
  digitalReferat:
    "Referatet formidles her på nav.no. Det er bare de arbeidstakerne som har reservert seg mot digital kommunikasjon, som vil få referatet i psoten.",
  personvern:
    "Du må aldri skrive sensitive opplysninger om helse, diagnose, behandling, og prognose. Dette gjelder også hvis arbeidstakeren er åpen om helsen og snakket om den i møtet.",
  label: "Referat",
};

interface ReferatSkjemaValues {
  konklusjon: string;
}

interface ReferatSkjemaFeil {
  konklusjon?: string;
}

const fakeKnapperadFunctions = {
  sendMethod: () => {
    console.log("SEND!");
  },
  previewMethod: () => {
    console.log("PREVIEW!");
  },
  abortMethod: () => {
    console.log("ABORT!");
  },
};

const validate = (values: Partial<ReferatSkjemaValues>): ReferatSkjemaFeil => {
  const feilmeldinger: ReferatSkjemaFeil = {};
  const forMangeTegn = values.konklusjon && values.konklusjon.length > 2000;

  feilmeldinger.konklusjon = forMangeTegn
    ? "For mange tegn i konklusjon! Maks 2000 tegn!"
    : undefined;

  return feilmeldinger;
};

const submit = (values: ReferatSkjemaValues) => {
  console.log("Submit referat with values: ", values);
};

const ReferatWarningAlert = styled(AlertStripe)`
  margin-bottom: 2em;
`;

interface ReferatProps {
  dialogmote: DialogmoteDTO;
}

const Referat = ({ dialogmote }: ReferatProps) => {
  const navbruker = useNavBrukerData();
  const dateAndTimeForMeeting = tilDatoMedUkedagOgManedNavn(dialogmote.tid);

  const header = `${navbruker?.navn}, ${dateAndTimeForMeeting}, ${dialogmote.sted}`;

  return (
    <Panel>
      <h2>{header}</h2>
      <ReferatWarningAlert type="advarsel">
        {texts.digitalReferat}
      </ReferatWarningAlert>
      <Deltakere arbeidsgiverNavn={dialogmote?.arbeidsgiver.lederNavn} />
      <Stillingsprosent
        virksomhetsnummer={dialogmote?.arbeidsgiver.virksomhetsnummer}
      />
      <ReferatWarningAlert type="advarsel">
        {texts.personvern}
      </ReferatWarningAlert>
      <Form onSubmit={submit} validate={validate}>
        {({ handleSubmit }) => (
          <form onSubmit={handleSubmit}>
            <Field
              label={texts.label}
              id="referat"
              component={TextField}
              name="referat"
              maxLength={2000}
            />
            <Buttonrow {...fakeKnapperadFunctions} />
          </form>
        )}
      </Form>
    </Panel>
  );
};

export default Referat;
