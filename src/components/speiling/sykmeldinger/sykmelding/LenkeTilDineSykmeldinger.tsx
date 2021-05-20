import React from "react";
import Tilbakelenke from "../../../Tilbakelenke";

const texts = {
  tilbake: "Gå til dine sykmeldinger\n",
};

const LenkeTilDineSykmeldinger = () => {
  return (
    <Tilbakelenke to={`/sykefravaer/sykmeldinger`} tekst={texts.tilbake} />
  );
};

export default LenkeTilDineSykmeldinger;
