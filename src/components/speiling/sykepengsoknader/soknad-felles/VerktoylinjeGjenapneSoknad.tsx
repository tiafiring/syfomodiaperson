import React, { ReactElement } from "react";
import { VerktoyKnapp, Verktoylinje } from "../../Verktoylinje";
import { SykepengesoknadDTO } from "@/data/sykepengesoknad/types/SykepengesoknadDTO";
import { erOpprettetSisteAar } from "@/utils/sykepengesoknadUtils";

const texts = {
  gjenapne: "Gjenåpne søknad",
};

interface VerktoylinjeGjenapneSoknadProps {
  soknad: SykepengesoknadDTO;
}

const VerktoylinjeGjenapneSoknad = ({
  soknad,
}: VerktoylinjeGjenapneSoknadProps): ReactElement => {
  return erOpprettetSisteAar(soknad) ? (
    <Verktoylinje>
      <VerktoyKnapp>{texts.gjenapne}</VerktoyKnapp>
    </Verktoylinje>
  ) : (
    <></>
  );
};

export default VerktoylinjeGjenapneSoknad;
