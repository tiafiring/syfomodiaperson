import React, { ReactElement } from "react";
import { Form } from "react-final-form";
import Panel from "nav-frontend-paneler";
import { tilDatoMedManedNavn } from "../../../utils/datoUtils";
import Deltakere from "./Deltakere";
import { useNavBrukerData } from "../../../data/navbruker/navbruker_hooks";
import { DialogmoteDTO } from "../../../data/dialogmote/types/dialogmoteTypes";
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
import {
  ReferatSkjemaFeil,
  validerReferatDeltakere,
  validerReferatTekster,
} from "../../../utils/valideringUtils";
import { useFeilUtbedret } from "../../../hooks/useFeilUtbedret";
import { SkjemaFeiloppsummering } from "../../SkjemaFeiloppsummering";

const texts = {
  digitalReferat:
    "Referatet formidles her på nav.no. Det er bare de arbeidstakerne som har reservert seg mot digital kommunikasjon, som vil få referatet i posten.",
  personvern:
    "Du må aldri skrive sensitive opplysninger om helse, diagnose, behandling, og prognose. Dette gjelder også hvis arbeidstakeren er åpen om helsen og snakket om den i møtet.",
};

export interface ReferatSkjemaValues {
  naermesteLeder: string;
  situasjon: string;
  konklusjon: string;
  arbeidstakersOppgave: string;
  arbeidsgiversOppgave: string;
  veiledersOppgave?: string;
  standardtekster: string[];
}

const ReferatTittel = styled(Innholdstittel)`
  margin-bottom: 2em;
`;

const ReferatWarningAlert = styled(AlertstripeFullbredde)`
  margin-bottom: 4em;
`;

interface ReferatProps {
  dialogmote: DialogmoteDTO;
  pageTitle: string;
}

const Referat = ({ dialogmote, pageTitle }: ReferatProps): ReactElement => {
  const navbruker = useNavBrukerData();
  const dateAndTimeForMeeting = tilDatoMedManedNavn(dialogmote.tid);

  const header = `${navbruker?.navn}, ${dateAndTimeForMeeting}, ${dialogmote.sted}`;

  const {
    feilUtbedret,
    resetFeilUtbedret,
    updateFeilUtbedret,
  } = useFeilUtbedret();

  const validate = (values: Partial<ReferatSkjemaValues>) => {
    const feilmeldinger: Partial<ReferatSkjemaFeil> = {
      ...validerReferatDeltakere(values),
      ...validerReferatTekster(values),
    };

    updateFeilUtbedret(feilmeldinger);

    return feilmeldinger;
  };

  const submit = (values: ReferatSkjemaValues) => {
    console.log("Submit referat with values: ", values);
  };

  const initialValues: Partial<ReferatSkjemaValues> = {
    naermesteLeder: dialogmote.arbeidsgiver.lederNavn,
  };

  return (
    <Panel>
      <Form onSubmit={submit} validate={validate} initialValues={initialValues}>
        {({ handleSubmit, submitFailed, errors }) => (
          <form onSubmit={handleSubmit}>
            <ReferatTittel>{header}</ReferatTittel>
            <ReferatWarningAlert type="advarsel">
              {texts.digitalReferat}
            </ReferatWarningAlert>
            <Deltakere />
            <ReferatWarningAlert type="advarsel">
              {texts.personvern}
            </ReferatWarningAlert>
            <Situasjon />
            <Konklusjon />
            <ArbeidstakersOppgave />
            <ArbeidsgiversOppgave />
            <VeiledersOppgave />
            <StandardTekster />
            {submitFailed && !feilUtbedret && (
              <SkjemaFeiloppsummering errors={errors} />
            )}
            <ReferatButtons
              pageTitle={pageTitle}
              onSendClick={resetFeilUtbedret}
              onPreviewClick={() => console.log("PREVIEW!")}
              onCancelClick={() => console.log("ABORT!")}
            />
          </form>
        )}
      </Form>
    </Panel>
  );
};

export default Referat;
