import React, { ReactElement } from "react";
import Panel from "nav-frontend-paneler";
import TilbakeTilSoknader from "./TilbakeTilSoknader";

const texts = {
  title: "Søknaden er ikke sendt ennå",
  content:
    "Når brukeren har fullført søknaden og sendt den inn til arbeidsgiver og/eller NAV vil du kunne se statusen på søknaden her.",
};

const IkkeInnsendtSoknad = (): ReactElement => (
  <>
    <Panel className="panel--melding blokk">
      <h2 className="hode hode--info hode-dekorert">{texts.title}</h2>
      <p>{texts.content}</p>
    </Panel>
    <TilbakeTilSoknader />
  </>
);

export default IkkeInnsendtSoknad;
