import React, { useState } from "react";
import { useDispatch } from "react-redux";
import Knapp from "nav-frontend-knapper";
import { behandlePersonOppgave } from "../../../data/personoppgave/personoppgave_actions";
import { OppfolgingsplanLPS } from "../../../data/oppfolgingsplan/types/OppfolgingsplanLPS";

interface BehandleOppfolgingsplanLPSProps {
  oppfolgingsplanLPS: OppfolgingsplanLPS;
  veilederIdent: any;
}

const BehandleOppfolgingsplanLPS = (
  behandleOppfolgingsplanLPSProps: BehandleOppfolgingsplanLPSProps
) => {
  const { oppfolgingsplanLPS, veilederIdent } = behandleOppfolgingsplanLPSProps;
  const dispatch = useDispatch();
  const opLPSPersonOppgave = oppfolgingsplanLPS.personoppgave;
  const [spinner, setSpinner] = useState(false);

  const markerSomBehandlet = () => {
    setSpinner(true);
    dispatch(
      behandlePersonOppgave(
        opLPSPersonOppgave.uuid,
        oppfolgingsplanLPS.uuid,
        veilederIdent
      )
    );
  };

  return (
    <Knapp
      onClick={markerSomBehandlet}
      spinner={spinner}
      id="behandle_personoppgave"
      mini
    >
      Marker som behandlet
    </Knapp>
  );
};

export default BehandleOppfolgingsplanLPS;
