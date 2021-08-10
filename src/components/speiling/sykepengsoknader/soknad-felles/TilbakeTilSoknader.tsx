import React, { ReactElement } from "react";
import Tilbakelenke from "../../../Tilbakelenke";

const TilbakeTilSoknader = (): ReactElement => {
  return (
    <Tilbakelenke
      to={`/sykefravaer/sykepengesoknader`}
      tekst="Gå til sykepengesøknader"
    />
  );
};

export default TilbakeTilSoknader;
