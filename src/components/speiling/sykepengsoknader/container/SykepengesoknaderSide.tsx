import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import Side from "../../../../sider/Side";
import Soknader from "../soknader/Soknader";
import Brodsmuler from "../../Brodsmuler";
import { SYKEPENGESOKNADER } from "../../../../enums/menypunkter";
import Speilingvarsel from "../../Speilingvarsel";
import Feilstripe from "../../../Feilstripe";
import SideLaster from "../../../SideLaster";
import { harForsoktHentetSoknader } from "../../../../utils/reducerUtils";
import { useValgtPersonident } from "../../../../hooks/useValgtBruker";
import { hentSoknader } from "../../../../data/sykepengesoknad/soknader_actions";
import { useNavBrukerData } from "../../../../data/navbruker/navbruker_hooks";
import { useSoknaderState } from "../../../../data/sykepengesoknad/soknader_hooks";

const errorMessageText = (name) => {
  return `Beklager – vi kunne ikke hente alle sykepengesøknadene til ${name}`;
};

const SykepengesoknaderSide = () => {
  const dispatch = useDispatch();

  const fnr = useValgtPersonident();

  const soknaderState = useSoknaderState();

  const harForsoktHentetAlt = harForsoktHentetSoknader(soknaderState);
  const hentingFeiletSoknader = soknaderState.hentingFeilet;

  const brukernavn = useNavBrukerData().navn;
  const soknader = soknaderState.data;

  useEffect(() => {
    dispatch(hentSoknader(fnr));
  }, []);

  const brodsmuler = [
    {
      tittel: "Ditt sykefravær",
    },
    {
      tittel: "Søknader om sykepenger",
    },
  ];
  return (
    <Side
      fnr={fnr}
      tittel="Sykepengesøknader"
      aktivtMenypunkt={SYKEPENGESOKNADER}
    >
      <SideLaster
        henter={!harForsoktHentetAlt}
        hentingFeilet={hentingFeiletSoknader}
      >
        <div>
          <Feilstripe
            className="blokk--s"
            tekst={errorMessageText(brukernavn)}
            vis={hentingFeiletSoknader}
          />
          <Speilingvarsel brukernavn={brukernavn} />
          <div className="speiling">
            <Brodsmuler brodsmuler={brodsmuler} />
            <Soknader fnr={fnr} soknader={soknader} />
          </div>
        </div>
      </SideLaster>
    </Side>
  );
};

export default SykepengesoknaderSide;
