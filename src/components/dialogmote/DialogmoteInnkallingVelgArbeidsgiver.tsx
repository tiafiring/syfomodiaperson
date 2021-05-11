import React, { ReactElement } from "react";
import { Input, SkjemaelementFeilmelding } from "nav-frontend-skjema";
import { Field } from "react-final-form";
import ArbeidsgiverDropdown from "../mote/skjema/ArbeidsgiverDropdown";
import styled from "styled-components";
import DialogmoteInnkallingSkjemaSeksjon from "./DialogmoteInnkallingSkjemaSeksjon";
import { useLedere } from "../../hooks/useLedere";
import { Flex1Column, FlexColumn, FlexRow, PaddingSize } from "../Layout";
import { Innholdstittel } from "nav-frontend-typografi";

const texts = {
  title: "Arbeidsgiver",
  selectLabel: "Arbeidsgiver",
  navnLabel: "Nærmeste leder",
  epostLabel: "Epost",
};

const LederNavnColumn = styled(FlexColumn)`
  flex: 0.2;
  margin-right: 1em;
`;

const ArbeidsgiverTittel = styled(Innholdstittel)`
  margin-bottom: 1em;
`;

const DialogmoteInnkallingVelgArbeidsgiver = (): ReactElement => {
  const { ledere } = useLedere();
  return (
    <DialogmoteInnkallingSkjemaSeksjon>
      <ArbeidsgiverTittel>{texts.title}</ArbeidsgiverTittel>
      <Field<string> name="arbeidsgiver">
        {({ input, meta }) => {
          const valgtLeder = ledere.find((l) => l.orgnummer === input.value);
          return (
            <>
              <ArbeidsgiverDropdown
                velgArbeidsgiver={input.onChange}
                ledere={ledere}
                label={texts.selectLabel}
              />
              <SkjemaelementFeilmelding>
                {meta.touched && meta.error}
              </SkjemaelementFeilmelding>
              {valgtLeder && (
                <FlexRow topPadding={PaddingSize.MD}>
                  <LederNavnColumn>
                    <Input
                      bredde="L"
                      label={texts.navnLabel}
                      disabled
                      value={valgtLeder.navn}
                    />
                  </LederNavnColumn>
                  <Flex1Column>
                    <Input
                      bredde="L"
                      label={texts.epostLabel}
                      disabled
                      value={valgtLeder.epost}
                    />
                  </Flex1Column>
                </FlexRow>
              )}
            </>
          );
        }}
      </Field>
    </DialogmoteInnkallingSkjemaSeksjon>
  );
};
export default DialogmoteInnkallingVelgArbeidsgiver;
