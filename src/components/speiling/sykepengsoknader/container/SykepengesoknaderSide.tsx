import React, { ReactElement } from "react";
import Side from "../../../../sider/Side";
import Soknader from "../soknader/Soknader";
import Brodsmuler from "../../Brodsmuler";
import { SYKEPENGESOKNADER } from "@/enums/menypunkter";
import Speilingvarsel from "../../Speilingvarsel";
import Feilstripe from "../../../Feilstripe";
import SideLaster from "../../../SideLaster";
import { useValgtPersonident } from "@/hooks/useValgtBruker";
import { useNavBrukerData } from "@/data/navbruker/navbruker_hooks";
import { useSykepengesoknaderQuery } from "@/data/sykepengesoknad/sykepengesoknadQueryHooks";

const errorMessageText = (name: string) => {
  return `Beklager – vi kunne ikke hente alle sykepengesøknadene til ${name}`;
};

const SykepengesoknaderSide = (): ReactElement => {
  const fnr = useValgtPersonident();
  const {
    data: sykepengesoknader,
    isError,
    isLoading,
  } = useSykepengesoknaderQuery();

  const brukernavn = useNavBrukerData().navn;
  const brodsmuler = [
    {
      tittel: "Ditt sykefravær",
    },
    {
      tittel: "Søknader om sykepenger",
    },
  ];
  return (
    <Side tittel="Sykepengesøknader" aktivtMenypunkt={SYKEPENGESOKNADER}>
      <SideLaster henter={isLoading} hentingFeilet={isError}>
        <div>
          <Feilstripe
            className="blokk--s"
            tekst={errorMessageText(brukernavn)}
            vis={isError}
          />
          <Speilingvarsel brukernavn={brukernavn} />
          <div className="speiling">
            <Brodsmuler brodsmuler={brodsmuler} />
            <Soknader fnr={fnr} soknader={sykepengesoknader} />
          </div>
        </div>
      </SideLaster>
    </Side>
  );
};

export default SykepengesoknaderSide;
