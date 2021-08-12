import React, { ReactElement } from "react";
import Panel from "nav-frontend-paneler";
import Infomelding from "../Infomelding";

const texts = {
  tittel: "Denne personen har ingen oppfølgingshistorikk",
  melding:
    "Når en sykmeldt blir fulgt opp så vil oppfølgingen bli loggført her slik at du får oversikt over hva som har skjedd og hvem som har vært involvert i oppfølgingen.",
};

const IngenHistorikk = (): ReactElement => (
  <Panel>
    <Infomelding tittel={texts.tittel} melding={texts.melding} />
  </Panel>
);

export default IngenHistorikk;
