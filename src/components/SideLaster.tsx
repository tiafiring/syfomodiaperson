import { Tilgang } from "../data/tilgang/tilgang";
import React, { ReactElement } from "react";
import AppSpinner from "./AppSpinner";
import Feilmelding from "./Feilmelding";
import { hentBegrunnelseTekst } from "../utils/tilgangUtils";

interface SideLasterProps {
  henter: boolean;
  hentingFeilet: boolean;
  tilgang: Tilgang;
  children: ReactElement[] | ReactElement;
}

const texts = {
  errorTitle: "Du har ikke tilgang til denne tjenesten",
};

const SideLaster = ({
  henter,
  hentingFeilet,
  tilgang,
  children,
}: SideLasterProps): ReactElement => {
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
  return <>{children}</>;
};

export default SideLaster;
