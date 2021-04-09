import React from "react";
import Side from "../../../sider/Side";
import { MOETEPLANLEGGER } from "../../../enums/menypunkter";
import Motelandingsside from "../components/Motelandingsside";
import { useParams } from "react-router-dom";

const texts = {
  pageTitle: "Møtelandingsside",
};

const MotelandingssideContainer = () => {
  const { fnr } = useParams();

  return (
    <Side fnr={fnr} tittel={texts.pageTitle} aktivtMenypunkt={MOETEPLANLEGGER}>
      <Motelandingsside fnr={fnr} />
    </Side>
  );
};

export default MotelandingssideContainer;
