import React, { ReactElement } from "react";
import { Flatknapp, Knapp } from "nav-frontend-knapper";
import { FlexRow, PaddingSize } from "../../Layout";
import styled from "styled-components";
import { TrackedHovedknapp } from "../../buttons/TrackedHovedknapp";

const texts = {
  send: "Lagre og send",
  preview: "Se forhåndsvisning",
  abort: "Avbryt",
};

interface ReferatButtonsProps {
  sendMethod: () => void;
  previewMethod: () => void;
  abortMethod: () => void;
  pageTitle: string;
}

const HovedKnappRightMargin = styled(TrackedHovedknapp)`
  margin-right: 2em;
`;

const ReferatButtons = ({
  sendMethod,
  previewMethod,
  abortMethod,
  pageTitle,
}: ReferatButtonsProps): ReactElement => (
  <>
    <FlexRow topPadding={PaddingSize.LG}>
      <Knapp htmlType="button" onClick={previewMethod}>
        {texts.preview}
      </Knapp>
    </FlexRow>
    <FlexRow topPadding={PaddingSize.LG}>
      <HovedKnappRightMargin
        context={pageTitle}
        htmlType="submit"
        onClick={sendMethod}
      >
        {texts.send}
      </HovedKnappRightMargin>
      <Flatknapp htmlType="button" onClick={abortMethod}>
        {texts.abort}
      </Flatknapp>
    </FlexRow>
  </>
);

export default ReferatButtons;
