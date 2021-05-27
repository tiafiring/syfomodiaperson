import React from "react";
import { useHistory } from "react-router";
import { FlexRow } from "../../../Layout";
import { TrackedKnapp } from "../../../buttons/TrackedKnapp";

const texts = {
  moteStatusTrackingContext: "Møtelandingsside: Se møtestatus",
  gaTilMotestatus: "Gå til møtestatus",
};

export const SeMoteStatus = () => {
  const history = useHistory();

  return (
    <FlexRow>
      <TrackedKnapp
        context={texts.moteStatusTrackingContext}
        onClick={() => {
          history.push(`/sykefravaer/mote`);
        }}
      >
        {texts.gaTilMotestatus}
      </TrackedKnapp>
    </FlexRow>
  );
};
