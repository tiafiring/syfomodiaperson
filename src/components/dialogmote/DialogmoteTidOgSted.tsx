import React, { ReactElement } from "react";
import { Input, Label } from "nav-frontend-skjema";
import { Field } from "react-final-form";
import KlokkeslettField from "../KlokkeslettField";
import Datovelger from "../Datovelger";
import DialogmoteInnkallingSkjemaSeksjon from "./innkalling/DialogmoteInnkallingSkjemaSeksjon";
import styled from "styled-components";
import { FlexColumn, FlexRow, PaddingSize } from "../Layout";
import { Innholdstittel } from "nav-frontend-typografi";
import { AlertstripeFullbredde } from "@/components/AlertstripeFullbredde";
import { useVeilederinfoQuery } from "@/data/veilederinfo/veilederinfoQueryHooks";
import { useNavBrukerData } from "@/data/navbruker/navbruker_hooks";

const texts = {
  title: "Tid og sted",
  stedLabel: "Sted",
  stedPlaceholder: "F.eks: På arbeidsplassen",
  datoLabel: "Dato",
  datoPlaceholder: "dd.mm.åååå",
  tidLabel: "Klokkeslett",
  videoLabel: "Lenke til videomøte (valgfritt)",
  videoPlaceholder: "https://",
  alertText:
    "Tips: Nå som innkallingen ikke sendes med post, kan du kalle inn til dialogmøter tidligere enn tre uker frem i tid.",
};

const DatoColumn = styled(FlexColumn)`
  margin-right: 1em;
`;

const TidOgStedTittel = styled(Innholdstittel)`
  margin-bottom: 1em;
`;

const AlertstripeFullbreddeStyled = styled(AlertstripeFullbredde)`
  margin-bottom: 2em;
`;

interface DialogmoteTidOgStedProps {
  isFuturisticMeeting?: boolean;
}

const DialogmoteTidOgSted = ({
  isFuturisticMeeting,
}: DialogmoteTidOgStedProps): ReactElement => {
  const datoField = "dato";
  const klokkeslettField = "klokkeslett";
  const stedField = "sted";
  const videoLinkField = "videoLink";

  const { data: veilederinfo } = useVeilederinfoQuery();

  const ABTestHit = Number(veilederinfo?.ident.slice(-1)) >= 5;
  const { brukerKanVarslesDigitalt } = useNavBrukerData();
  const showFuturisticWarning =
    !!isFuturisticMeeting && ABTestHit && brukerKanVarslesDigitalt;

  return (
    <DialogmoteInnkallingSkjemaSeksjon>
      <TidOgStedTittel>{texts.title}</TidOgStedTittel>
      <FlexRow bottomPadding={PaddingSize.MD}>
        <DatoColumn>
          <Label htmlFor={datoField}>{texts.datoLabel}</Label>
          <Datovelger
            id={datoField}
            name={datoField}
            placeholder={texts.datoPlaceholder}
          />
        </DatoColumn>
        <FlexColumn flex={1}>
          <KlokkeslettField
            id={klokkeslettField}
            name={klokkeslettField}
            label={texts.tidLabel}
          />
        </FlexColumn>
      </FlexRow>
      {showFuturisticWarning && (
        <AlertstripeFullbreddeStyled type="info">
          <p>{texts.alertText}</p>
        </AlertstripeFullbreddeStyled>
      )}
      <FlexRow bottomPadding={PaddingSize.MD}>
        <FlexColumn flex={1}>
          <Field<string> name={stedField}>
            {({ input, meta }) => (
              <Input
                {...input}
                id={stedField}
                placeholder={texts.stedPlaceholder}
                label={texts.stedLabel}
                feil={meta.submitFailed && meta.error}
              />
            )}
          </Field>
        </FlexColumn>
      </FlexRow>
      <FlexRow>
        <FlexColumn flex={1}>
          <Field<string> name={videoLinkField}>
            {({ input, meta }) => (
              <Input
                {...input}
                id={videoLinkField}
                label={texts.videoLabel}
                placeholder={texts.videoPlaceholder}
                feil={meta.submitFailed && meta.error}
              />
            )}
          </Field>
        </FlexColumn>
      </FlexRow>
    </DialogmoteInnkallingSkjemaSeksjon>
  );
};

export default DialogmoteTidOgSted;
