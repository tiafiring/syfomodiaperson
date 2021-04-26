import { Tilgang } from "../data/tilgang/tilgang";
import React, { ReactElement } from "react";
import AppSpinner from "./AppSpinner";
import Feilmelding from "./Feilmelding";
import { hentBegrunnelseTekst } from "../utils/tilgangUtils";

interface LasterSideProps {
  henter: boolean;
  hentingFeilet: boolean;
  tilgang: Tilgang;
  children: ReactElement;
}

const texts = {
  errorTitle: "Du har ikke tilgang til denne tjenesten",
};

const LasterSide = ({
  henter,
  hentingFeilet,
  tilgang,
  children,
}: LasterSideProps) => {
  if (henter) {
    return <AppSpinner />;
  }
  if (hentingFeilet) {
    return <Feilmelding />;
  }
  if (!tilgang.harTilgang) {
    return (
      <Feilmelding
        tittel={texts.errorTitle}
        melding={hentBegrunnelseTekst(tilgang.begrunnelse)}
      />
    );
  }
  return children;
};

export default LasterSide;
