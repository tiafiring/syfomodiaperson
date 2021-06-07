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
  onSendClick: () => void;
  onPreviewClick: () => void;
  onCancelClick: () => void;
  pageTitle: string;
}

const HovedKnappRightMargin = styled(TrackedHovedknapp)`
  margin-right: 2em;
`;

const ReferatButtons = ({
  onSendClick,
  onPreviewClick,
  onCancelClick,
  pageTitle,
}: ReferatButtonsProps): ReactElement => (
  <>
    <FlexRow topPadding={PaddingSize.MD}>
      <Knapp htmlType="button" onClick={onPreviewClick}>
        {texts.preview}
      </Knapp>
    </FlexRow>
    <FlexRow topPadding={PaddingSize.LG}>
      <HovedKnappRightMargin
        context={pageTitle}
        htmlType="submit"
        onClick={onSendClick}
      >
        {texts.send}
      </HovedKnappRightMargin>
      <Flatknapp htmlType="button" onClick={onCancelClick}>
        {texts.abort}
      </Flatknapp>
    </FlexRow>
  </>
);

export default ReferatButtons;
