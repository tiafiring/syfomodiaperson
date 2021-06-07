import React, { ReactElement } from "react";
import { FlexRow, PaddingSize } from "../../Layout";
import { ReferatInfoColumn } from "./ReferatInfoColumn";
import { ReferatTextareaFieldColumn } from "./ReferatTextareaFieldColumn";

export const MAX_LENGTH_ARBEIDSGIVERS_OPPGAVE = 200;

const texts = {
  label: "Arbeidsgiverens oppgave:",
  placeholder: "Hva avtalte dere at arbeidsgiveren skal gjøre?",
};

export const ArbeidsgiversOppgave = (): ReactElement => (
  <FlexRow bottomPadding={PaddingSize.MD}>
    <ReferatTextareaFieldColumn
      size="medium"
      fieldName="arbeidsgiversOppgave"
      label={texts.label}
      placeholder={texts.placeholder}
      maxLength={MAX_LENGTH_ARBEIDSGIVERS_OPPGAVE}
    />
    <ReferatInfoColumn />
  </FlexRow>
);
