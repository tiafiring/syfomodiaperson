import React from "react";
import { Knapp } from "nav-frontend-knapper";
import { useHistory } from "react-router";
import { FlexRow } from "../../../Layout";
import { useFnrParam } from "../../../../hooks/useFnrParam";

const texts = {
  gaTilMotestatus: "Gå til møtestatus",
};

export const SeMoteStatus = () => {
  const history = useHistory();
  const fnr = useFnrParam();

  return (
    <FlexRow>
      <Knapp
        onClick={() => {
          history.push(`/sykefravaer/${fnr}/mote`);
        }}
      >
        {texts.gaTilMotestatus}
      </Knapp>
    </FlexRow>
  );
};
