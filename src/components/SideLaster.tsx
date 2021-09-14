import React, { ReactElement, ReactNode } from "react";
import AppSpinner from "./AppSpinner";
import Feilmelding from "./Feilmelding";
import { hentBegrunnelseTekst } from "@/utils/tilgangUtils";
import { useTilgang } from "@/hooks/useTilgang";

interface SideLasterProps {
  henter: boolean;
  hentingFeilet: boolean;
  children: ReactNode;
}

const texts = {
  errorTitle: "Du har ikke tilgang til denne tjenesten",
};

const SideLaster = ({
  henter,
  hentingFeilet,
  children,
}: SideLasterProps): ReactElement => {
  const { hentingTilgangForsokt, tilgang, hentingTilgangFeilet } = useTilgang();
  if (henter || !hentingTilgangForsokt) {
    return <AppSpinner />;
  }
  if (!tilgang.harTilgang) {
    return (
      <Feilmelding
        tittel={texts.errorTitle}
        melding={hentBegrunnelseTekst(tilgang.begrunnelse)}
      />
    );
  }
  if (hentingFeilet || hentingTilgangFeilet) {
    return <Feilmelding />;
  }
  return <>{children}</>;
};

export default SideLaster;
