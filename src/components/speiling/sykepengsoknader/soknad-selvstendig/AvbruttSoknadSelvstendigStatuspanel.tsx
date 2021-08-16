import React, { ReactElement } from "react";
import Statuspanel, {
  StatusNokkelopplysning,
  Statusopplysninger,
} from "../../Statuspanel";
import { tilLesbarDatoMedArstall } from "@/utils/datoUtils";
import VerktoylinjeGjenapneSoknad from "../soknad-felles/VerktoylinjeGjenapneSoknad";
import { SykepengesoknadDTO } from "@/data/sykepengesoknad/types/SykepengesoknadDTO";

const texts = {
  tittel: "Dato avbrutt",
  status: "Status\n",
  avbrutt: "Avbrutt av deg\n",
};

interface AvbruttSoknadSelvstendigStatuspanelProps {
  soknad: SykepengesoknadDTO;
}

const AvbruttSoknadSelvstendigStatuspanel = ({
  soknad,
}: AvbruttSoknadSelvstendigStatuspanelProps): ReactElement => {
  return (
    <Statuspanel>
      <Statusopplysninger>
        <StatusNokkelopplysning tittel={texts.status}>
          <p>{texts.avbrutt}</p>
        </StatusNokkelopplysning>
        <StatusNokkelopplysning tittel={texts.tittel}>
          <p>{tilLesbarDatoMedArstall(soknad.avbruttDato)}</p>
        </StatusNokkelopplysning>
      </Statusopplysninger>
      <VerktoylinjeGjenapneSoknad soknad={soknad} />
    </Statuspanel>
  );
};

export default AvbruttSoknadSelvstendigStatuspanel;
