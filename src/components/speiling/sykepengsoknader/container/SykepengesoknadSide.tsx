import React from "react";
import { ReactElement } from "react";
import { useValgtPersonident } from "@/hooks/useValgtBruker";
import { SYKEPENGESOKNADER } from "@/enums/menypunkter";
import Side from "../../../../sider/Side";
import SykepengesoknadContainer from "./SykepengesoknadContainer";

const texts = {
  tittel: "Sykepengesøknader",
};

export const SykepengesoknadSide = (): ReactElement => {
  const fnr = useValgtPersonident();

  return (
    <Side fnr={fnr} tittel={texts.tittel} aktivtMenypunkt={SYKEPENGESOKNADER}>
      <SykepengesoknadContainer />
    </Side>
  );
};
