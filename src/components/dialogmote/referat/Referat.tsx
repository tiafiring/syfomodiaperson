import React, { ReactElement } from "react";
import { Form } from "react-final-form";
import Panel from "nav-frontend-paneler";
import { tilDatoMedManedNavn } from "../../../utils/datoUtils";
import Deltakere, { Deltaker } from "./Deltakere";
import { useNavBrukerData } from "../../../data/navbruker/navbruker_hooks";
import { DialogmoteDTO } from "../../../data/dialogmote/dialogmoteTypes";
import { AlertstripeFullbredde } from "../../AlertstripeFullbredde";
import ReferatButtons from "./ReferatButtons";
import { Innholdstittel } from "nav-frontend-typografi";
import styled from "styled-components";
import { Situasjon } from "./Situasjon";
import { Konklusjon } from "./Konklusjon";
import { ArbeidstakersOppgave } from "./ArbeidstakersOppgave";
import { ArbeidsgiversOppgave } from "./ArbeidsgiversOppgave";
import { VeiledersOppgave } from "./VeiledersOppgave";
import { StandardTekster } from "./StandardTekster";

const texts = {
  digitalReferat:
    "Referatet formidles her på nav.no. Det er bare de arbeidstakerne som har reservert seg mot digital kommunikasjon, som vil få referatet i posten.",
  personvern:
    "Du må aldri skrive sensitive opplysninger om helse, diagnose, behandling, og prognose. Dette gjelder også hvis arbeidstakeren er åpen om helsen og snakket om den i møtet.",
};

interface ReferatSkjemaValues {
  deltakere: Deltaker[];
  situasjon: string;
  konklusjon: string;
  arbeidstakersOppgave: string;
  arbeidsgiversOppgave: string;
  veiledersOppgave?: string;
  standardtekster: string[];
}

const fakeButtonActions = {
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

const ReferatTittel = styled(Innholdstittel)`
  margin-bottom: 2em;
`;

const validate = (
  values: Partial<ReferatSkjemaValues>
): Partial<ReferatSkjemaValues> => {
  const feilmeldinger: Partial<ReferatSkjemaValues> = {};
  const forMangeTegn = values.konklusjon && values.konklusjon.length > 2000;

  feilmeldinger.konklusjon = forMangeTegn
    ? "For mange tegn i konklusjon! Maks 2000 tegn!"
    : undefined;

  return feilmeldinger;
};

const submit = (values: ReferatSkjemaValues) => {
  console.log("Submit referat with values: ", values);
};

const ReferatWarningAlert = styled(AlertstripeFullbredde)`
  margin-bottom: 4em;
`;

interface ReferatProps {
  dialogmote: DialogmoteDTO;
}

const Referat = ({ dialogmote }: ReferatProps): ReactElement => {
  const navbruker = useNavBrukerData();
  const dateAndTimeForMeeting = tilDatoMedManedNavn(dialogmote.tid);

  const header = `${navbruker?.navn}, ${dateAndTimeForMeeting}, ${dialogmote.sted}`;
  const initialValues: Partial<ReferatSkjemaValues> = {
    deltakere: ["arbeidstaker", "arbeidsgiver", "veileder"],
  };

  return (
    <Panel>
      <Form onSubmit={submit} validate={validate} initialValues={initialValues}>
        {({ handleSubmit }) => (
          <form onSubmit={handleSubmit}>
            <ReferatTittel>{header}</ReferatTittel>
            <ReferatWarningAlert type="advarsel">
              {texts.digitalReferat}
            </ReferatWarningAlert>
            <Deltakere arbeidsgiverNavn={dialogmote.arbeidsgiver.lederNavn} />
            <ReferatWarningAlert type="advarsel">
              {texts.personvern}
            </ReferatWarningAlert>
            <Situasjon />
            <Konklusjon />
            <ArbeidstakersOppgave />
            <ArbeidsgiversOppgave />
            <VeiledersOppgave />
            <StandardTekster />
            <ReferatButtons {...fakeButtonActions} />
          </form>
        )}
      </Form>
    </Panel>
  );
};

export default Referat;
