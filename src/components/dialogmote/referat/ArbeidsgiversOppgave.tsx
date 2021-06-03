import React, { ReactElement } from "react";
import { FlexRow, PaddingSize } from "../../Layout";
import { ReferatInfoColumn } from "./ReferatInfoColumn";
import { ReferatTextareaFieldColumn } from "./ReferatTextareaFieldColumn";

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
      maxLength={200}
    />
    <ReferatInfoColumn />
  </FlexRow>
);
