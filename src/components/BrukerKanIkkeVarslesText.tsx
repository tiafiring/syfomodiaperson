import { Normaltekst } from "nav-frontend-typografi";
import React from "react";

export const brukerKanIkkeVarslesTekst =
  "Innbyggeren er reservert mot elektronisk kommunikasjon med det offentlige, eller kontaktinformasjon mangler. Vi kan derfor ikke sende varsler til denne innbyggeren.";

export const BrukerKanIkkeVarslesText = () => {
  return <Normaltekst>{brukerKanIkkeVarslesTekst}</Normaltekst>;
};
