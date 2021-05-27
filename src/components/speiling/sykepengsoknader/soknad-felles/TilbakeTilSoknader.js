import React from "react";
import Tilbakelenke from "../../../Tilbakelenke";

const TilbakeTilSoknader = () => {
  return (
    <Tilbakelenke
      to={`/sykefravaer/sykepengesoknader`}
      tekst="Gå til sykepengesøknader"
    />
  );
};

export default TilbakeTilSoknader;
