import React, { useEffect } from "react";
import { useDispatch } from "react-redux";
import { erLokal } from "../../utils/miljoUtil";
import { hentVirksomhet } from "../../data/virksomhet/virksomhet_actions";
import BehandleMotebehovKnapp from "./BehandleMotebehovKnapp";
import MotebehovKvittering from "./MotebehovKvittering";
import PrediksjonVisning from "../Prediksjon/PrediksjonVisning";
import Sidetopp from "../Sidetopp";
import UtdragFraSykefravaeret from "./UtdragFraSykefravaeret";

interface MotebehovProps {
  aktiveDialoger: any[];
  fnr: string;
  ledereData: any[];
  ledereUtenInnsendtMotebehov: any[];
  motebehovListe: any[];
  sykmeldt: any;
  motebehovListeMedJaSvarTilOppgavebehandling: any[];
  veilederinfo: any;
  oppfolgingstilfelleperioder: any[];
  sykmeldinger: any[];
}

const Motebehov = (motebehovProps: MotebehovProps) => {
  const {
    aktiveDialoger,
    fnr,
    ledereData,
    ledereUtenInnsendtMotebehov,
    motebehovListe,
    sykmeldt,
    motebehovListeMedJaSvarTilOppgavebehandling,
    veilederinfo,
    oppfolgingstilfelleperioder,
    sykmeldinger,
  } = motebehovProps;

  const dispatch = useDispatch();

  useEffect(() => {
    aktiveDialoger.forEach((plan) => {
      if (!plan.virksomhet.navn) {
        dispatch(hentVirksomhet(plan.virksomhet.virksomhetsnummer));
      }
    });
  }, []);

  return (
    <div className="motebehovSide">
      <Sidetopp tittel={"Behov for dialogmøte"} />
      {motebehovListeMedJaSvarTilOppgavebehandling.length > 0 && (
        <BehandleMotebehovKnapp
          fnr={fnr}
          motebehovListe={motebehovListeMedJaSvarTilOppgavebehandling}
          veilederinfo={veilederinfo}
        />
      )}
      <MotebehovKvittering
        ledereData={ledereData}
        ledereUtenInnsendtMotebehov={ledereUtenInnsendtMotebehov}
        motebehovListe={motebehovListe}
        sykmeldt={sykmeldt}
      />

      {erLokal() && <PrediksjonVisning fnr={fnr} />}

      <UtdragFraSykefravaeret
        aktiveDialoger={aktiveDialoger}
        fnr={fnr}
        oppfolgingstilfelleperioder={oppfolgingstilfelleperioder}
        sykmeldinger={sykmeldinger}
      />
      {motebehovListeMedJaSvarTilOppgavebehandling.length > 0 && (
        <BehandleMotebehovKnapp
          fnr={fnr}
          motebehovListe={motebehovListeMedJaSvarTilOppgavebehandling}
          veilederinfo={veilederinfo}
        />
      )}
    </div>
  );
};

export default Motebehov;
