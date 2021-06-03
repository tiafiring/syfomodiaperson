import React, { ReactElement } from "react";
import { FlexRow, PaddingSize } from "../../Layout";
import { Normaltekst } from "nav-frontend-typografi";
import { ReferatInfoColumn } from "./ReferatInfoColumn";
import { ReferatTextareaFieldColumn } from "./ReferatTextareaFieldColumn";

const texts = {
  label: "Arbeidstakerens oppgave:",
  placeholder: "Hva avtalte dere at arbeidstakeren skal gjøre?",
  infoboks: "Husk å skrive i du-form i feltet om arbeidstakerens oppgave.",
};

export const ArbeidstakersOppgave = (): ReactElement => (
  <FlexRow bottomPadding={PaddingSize.MD}>
    <ReferatTextareaFieldColumn
      size="medium"
      fieldName="arbeidstakersOppgave"
      label={texts.label}
      placeholder={texts.placeholder}
      maxLength={200}
    />
    <ReferatInfoColumn>
      <Normaltekst>{texts.infoboks}</Normaltekst>
    </ReferatInfoColumn>
  </FlexRow>
);
