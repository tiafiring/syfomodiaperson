import React, { ReactElement } from "react";
import Oppsummeringsvisning from "../soknad-felles-oppsummering/Oppsummeringsvisning";
import SoknadSpeiling from "../soknad-felles/SoknadSpeiling";
import StatuspanelBehandlingsdager from "./StatuspanelBehandlingsdager";
import { SykepengesoknadDTO } from "../../../../data/sykepengesoknad/types/SykepengesoknadDTO";
import { Brodsmule } from "../../Brodsmuler";

const texts = {
  tittel: "Søknad om sykepenger for enkeltstående behandlingsdager",
  oppsummering: "Oppsummering av søknaden",
};

interface OppsummeringPanelProps {
  soknad: SykepengesoknadDTO;
}

const OppsummeringPanel = ({ soknad }: OppsummeringPanelProps) => {
  return (
    <div className="panel blokk">
      <h2 className="panel__tittel blokk--xs"> {texts.oppsummering}</h2>
      <Oppsummeringsvisning soknad={soknad} />
    </div>
  );
};

interface SykepengesoknadBehandlingsdagerProps {
  brukernavn: string;
  brodsmuler: Brodsmule[];
  soknad: SykepengesoknadDTO;
}

const SykepengesoknadBehandlingsdager = ({
  brukernavn,
  brodsmuler,
  soknad,
}: SykepengesoknadBehandlingsdagerProps): ReactElement => {
  return (
    <SoknadSpeiling
      tittel={texts.tittel}
      brukernavn={brukernavn}
      brodsmuler={brodsmuler}
    >
      <StatuspanelBehandlingsdager soknad={soknad} />
      <OppsummeringPanel soknad={soknad} />
    </SoknadSpeiling>
  );
};

export default SykepengesoknadBehandlingsdager;
