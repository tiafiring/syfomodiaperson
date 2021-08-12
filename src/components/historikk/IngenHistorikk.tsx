import React, { ReactElement } from "react";
import Panel from "nav-frontend-paneler";
import Infomelding from "../Infomelding";
import Sidetopp from "../Sidetopp";

const texts = {
  topp: "Logg",
  tittel: "Denne personen har ingen oppfølgingshistorikk",
  melding:
    "Når en sykmeldt blir fulgt opp så vil oppfølgingen bli loggført her slik at du får oversikt over hva som har skjedd og hvem som har vært involvert i oppfølgingen.",
};

const IngenHistorikk = (): ReactElement => {
  return (
    <>
      <Sidetopp tittel={texts.topp} />
      <Panel>
        <Infomelding tittel={texts.tittel} melding={texts.melding} />
      </Panel>
    </>
  );
};

export default IngenHistorikk;
