import React, { ReactElement } from "react";
import Panel from "nav-frontend-paneler";
import DialogmoteInnkallingVelgArbeidsgiver from "./DialogmoteInnkallingVelgArbeidsgiver";
import DialogmoteInnkallingTidOgSted from "./DialogmoteInnkallingTidOgSted";
import DialogmoteInnkallingTekster from "./DialogmoteInnkallingTekster";
import { Column } from "nav-frontend-grid";
import { Flatknapp, Hovedknapp } from "nav-frontend-knapper";
import { Form } from "react-final-form";
import { Leder } from "../../data/leder/ledere";
import {
  validerArbeidsgiver,
  validerSted,
  validerTidspunkt,
} from "../../utils/valideringUtils";
import DialogmoteInnkallingSkjemaRow from "./DialogmoteInnkallingSkjemaRow";

interface DialogmoteInnkallingSkjemaProps {
  ledere: Leder[];
}

interface DialogmoteInnkallingSkjemaValues {
  arbeidsgiver: string;
  tidspunkt: {
    klokkeslett: string;
    dato: string;
  };
  sted: string;
  videoLink?: string;
  fritekstArbeidsgiver?: string;
  fritekstSykmeldt?: string;
}

interface DialogmoteInnkallingSkjemaFeil {
  arbeidsgiver?: string;
  sted?: string;
  tidspunkt: {
    klokkeslett?: string;
    dato?: string;
  };
}

const texts = {
  send: "Send innkallingene",
  cancel: "Avbryt",
};

const validate = (
  values: Partial<DialogmoteInnkallingSkjemaValues>
): DialogmoteInnkallingSkjemaFeil => {
  const feilmeldinger: DialogmoteInnkallingSkjemaFeil = { tidspunkt: {} };
  feilmeldinger.sted = validerSted(values.sted);
  feilmeldinger.tidspunkt = validerTidspunkt(values.tidspunkt);
  feilmeldinger.arbeidsgiver = validerArbeidsgiver(values.arbeidsgiver);

  return feilmeldinger;
};

const submit = (values: DialogmoteInnkallingSkjemaValues) => {
  // TODO: Implement
  console.log("submitting values: ", values);
};

const DialogmoteInnkallingSkjema = ({
  ledere,
}: DialogmoteInnkallingSkjemaProps): ReactElement => {
  const initialValues: Partial<DialogmoteInnkallingSkjemaValues> = {};

  return (
    <Panel>
      <Form initialValues={initialValues} onSubmit={submit} validate={validate}>
        {({ handleSubmit }) => (
          <form onSubmit={handleSubmit}>
            <DialogmoteInnkallingVelgArbeidsgiver ledere={ledere} />
            <DialogmoteInnkallingTidOgSted />
            <DialogmoteInnkallingTekster />
            <DialogmoteInnkallingSkjemaRow>
              <Column className="col-xs-3">
                <Hovedknapp htmlType="submit">{texts.send}</Hovedknapp>
              </Column>
              <Column className="col-xs-2">
                <Flatknapp htmlType="button">{texts.cancel}</Flatknapp>
              </Column>
            </DialogmoteInnkallingSkjemaRow>
          </form>
        )}
      </Form>
    </Panel>
  );
};

export default DialogmoteInnkallingSkjema;
