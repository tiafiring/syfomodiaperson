import React, { ReactElement } from "react";
import { StatusNokkelopplysning } from "../../Statuspanel";
import hentSykepengetekst from "../../../../utils/soknad-felles/hentSykepengetekst";
import hentSoknadStatustekst from "../../../../utils/soknad-felles/hentSoknadStatustekst";
import { SykepengesoknadDTO } from "@/data/sykepengesoknad/types/SykepengesoknadDTO";

const texts = {
  sendt: "Sendt til NAV",
  sender: "Sender til NAV",
  hjelpetekst:
    "Du har gjort det riktig! Det kan bare ta noen minutter før den er kommet fram til mottakeren. Du trenger ikke gjøre noe mer.",
  utbetaling: "Utbetaling av sykepenger",
  status: "Status",
};

interface StatuspanelBehandlingsdagerProps {
  soknad: SykepengesoknadDTO;
}

const StatuspanelBehandlingsdager = ({
  soknad,
}: StatuspanelBehandlingsdagerProps): ReactElement => {
  return (
    <div className="panel panel--komprimert blokk statuspanel">
      <StatusNokkelopplysning tittel={texts.status}>
        <p
          dangerouslySetInnerHTML={{ __html: hentSoknadStatustekst(soknad) }}
        />
      </StatusNokkelopplysning>
      <StatusNokkelopplysning tittel={texts.utbetaling}>
        <p dangerouslySetInnerHTML={hentSykepengetekst(soknad)} />
      </StatusNokkelopplysning>
    </div>
  );
};

export default StatuspanelBehandlingsdager;
