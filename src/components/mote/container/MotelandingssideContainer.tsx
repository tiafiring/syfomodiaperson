import React from "react";
import Side from "../../../sider/Side";
import { MOETEPLANLEGGER } from "../../../enums/menypunkter";
import Motelandingsside from "../components/Motelandingsside";
import { useValgtPersonident } from "../../../hooks/useValgtBruker";

const texts = {
  pageTitle: "Møtelandingsside",
};

const MotelandingssideContainer = () => {
  const fnr = useValgtPersonident();

  return (
    <Side fnr={fnr} tittel={texts.pageTitle} aktivtMenypunkt={MOETEPLANLEGGER}>
      <Motelandingsside fnr={fnr} />
    </Side>
  );
};

export default MotelandingssideContainer;
