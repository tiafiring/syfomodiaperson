import React, { ReactElement } from "react";
import { FlexRow, PaddingSize } from "../../Layout";
import { Normaltekst } from "nav-frontend-typografi";
import { ReferatInfoColumn } from "./ReferatInfoColumn";
import { ReferatTextareaFieldColumn } from "./ReferatTextareaFieldColumn";

const texts = {
  label: "Konklusjon",
  placeholder: "Gi en kort oppsummering",
  infoboks: "Konklusjonen og oppgavene nedenfor vil vises øverst i referatet.",
};

export const Konklusjon = (): ReactElement => (
  <FlexRow bottomPadding={PaddingSize.MD}>
    <ReferatTextareaFieldColumn
      size="stor"
      fieldName="konklusjon"
      label={texts.label}
      placeholder={texts.placeholder}
      maxLength={1000}
    />
    <ReferatInfoColumn>
      <Normaltekst>{texts.infoboks}</Normaltekst>
    </ReferatInfoColumn>
  </FlexRow>
);
