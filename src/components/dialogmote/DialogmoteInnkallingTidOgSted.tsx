import React, { ReactElement } from "react";
import { Input, Label } from "nav-frontend-skjema";
import { Field } from "react-final-form";
import { formaterTid } from "../../utils";
import KlokkeslettField from "../KlokkeslettField";
import { Column } from "nav-frontend-grid";
import Datovelger from "../Datovelger";
import DialogmoteInnkallingSkjemaRow from "./DialogmoteInnkallingSkjemaRow";
import DialogmoteInnkallingSkjemaTittel from "./DialogmoteInnkallingSkjemaTittel";
import DialogmoteInnkallingSkjemaSeksjon from "./DialogmoteInnkallingSkjemaSeksjon";

const texts = {
  title: "Tid og sted",
  stedLabel: "Sted",
  stedPlaceholder: "F.eks: På arbeidsplassen",
  datoLabel: "Dato",
  datoPlaceholder: "dd.mm.åååå",
  tidLabel: "Klokkeslett",
  tidPlaceholder: "F.eks: 09.30",
  videoLabel: "Lenke til videomøte (valgfritt)",
  videoPlaceholder: "https://",
};

const DialogmoteInnkallingTidOgSted = (): ReactElement => (
  <DialogmoteInnkallingSkjemaSeksjon>
    <DialogmoteInnkallingSkjemaTittel>
      {texts.title}
    </DialogmoteInnkallingSkjemaTittel>
    <DialogmoteInnkallingSkjemaRow>
      <Column className="col-xs-2">
        <Label htmlFor="tidspunkt.dato">{texts.datoLabel}</Label>
        <Datovelger
          id="tidspunkt.dato"
          name="tidspunkt.dato"
          placeholder={texts.datoPlaceholder}
        />
      </Column>
      <Column className="col-xs-2">
        <Label htmlFor="tidspunkt.klokkeslett">{texts.tidLabel}</Label>
        <Field<string>
          parse={(e) => formaterTid(e)}
          component={KlokkeslettField}
          name="tidspunkt.klokkeslett"
          className="input--s"
          placeholder={texts.tidPlaceholder}
        />
      </Column>
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
