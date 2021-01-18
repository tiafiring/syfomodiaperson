import React from "react";
import AlertStripe from "nav-frontend-alertstriper";

const ikkeVarselInfoTekst =
  "Innbyggeren er reservert mot elektronisk kommunikasjon med det offentlige, eller har ingen kontaktinformasjon registrert, vi kan derfor ikke sende varsler til personen.";

const KontaktInfoAdvarsel = () => {
  return (
    <div className="panel">
      <AlertStripe type="advarsel">
        <p>{ikkeVarselInfoTekst}</p>
      </AlertStripe>
    </div>
  );
};

export default KontaktInfoAdvarsel;
