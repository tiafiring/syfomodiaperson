import React from "react";
import Tilbakelenke from "../../../Tilbakelenke";

const texts = {
  tilbake: "Gå til dine sykmeldinger\n",
};

interface LenkeTilDineSykmeldingerProps {
  fnr: string;
}

const LenkeTilDineSykmeldinger = (
  lenkeTilDineSykmeldingerProps: LenkeTilDineSykmeldingerProps
) => {
  const { fnr } = lenkeTilDineSykmeldingerProps;
  return (
    <Tilbakelenke
      to={`/sykefravaer/${fnr}/sykmeldinger`}
      tekst={texts.tilbake}
    />
  );
};

export default LenkeTilDineSykmeldinger;
