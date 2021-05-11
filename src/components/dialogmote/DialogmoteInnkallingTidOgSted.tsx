import React, { ReactElement } from "react";
import { Input, Label } from "nav-frontend-skjema";
import { Field } from "react-final-form";
import KlokkeslettField from "../KlokkeslettField";
import Datovelger from "../Datovelger";
import DialogmoteInnkallingSkjemaSeksjon from "./DialogmoteInnkallingSkjemaSeksjon";
import styled from "styled-components";
import { FlexColumn, FlexRow, PaddingSize } from "../Layout";
import { Innholdstittel } from "nav-frontend-typografi";

const texts = {
  title: "Tid og sted",
  stedLabel: "Sted",
  stedPlaceholder: "F.eks: På arbeidsplassen",
  datoLabel: "Dato",
  datoPlaceholder: "dd.mm.åååå",
  tidLabel: "Klokkeslett",
  videoLabel: "Lenke til videomøte (valgfritt)",
  videoPlaceholder: "https://",
};

const DatoColumn = styled(FlexColumn)`
  margin-right: 1em;
`;

const TidOgStedTittel = styled(Innholdstittel)`
  margin-bottom: 1em;
`;

const DialogmoteInnkallingTidOgSted = (): ReactElement => (
  <DialogmoteInnkallingSkjemaSeksjon>
    <TidOgStedTittel>{texts.title}</TidOgStedTittel>
    <FlexRow bottomPadding={PaddingSize.MD}>
      <DatoColumn>
        <Label htmlFor="tidspunkt.dato">{texts.datoLabel}</Label>
        <Datovelger
          id="tidspunkt.dato"
          name="tidspunkt.dato"
          placeholder={texts.datoPlaceholder}
        />
      </DatoColumn>
      <FlexColumn flex={1}>
        <KlokkeslettField name="tidspunkt.klokkeslett" label={texts.tidLabel} />
      </FlexColumn>
    </FlexRow>
    <FlexRow bottomPadding={PaddingSize.MD}>
      <FlexColumn flex={1}>
        <Field<string> name="sted">
          {({ input, meta }) => (
            <Input
              {...input}
              placeholder={texts.stedPlaceholder}
              label={texts.stedLabel}
              feil={meta.touched && meta.error}
            />
          )}
        </Field>
      </FlexColumn>
    </FlexRow>
    <FlexRow>
      <FlexColumn flex={1}>
        <Field<string> name="videoLink">
          {({ input }) => (
            <Input
              {...input}
              label={texts.videoLabel}
              placeholder={texts.videoPlaceholder}
            />
          )}
        </Field>
      </FlexColumn>
    </FlexRow>
  </DialogmoteInnkallingSkjemaSeksjon>
);

export default DialogmoteInnkallingTidOgSted;
