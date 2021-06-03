import React, { ReactElement } from "react";
import { Flatknapp, Hovedknapp, Knapp } from "nav-frontend-knapper";
import { FlexRow, PaddingSize } from "../../Layout";
import styled from "styled-components";

const texts = {
  send: "Lagre og send",
  preview: "Se forhåndsvisning",
  abort: "Avbryt",
};

interface KnapperadProps {
  sendMethod: () => void;
  previewMethod: () => void;
  abortMethod: () => void;
}

const HovedKnappRightMargin = styled(Hovedknapp)`
  margin-right: 2em;
`;

const ReferatButtons = ({
  sendMethod,
  previewMethod,
  abortMethod,
}: KnapperadProps): ReactElement => (
  <>
    <FlexRow topPadding={PaddingSize.LG}>
      <Knapp htmlType="button" onClick={previewMethod}>
        {texts.preview}
      </Knapp>
    </FlexRow>
    <FlexRow topPadding={PaddingSize.LG}>
      <HovedKnappRightMargin htmlType="submit" onClick={sendMethod}>
        {texts.send}
      </HovedKnappRightMargin>
      <Flatknapp htmlType="button" onClick={abortMethod}>
        {texts.abort}
      </Flatknapp>
    </FlexRow>
  </>
);

export default ReferatButtons;
