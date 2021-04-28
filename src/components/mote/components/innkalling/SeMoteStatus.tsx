import React from "react";
import { Knapp } from "nav-frontend-knapper";
import { useHistory } from "react-router";
import { FlexRow } from "../../../Layout";

interface Props {
  fnr: string;
}

export const SeMoteStatus = ({ fnr }: Props) => {
  const history = useHistory();

  return (
    <FlexRow>
      <Knapp
        onClick={() => {
          history.push(`/sykefravaer/${fnr}/mote`);
        }}
      >
        Gå til møtestatus
      </Knapp>
    </FlexRow>
  );
};
