import React, { ReactElement } from "react";
import { FlexRow, PaddingSize } from "../../Layout";
import { Normaltekst } from "nav-frontend-typografi";
import { ReferatInfoColumn } from "./ReferatInfoColumn";
import { ReferatTextareaFieldColumn } from "./ReferatTextareaFieldColumn";

export const MAX_LENGTH_KONKLUSJON = 1000;

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
      maxLength={MAX_LENGTH_KONKLUSJON}
    />
    <ReferatInfoColumn>
      <Normaltekst>{texts.infoboks}</Normaltekst>
    </ReferatInfoColumn>
  </FlexRow>
);
