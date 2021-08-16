import React, { ReactElement } from "react";
import Oppsummeringsvisning from "../soknad-felles-oppsummering/Oppsummeringsvisning";
import SoknadSpeiling from "../soknad-felles/SoknadSpeiling";
import StatuspanelUtland from "./StatuspanelUtland";
import { SykepengesoknadDTO } from "@/data/sykepengesoknad/types/SykepengesoknadDTO";
import { Brodsmule } from "../../Brodsmuler";

const texts = {
  tittel: "Søknad om sykepenger under opphold utenfor Norge",
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

interface SykepengesoknadUtlandProps {
  brukernavn: string;
  brodsmuler: Brodsmule[];
  soknad: SykepengesoknadDTO;
}

const SykepengesoknadUtland = ({
  brukernavn,
  brodsmuler,
  soknad,
}: SykepengesoknadUtlandProps): ReactElement => {
  return (
    <SoknadSpeiling
      tittel={texts.tittel}
      brukernavn={brukernavn}
      brodsmuler={brodsmuler}
    >
      <StatuspanelUtland soknad={soknad} />
      <OppsummeringPanel soknad={soknad} />
    </SoknadSpeiling>
  );
};

export default SykepengesoknadUtland;
