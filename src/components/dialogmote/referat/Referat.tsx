import React, { ReactElement, useState } from "react";
import { Form, FormSpy } from "react-final-form";
import arrayMutators from "final-form-arrays";
import Panel from "nav-frontend-paneler";
import { tilDatoMedManedNavn } from "@/utils/datoUtils";
import Deltakere from "./Deltakere";
import { useNavBrukerData } from "@/data/navbruker/navbruker_hooks";
import {
  DialogmoteDTO,
  DocumentComponentDto,
} from "@/data/dialogmote/types/dialogmoteTypes";
import { AlertstripeFullbredde } from "../../AlertstripeFullbredde";
import ReferatButtons from "./ReferatButtons";
import { Innholdstittel } from "nav-frontend-typografi";
import styled from "styled-components";
import {
  validerReferatDeltakere,
  validerSkjemaTekster,
} from "@/utils/valideringUtils";
import { useFeilUtbedret } from "@/hooks/useFeilUtbedret";
import { SkjemaFeiloppsummering } from "../../SkjemaFeiloppsummering";
import { useValgtPersonident } from "@/hooks/useValgtBruker";
import { Forhandsvisning } from "../Forhandsvisning";
import { useReferatDocument } from "@/hooks/dialogmote/document/useReferatDocument";
import { StandardTekst } from "@/data/dialogmote/dialogmoteTexts";
import {
  NewDialogmotedeltakerAnnenDTO,
  NewDialogmoteReferatDTO,
} from "@/data/dialogmote/types/dialogmoteReferatTypes";
import { useFerdigstillDialogmote } from "@/data/dialogmote/useFerdigstillDialogmote";
import { Navigate } from "react-router-dom";
import { moteoversiktRoutePath } from "@/routers/AppRouter";
import { SkjemaInnsendingFeil } from "@/components/SkjemaInnsendingFeil";
import { useMellomlagreReferat } from "@/data/dialogmote/useMellomlagreReferat";
import { FlexRow, PaddingSize } from "@/components/Layout";
import { Knapp } from "nav-frontend-knapper";
import { useInitialValuesReferat } from "@/hooks/dialogmote/useInitialValuesReferat";
import {
  MAX_LENGTH_ARBEIDSGIVERS_OPPGAVE,
  MAX_LENGTH_ARBEIDSTAKERS_OPPGAVE,
  MAX_LENGTH_BEGRUNNELSE_ENDRING,
  MAX_LENGTH_BEHANDLERS_OPPGAVE,
  MAX_LENGTH_KONKLUSJON,
  MAX_LENGTH_SITUASJON,
  MAX_LENGTH_VEILEDERS_OPPGAVE,
  ReferatFritekster,
} from "@/components/dialogmote/referat/ReferatFritekster";
import { StandardTekster } from "@/components/dialogmote/referat/StandardTekster";
import { useEndreReferat } from "@/data/dialogmote/useEndreReferat";
import Lenke from "nav-frontend-lenker";

export const texts = {
  digitalReferat:
    "Referatet formidles her på nav.no. Det er bare de arbeidstakerne som har reservert seg mot digital kommunikasjon, som vil få referatet i posten.",
  personvern:
    "Du må aldri skrive sensitive opplysninger om helse, diagnose, behandling og prognose. Dette gjelder også hvis arbeidstakeren er åpen om helsen og snakket om den i møtet. Se artikkel 9, Lov om behandling av personopplysninger. ",
  personvernLenketekst:
    "Du kan også lese mer om dette på Navet (åpnes i ny fane).",
  forhandsvisningContentLabel: "Forhåndsvis referat fra dialogmøte",
  preview: "Se forhåndsvisning",
  referatSaved: "Referatet er lagret",
};

const personvernUrl =
  "https://navno.sharepoint.com/sites/fag-og-ytelser-veileder-for-arbeidsrettet-brukeroppfolging/SitePages/Sykmeldt-med-arbeidsgiver-%E2%80%93-avholde-dialogm%C3%B8te.aspx";

export const valideringsTexts = {
  situasjonMissing: "Vennligst angi situasjon og muligheter",
  konklusjonMissing: "Vennligst angi konklusjon",
  arbeidstakersOppgaveMissing: "Vennligst angi arbeidstakerens oppgave",
  arbeidsgiversOppgaveMissing: "Vennligst angi arbeidsgiverens oppgave",
  begrunnelseEndringMissing:
    "Vennligst angi årsaken til at referatet må endres",
};

export enum ReferatMode {
  NYTT,
  ENDRET,
}

interface ReferatSkjemaTekster {
  situasjon: string;
  konklusjon: string;
  arbeidstakersOppgave: string;
  arbeidsgiversOppgave: string;
  behandlersOppgave?: string;
  veiledersOppgave: string;
  begrunnelseEndring?: string;
}

export interface ReferatSkjemaValues extends ReferatSkjemaTekster {
  naermesteLeder: string;
  standardtekster: StandardTekst[];
  andreDeltakere: NewDialogmotedeltakerAnnenDTO[];
  behandlerDeltatt?: boolean;
  behandlerMottarReferat?: boolean;
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
  mode: ReferatMode;
}

const toNewReferat = (
  dialogmote: DialogmoteDTO,
  values: Partial<ReferatSkjemaValues>,
  getReferatDocument: (
    values: Partial<ReferatSkjemaValues>
  ) => DocumentComponentDto[]
): NewDialogmoteReferatDTO => ({
  narmesteLederNavn: values.naermesteLeder ?? "",
  situasjon: values.situasjon ?? "",
  konklusjon: values.konklusjon ?? "",
  arbeidsgiverOppgave: values.arbeidsgiversOppgave ?? "",
  arbeidstakerOppgave: values.arbeidstakersOppgave ?? "",
  ...(dialogmote.behandler
    ? {
        behandlerOppgave: values.behandlersOppgave,
        behandlerDeltatt: values.behandlerDeltatt,
        behandlerMottarReferat: values.behandlerMottarReferat,
      }
    : {}),
  ...(values.begrunnelseEndring
    ? {
        begrunnelseEndring: values.begrunnelseEndring,
      }
    : {}),
  veilederOppgave: values.veiledersOppgave,
  document: getReferatDocument(values),
  andreDeltakere: values.andreDeltakere || [],
});

const Referat = ({
  dialogmote,
  pageTitle,
  mode,
}: ReferatProps): ReactElement => {
  const fnr = useValgtPersonident();
  const ferdigstillDialogmote = useFerdigstillDialogmote(fnr, dialogmote.uuid);
  const mellomlagreReferat = useMellomlagreReferat(fnr, dialogmote.uuid);
  const endreReferat = useEndreReferat(fnr, dialogmote.uuid);
  const [uendretSidenMellomlagring, setUendretSidenMellomlagring] = useState<
    boolean | undefined
  >();

  const navbruker = useNavBrukerData();
  const [displayReferatPreview, setDisplayReferatPreview] = useState(false);

  const dateAndTimeForMeeting = tilDatoMedManedNavn(dialogmote.tid);
  const header = `${navbruker?.navn}, ${dateAndTimeForMeeting}, ${dialogmote.sted}`;
  const isEndringAvReferat = mode === ReferatMode.ENDRET;

  const { harIkkeUtbedretFeil, resetFeilUtbedret, updateFeilUtbedret } =
    useFeilUtbedret();
  const { getReferatDocument } = useReferatDocument(dialogmote, mode);

  const validate = (values: Partial<ReferatSkjemaValues>) => {
    const friteksterFeil = validerSkjemaTekster<ReferatSkjemaTekster>({
      situasjon: {
        value: values.situasjon || "",
        maxLength: MAX_LENGTH_SITUASJON,
        missingRequiredMessage: valideringsTexts.situasjonMissing,
      },
      konklusjon: {
        value: values.konklusjon || "",
        maxLength: MAX_LENGTH_KONKLUSJON,
        missingRequiredMessage: valideringsTexts.konklusjonMissing,
      },
      arbeidstakersOppgave: {
        value: values.arbeidstakersOppgave || "",
        maxLength: MAX_LENGTH_ARBEIDSTAKERS_OPPGAVE,
        missingRequiredMessage: valideringsTexts.arbeidstakersOppgaveMissing,
      },
      arbeidsgiversOppgave: {
        value: values.arbeidsgiversOppgave || "",
        maxLength: MAX_LENGTH_ARBEIDSGIVERS_OPPGAVE,
        missingRequiredMessage: valideringsTexts.arbeidsgiversOppgaveMissing,
      },
      ...(dialogmote.behandler
        ? {
            behandlersOppgave: {
              value: values.behandlersOppgave || "",
              maxLength: MAX_LENGTH_BEHANDLERS_OPPGAVE,
            },
          }
        : {}),
      veiledersOppgave: {
        value: values.veiledersOppgave || "",
        maxLength: MAX_LENGTH_VEILEDERS_OPPGAVE,
      },
      ...(isEndringAvReferat
        ? {
            begrunnelseEndring: {
              value: values.begrunnelseEndring || "",
              maxLength: MAX_LENGTH_BEGRUNNELSE_ENDRING,
              missingRequiredMessage:
                valideringsTexts.begrunnelseEndringMissing,
            },
          }
        : {}),
    });

    const feilmeldinger = {
      ...validerReferatDeltakere(values),
      ...friteksterFeil,
    };

    updateFeilUtbedret(feilmeldinger);

    return feilmeldinger;
  };

  const submit = (values: ReferatSkjemaValues) => {
    const newDialogmoteReferatDTO = toNewReferat(
      dialogmote,
      values,
      getReferatDocument
    );
    if (isEndringAvReferat) {
      endreReferat.mutate(newDialogmoteReferatDTO);
    } else {
      ferdigstillDialogmote.mutate(newDialogmoteReferatDTO);
    }
  };

  const mellomlagre = (values: ReferatSkjemaValues) => {
    mellomlagreReferat.mutate(
      toNewReferat(dialogmote, values, getReferatDocument),
      { onSuccess: () => setUendretSidenMellomlagring(true) }
    );
  };

  const initialValues = useInitialValuesReferat(dialogmote);

  if (ferdigstillDialogmote.isSuccess || endreReferat.isSuccess) {
    return <Navigate to={moteoversiktRoutePath} />;
  }

  return (
    <Panel>
      <Form
        onSubmit={submit}
        validate={validate}
        initialValues={initialValues}
        mutators={{ ...arrayMutators }}
      >
        {({ handleSubmit, submitFailed, errors, values }) => (
          <form onSubmit={handleSubmit}>
            <FormSpy
              subscription={{ values: true }}
              onChange={() => {
                if (uendretSidenMellomlagring) {
                  setUendretSidenMellomlagring(false);
                }
              }}
            />
            <ReferatTittel>{header}</ReferatTittel>
            <ReferatWarningAlert type="advarsel">
              {texts.digitalReferat}
            </ReferatWarningAlert>
            <Deltakere behandler={dialogmote.behandler} />
            <ReferatWarningAlert type="advarsel" form="inline">
              {texts.personvern}
              <Lenke
                target="_blank"
                rel="noopener noreferrer"
                href={personvernUrl}
              >
                {texts.personvernLenketekst}
              </Lenke>
            </ReferatWarningAlert>
            <ReferatFritekster dialogmote={dialogmote} mode={mode} />
            <StandardTekster />
            <FlexRow topPadding={PaddingSize.SM} bottomPadding={PaddingSize.MD}>
              <Knapp
                htmlType="button"
                onClick={() => setDisplayReferatPreview(true)}
              >
                {texts.preview}
              </Knapp>
            </FlexRow>
            {ferdigstillDialogmote.isError && (
              <SkjemaInnsendingFeil error={ferdigstillDialogmote.error} />
            )}
            {endreReferat.isError && (
              <SkjemaInnsendingFeil error={endreReferat.error} />
            )}
            {mellomlagreReferat.isError && (
              <SkjemaInnsendingFeil error={mellomlagreReferat.error} />
            )}
            {submitFailed && harIkkeUtbedretFeil && (
              <SkjemaFeiloppsummering errors={errors} />
            )}
            {mellomlagreReferat.isSuccess && uendretSidenMellomlagring && (
              <AlertstripeFullbredde type="suksess">
                {texts.referatSaved}
              </AlertstripeFullbredde>
            )}
            <ReferatButtons
              pageTitle={pageTitle}
              onSaveClick={() => mellomlagre(values)}
              onSendClick={resetFeilUtbedret}
              showSaveSpinner={mellomlagreReferat.isLoading}
              showSendSpinner={
                ferdigstillDialogmote.isLoading || endreReferat.isLoading
              }
            />
            <Forhandsvisning
              contentLabel={texts.forhandsvisningContentLabel}
              isOpen={displayReferatPreview}
              handleClose={() => setDisplayReferatPreview(false)}
              getDocumentComponents={() => getReferatDocument(values)}
            />
          </form>
        )}
      </Form>
    </Panel>
  );
};

export default Referat;
