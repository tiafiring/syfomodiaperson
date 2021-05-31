import React, { useEffect } from "react";
import Sidetopp from "../../Sidetopp";
import { useDispatch } from "react-redux";
import { hentMoter } from "../../../data/mote/moter_actions";
import { useAppSelector } from "../../../hooks/hooks";
import UtdragFraSykefravaeretPanel from "../../utdragFraSykefravaeret/UtdragFraSykefravaeret";
import { InnkallingDialogmotePanel } from "./innkalling/InnkallingDialogmotePanel";
import { erLokal } from "../../../utils/miljoUtil";
import PrediksjonVisningPanel from "../../Prediksjon/PrediksjonVisning";
import SideLaster from "../../SideLaster";
import { hentLedere } from "../../../data/leder/ledere_actions";
import { hentMotebehov } from "../../../data/motebehov/motebehov_actions";
import { hentSykmeldinger } from "../../../data/sykmelding/sykmeldinger_actions";
import { hentOppfoelgingsdialoger } from "../../../data/oppfolgingsplan/oppfoelgingsdialoger_actions";
import { hentOppfolgingstilfelleperioder } from "../../../data/oppfolgingstilfelle/oppfolgingstilfelleperioder_actions";
import { hentVirksomhet } from "../../../data/virksomhet/virksomhet_actions";
import {
  harForsoktHentetLedere,
  harForsoktHentetMotebehov,
} from "../../../utils/reducerUtils";
import { useOppfoelgingsDialoger } from "../../../hooks/useOppfoelgingsDialoger";
import { Tilgang } from "../../../data/tilgang/tilgang";
import { DialogmoteOnskePanel } from "../../motebehov/DialogmoteOnskePanel";
import { fetchDialogmote } from "../../../data/dialogmote/dialogmote_actions";
import { MotehistorikkPanel } from "../../dialogmote/motehistorikk/MotehistorikkPanel";

interface Props {
  fnr: string;
}

const texts = {
  dialogmoter: "Dialogmøter",
};

export const Motelandingsside = ({ fnr }: Props) => {
  const dispatch = useDispatch();

  const {
    aktiveDialoger,
    harForsoktHentetOppfoelgingsdialoger,
  } = useOppfoelgingsDialoger();

  const {
    ledere,
    sykmeldinger,
    moter,
    motebehov,
    dialogmote,
    navbruker,
    veilederinfo,
    tilgang,
    oppfolgingstilfelleperioder,
  } = useAppSelector((state) => state);

  useEffect(() => {
    dispatch(hentLedere(fnr));
    dispatch(hentMoter(fnr));
    dispatch(fetchDialogmote(fnr));
    dispatch(hentMotebehov(fnr));
    dispatch(hentSykmeldinger(fnr));
    dispatch(hentOppfoelgingsdialoger(fnr));
  }, [fnr]);

  useEffect(() => {
    dispatch(hentOppfolgingstilfelleperioder(fnr));
  }, [ledere, sykmeldinger]);

  useEffect(() => {
    aktiveDialoger?.forEach((plan) => {
      if (!plan.virksomhet.navn) {
        dispatch(hentVirksomhet(plan.virksomhet.virksomhetsnummer));
      }
    });
  }, []);

  const findRelevantTilgang = (): Tilgang => {
    if (motebehov.tilgang?.harTilgang === false) return motebehov.tilgang;

    return tilgang.data;
  };

  const harForsoktHentetAlt =
    harForsoktHentetMotebehov(motebehov) &&
    harForsoktHentetOppfoelgingsdialoger &&
    harForsoktHentetLedere(ledere) &&
    !moter.henter &&
    !dialogmote.henterMote &&
    !tilgang.henter;

  return (
    <SideLaster
      henter={!harForsoktHentetAlt}
      hentingFeilet={
        motebehov.hentingFeilet ||
        dialogmote.henterMoteFeilet ||
        tilgang.hentingFeilet
      }
      tilgang={findRelevantTilgang()}
    >
      <Sidetopp tittel={texts.dialogmoter} />

      <DialogmoteOnskePanel
        motebehovData={motebehov.data}
        ledereData={ledere.data}
        oppfolgingstilfelleperioder={oppfolgingstilfelleperioder}
        sykmeldt={navbruker.data}
        veilederinfo={veilederinfo.data}
      />

      <InnkallingDialogmotePanel />

      {erLokal() ? <PrediksjonVisningPanel fnr={fnr} /> : <></>}

      <UtdragFraSykefravaeretPanel
        aktiveDialoger={aktiveDialoger}
        fnr={fnr}
        oppfolgingstilfelleperioder={oppfolgingstilfelleperioder}
        sykmeldinger={sykmeldinger.data}
      />

      <MotehistorikkPanel />
    </SideLaster>
  );
};

export default Motelandingsside;
