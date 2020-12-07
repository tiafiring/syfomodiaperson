import React from "react";
import Alertstripe from "nav-frontend-alertstriper";

interface FeilstripeProps {
  vis: boolean;
  className: string;
  tekst: string;
}

const Feilstripe = (feilstripeProps: FeilstripeProps) => {
  const {
    vis,
    className,
    tekst = "Beklager, det oppstod en feil! Vennligst prøv igjen senere.",
  } = feilstripeProps;
  return (
    <div aria-live="polite" role="alert">
      {vis ? (
        <Alertstripe type="advarsel" className={className}>
          <p className="sist">{tekst}</p>
        </Alertstripe>
      ) : null}
    </div>
  );
};

export default Feilstripe;
