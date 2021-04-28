import React from "react";
import Side from "../../../sider/Side";
import { MOETEPLANLEGGER } from "../../../enums/menypunkter";
import Motelandingsside from "../components/Motelandingsside";
import { useFnrParam } from "../../../hooks/useFnrParam";

const texts = {
  pageTitle: "Møtelandingsside",
};

const MotelandingssideContainer = () => {
  const fnr = useFnrParam();

  return (
    <Side fnr={fnr} tittel={texts.pageTitle} aktivtMenypunkt={MOETEPLANLEGGER}>
      <Motelandingsside fnr={fnr} />
    </Side>
  );
};

export default MotelandingssideContainer;
