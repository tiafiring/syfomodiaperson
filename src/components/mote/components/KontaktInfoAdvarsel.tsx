import React from "react";
import AlertStripe from "nav-frontend-alertstriper";
import { BrukerKanIkkeVarslesText } from "../../BrukerKanIkkeVarslesText";

const KontaktInfoAdvarsel = () => {
  return (
    <div className="panel">
      <AlertStripe type="advarsel">
        <BrukerKanIkkeVarslesText />
      </AlertStripe>
    </div>
  );
};

export default KontaktInfoAdvarsel;
