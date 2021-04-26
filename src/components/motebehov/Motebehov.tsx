import React, { useEffect } from "react";
import { useDispatch } from "react-redux";
import { Leder } from "../../data/leder/ledere";
import { VeilederinfoDTO } from "../../data/veilederinfo/types/VeilederinfoDTO";
import { erLokal } from "../../utils/miljoUtil";
import { hentVirksomhet } from "../../data/virksomhet/virksomhet_actions";
import { OppfolgingsplanDTO } from "../../data/oppfolgingsplan/oppfoelgingsdialoger";
import BehandleMotebehovKnapp from "./BehandleMotebehovKnapp";
import MotebehovKvittering from "./MotebehovKvittering";
import PrediksjonVisning from "../Prediksjon/PrediksjonVisning";
import UtdragFraSykefravaeret from "../utdragFraSykefravaeret/UtdragFraSykefravaeret";
import Panel from "nav-frontend-paneler";
import { Systemtittel } from "nav-frontend-typografi";
import { OppfolgingstilfelleperioderMapState } from "../../data/oppfolgingstilfelle/oppfolgingstilfelleperioder";
import { MotebehovDTO } from "../../data/motebehov/types/motebehovTypes";
import { Brukerinfo } from "../../data/navbruker/types/Brukerinfo";
import { SykmeldingOldFormat } from "../../data/sykmelding/types/SykmeldingOldFormat";

const texts = {
  title: "Innmeldt behov for dialogmøte",
};

interface MotebehovProps {
  aktiveDialoger: OppfolgingsplanDTO[];
  fnr: string;
  ledereData: Leder[];
  ledereUtenInnsendtMotebehov: Leder[];
  motebehovListe: MotebehovDTO[];
  sykmeldt?: Brukerinfo;
  motebehovListeMedJaSvarTilOppgavebehandling: MotebehovDTO[];
  veilederinfo?: VeilederinfoDTO;
  oppfolgingstilfelleperioder: OppfolgingstilfelleperioderMapState;
  sykmeldinger: SykmeldingOldFormat[];
}

const Motebehov = ({
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
}: MotebehovProps) => {
  const dispatch = useDispatch();

  useEffect(() => {
    aktiveDialoger.forEach((plan) => {
      if (!plan.virksomhet.navn) {
        dispatch(hentVirksomhet(plan.virksomhet.virksomhetsnummer));
      }
    });
  }, []);

  return (
    <>
      <Panel className="blokk">
        <Systemtittel>{texts.title}</Systemtittel>
        <MotebehovKvittering
          ledereData={ledereData}
          ledereUtenInnsendtMotebehov={ledereUtenInnsendtMotebehov}
          motebehovListe={motebehovListe}
          sykmeldt={sykmeldt}
        />
        {veilederinfo &&
          motebehovListeMedJaSvarTilOppgavebehandling.length > 0 && (
            <BehandleMotebehovKnapp
              fnr={fnr}
              motebehovListe={motebehovListeMedJaSvarTilOppgavebehandling}
              veilederinfo={veilederinfo}
            />
          )}
      </Panel>

      {erLokal() && <PrediksjonVisning fnr={fnr} />}

      <UtdragFraSykefravaeret
        aktiveDialoger={aktiveDialoger}
        fnr={fnr}
        oppfolgingstilfelleperioder={oppfolgingstilfelleperioder}
        sykmeldinger={sykmeldinger}
      />
    </>
  );
};

export default Motebehov;
