import { Normaltekst } from "nav-frontend-typografi";
import React from "react";

export const brukerKanIkkeVarslesTekst =
  "Innbyggeren er reservert mot elektronisk kommunikasjon med det offentlige eller har ingen kontaktinformasjon registrert. Vi kan derfor ikke sende varsler til personen.";

export const BrukerKanIkkeVarslesText = () => {
  return <Normaltekst>{brukerKanIkkeVarslesTekst}</Normaltekst>;
};
