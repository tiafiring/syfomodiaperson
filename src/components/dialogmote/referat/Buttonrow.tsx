import React from "react";
import styled from "styled-components";
import { Flatknapp, Hovedknapp, Knapp } from "nav-frontend-knapper";
import { FlexRow, PaddingSize } from "../../Layout";

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

const Buttonrow = ({
  sendMethod,
  previewMethod,
  abortMethod,
}: KnapperadProps) => {
  return (
    <FlexRow topPadding={PaddingSize.MD}>
      <HovedKnappRightMargin htmlType="submit" onClick={sendMethod}>
        {texts.send}
      </HovedKnappRightMargin>
      <Knapp htmlType="button" onClick={previewMethod}>
        {texts.preview}
      </Knapp>
      <Flatknapp htmlType="button" onClick={abortMethod}>
        {texts.abort}
      </Flatknapp>
    </FlexRow>
  );
};

export default Buttonrow;
