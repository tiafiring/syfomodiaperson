import React, { ReactElement } from "react";
import { FlexRow, PaddingSize } from "../../Layout";
import { ReferatInfoColumn } from "./ReferatInfoColumn";
import { ReferatTextareaFieldColumn } from "./ReferatTextareaFieldColumn";

const texts = {
  label: "Veilederens oppgave (valgfri):",
  placeholder: "Hva avtalte dere at du skal gjøre?",
};

export const VeiledersOppgave = (): ReactElement => (
  <FlexRow bottomPadding={PaddingSize.LG}>
    <ReferatTextareaFieldColumn
      size="medium"
      fieldName={"veiledersOppgave"}
      label={texts.label}
      placeholder={texts.placeholder}
      maxLength={200}
    />
    <ReferatInfoColumn />
  </FlexRow>
);
