import React from "react";
import { Knapp } from "nav-frontend-knapper";
import { useHistory } from "react-router";
import { FlexRow } from "../../../Layout";
import { useFnrParam } from "../../../../hooks/useFnrParam";
import { useTrackButtonClick } from "../../../../data/logging/loggingHooks";

const texts = {
  moteStatusTrackingContext: "Møtelandingsside: Se møtestatus",
  gaTilMotestatus: "Gå til møtestatus",
};

export const SeMoteStatus = () => {
  const history = useHistory();
  const fnr = useFnrParam();
  const trackButtonClick = useTrackButtonClick();

  return (
    <FlexRow>
      <Knapp
        onClick={() => {
          trackButtonClick(
            texts.gaTilMotestatus,
            texts.moteStatusTrackingContext
          );
          history.push(`/sykefravaer/${fnr}/mote`);
        }}
      >
        {texts.gaTilMotestatus}
      </Knapp>
    </FlexRow>
  );
};
