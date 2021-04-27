import React, { ReactElement } from "react";
import { Input, SkjemaelementFeilmelding } from "nav-frontend-skjema";
import { Column, Row } from "nav-frontend-grid";
import { Leder } from "../../data/leder/ledere";
import { Field } from "react-final-form";
import ArbeidsgiverDropdown from "../mote/skjema/ArbeidsgiverDropdown";
import styled from "styled-components";
import DialogmoteInnkallingSkjemaTittel from "./DialogmoteInnkallingSkjemaTittel";
import DialogmoteInnkallingSkjemaSeksjon from "./DialogmoteInnkallingSkjemaSeksjon";

interface DialogmoteInnkallingVelgArbeidsgiverProps {
  ledere: Leder[];
}

const texts = {
  title: "Arbeidsgiver",
  selectLabel: "Arbeidsgiver",
  navnLabel: "Nærmeste leder",
  epostLabel: "Epost",
};

interface LederFeltProps {
  label: string;
  value?: string;
}

const ArbeidsgiverDropdownWrapper = styled.div`
  margin-bottom: 1.25rem;
`;

const LederFelt = ({ label, value }: LederFeltProps) => (
  <Column className="col-xs-6 col-sm-3">
    <Input bredde="L" label={label} disabled value={value} />
  </Column>
);

const DialogmoteInnkallingVelgArbeidsgiver = ({
  ledere,
}: DialogmoteInnkallingVelgArbeidsgiverProps): ReactElement => (
  <DialogmoteInnkallingSkjemaSeksjon>
    <DialogmoteInnkallingSkjemaTittel>
      {texts.title}
    </DialogmoteInnkallingSkjemaTittel>
    <Field<string> name="arbeidsgiver">
      {({ input, meta }) => {
        const valgtLeder = ledere.find((l) => l.orgnummer === input.value);
        return (
          <>
            <ArbeidsgiverDropdownWrapper>
              <ArbeidsgiverDropdown
                velgArbeidsgiver={input.onChange}
                ledere={ledere}
                label={texts.selectLabel}
              />
              <SkjemaelementFeilmelding>
                {meta.touched && meta.error}
              </SkjemaelementFeilmelding>
            </ArbeidsgiverDropdownWrapper>
            {valgtLeder && (
              <Row>
                <LederFelt label={texts.navnLabel} value={valgtLeder.navn} />
                <LederFelt label={texts.epostLabel} value={valgtLeder.epost} />
              </Row>
            )}
          </>
        );
      }}
    </Field>
  </DialogmoteInnkallingSkjemaSeksjon>
);
export default DialogmoteInnkallingVelgArbeidsgiver;
