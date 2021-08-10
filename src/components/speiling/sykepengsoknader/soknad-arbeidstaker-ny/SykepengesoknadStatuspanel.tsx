import React, { ReactElement } from "react";
import Statuspanel, {
  StatusNokkelopplysning,
  Statusopplysninger,
} from "../../Statuspanel";
import hentStatustekst from "../../../../utils/soknad-felles/hentSoknadStatustekst";
import hentSykepengetekst from "../../../../utils/soknad-felles/hentSykepengetekst";
import { VerktoyKnapp, Verktoylinje } from "../../Verktoylinje";
import {
  SoknadstatusDTO,
  SykepengesoknadDTO,
} from "../../../../data/sykepengesoknad/types/SykepengesoknadDTO";

const texts = {
  status: "Status",
  tittel: "Utbetaling av sykepenger",
};

interface StatusOgSykepengeopplysningerProps {
  soknad: SykepengesoknadDTO;
}

const StatusOgSykepengeopplysninger = (
  statusOgSykepengeopplysningerProps: StatusOgSykepengeopplysningerProps
) => {
  const { soknad } = statusOgSykepengeopplysningerProps;
  return (
    <Statusopplysninger>
      <StatusNokkelopplysning tittel={texts.status}>
        <p>{hentStatustekst(soknad)}</p>
      </StatusNokkelopplysning>
      <StatusNokkelopplysning tittel={texts.tittel}>
        <p dangerouslySetInnerHTML={hentSykepengetekst(soknad)} />
      </StatusNokkelopplysning>
    </Statusopplysninger>
  );
};

interface SykepengesoknadStatuspanelProps {
  soknad: SykepengesoknadDTO;
}

const SykepengesoknadStatuspanel = (
  sykepengesoknadStatuspanelProps: SykepengesoknadStatuspanelProps
): ReactElement => {
  const { soknad } = sykepengesoknadStatuspanelProps;
  const ETT_AAR_SIDEN = new Date();
  ETT_AAR_SIDEN.setFullYear(ETT_AAR_SIDEN.getFullYear() - 1);
  const visEndreknapp =
    soknad.opprettetDato >= ETT_AAR_SIDEN &&
    soknad.status === SoknadstatusDTO.SENDT;

  return (
    <Statuspanel enKolonne>
      <StatusOgSykepengeopplysninger soknad={soknad} />
      {visEndreknapp && (
        <Verktoylinje>
          <VerktoyKnapp>Endre søknad</VerktoyKnapp>
        </Verktoylinje>
      )}
    </Statuspanel>
  );
};

export default SykepengesoknadStatuspanel;
