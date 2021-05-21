import React from "react";
import { useHistory } from "react-router";
import { FlexRow } from "../../../Layout";
import { useFnrParam } from "../../../../hooks/useFnrParam";
import { TrackedKnapp } from "../../../buttons/TrackedKnapp";

const texts = {
  moteStatusTrackingContext: "Møtelandingsside: Se møtestatus",
  gaTilMotestatus: "Gå til møtestatus",
};

export const SeMoteStatus = () => {
  const history = useHistory();
  const fnr = useFnrParam();

  return (
    <FlexRow>
      <TrackedKnapp
        context={texts.moteStatusTrackingContext}
        onClick={() => {
          history.push(`/sykefravaer/${fnr}/mote`);
        }}
      >
        {texts.gaTilMotestatus}
      </TrackedKnapp>
    </FlexRow>
  );
};
