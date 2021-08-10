import React, { ReactElement } from "react";
import { VerktoyKnapp, Verktoylinje } from "../../Verktoylinje";
import { SykepengesoknadDTO } from "../../../../data/sykepengesoknad/types/SykepengesoknadDTO";

const texts = {
  gjenapne: "Gjenåpne søknad",
};

export const soknadKanGjenapnes = (opprettetDato: Date): boolean => {
  const ETT_AAR_SIDEN = new Date();
  ETT_AAR_SIDEN.setFullYear(ETT_AAR_SIDEN.getFullYear() - 1);
  return opprettetDato >= ETT_AAR_SIDEN;
};

interface VerktoylinjeGjenapneSoknadProps {
  soknad: SykepengesoknadDTO;
}

const VerktoylinjeGjenapneSoknad = ({
  soknad,
}: VerktoylinjeGjenapneSoknadProps): ReactElement | null => {
  return soknadKanGjenapnes(soknad.opprettetDato) ? (
    <Verktoylinje>
      <VerktoyKnapp>{texts.gjenapne}</VerktoyKnapp>
    </Verktoylinje>
  ) : null;
};

export default VerktoylinjeGjenapneSoknad;
