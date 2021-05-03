import React, { ReactElement } from "react";
import { Input, Label } from "nav-frontend-skjema";
import { Field } from "react-final-form";
import KlokkeslettField from "../KlokkeslettField";
import { Column } from "nav-frontend-grid";
import Datovelger from "../Datovelger";
import DialogmoteInnkallingSkjemaRow from "./DialogmoteInnkallingSkjemaRow";
import DialogmoteInnkallingSkjemaTittel from "./DialogmoteInnkallingSkjemaTittel";
import DialogmoteInnkallingSkjemaSeksjon from "./DialogmoteInnkallingSkjemaSeksjon";
import styled from "styled-components";

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

const DatoColumn = styled(Column)`
  float: left;
  padding-left: 0.5rem;
  margin-right: 0.5rem;
`;

const TidColumn = styled(Column)`
  float: left;
  padding-left: 0.5rem;
`;

const DialogmoteInnkallingTidOgSted = (): ReactElement => (
  <DialogmoteInnkallingSkjemaSeksjon>
    <DialogmoteInnkallingSkjemaTittel>
      {texts.title}
    </DialogmoteInnkallingSkjemaTittel>
    <DialogmoteInnkallingSkjemaRow>
      <DatoColumn>
        <Label htmlFor="tidspunkt.dato">{texts.datoLabel}</Label>
        <Datovelger
          id="tidspunkt.dato"
          name="tidspunkt.dato"
          placeholder={texts.datoPlaceholder}
        />
      </DatoColumn>
      <TidColumn>
        <KlokkeslettField name="tidspunkt.klokkeslett" label={texts.tidLabel} />
      </TidColumn>
    </DialogmoteInnkallingSkjemaRow>
    <DialogmoteInnkallingSkjemaRow>
      <Column className="col-xs-12">
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
      </Column>
    </DialogmoteInnkallingSkjemaRow>
    <DialogmoteInnkallingSkjemaRow>
      <Column className="col-xs-12">
        <Field<string> name="videoLink">
          {({ input }) => (
            <Input
              {...input}
              label={texts.videoLabel}
              placeholder={texts.videoPlaceholder}
            />
          )}
        </Field>
      </Column>
    </DialogmoteInnkallingSkjemaRow>
  </DialogmoteInnkallingSkjemaSeksjon>
);

export default DialogmoteInnkallingTidOgSted;
