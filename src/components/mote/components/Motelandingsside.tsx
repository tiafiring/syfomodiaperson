import React, { useEffect } from "react";
import Sidetopp from "../../Sidetopp";
import { useDispatch } from "react-redux";
import { hentMoter } from "../../../data/mote/moter_actions";
import { useAppSelector } from "../../../hooks/hooks";
import { DialogmotePanel } from "./DialogmotePanel";
import { UtropstegnImage } from "../../../../img/ImageComponents";
import MotebehovKvittering from "../../motebehov/MotebehovKvittering";
import BehandleMotebehovKnapp from "../../motebehov/BehandleMotebehovKnapp";
import UtdragFraSykefravaeret from "../../utdragFraSykefravaeret/UtdragFraSykefravaeret";
import { InnkallingDialogmotePanel } from "./innkalling/InnkallingDialogmotePanel";
import { erLokal } from "../../../utils/miljoUtil";
import PrediksjonVisning from "../../Prediksjon/PrediksjonVisning";
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

interface Props {
  fnr: string;
}

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
    navbruker,
    veilederinfo,
    tilgang,
    oppfolgingstilfelleperioder,
  } = useAppSelector((state) => state);

  useEffect(() => {
    dispatch(hentLedere(fnr));
    dispatch(hentMoter(fnr));
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
    !tilgang.henter;

  return (
    <SideLaster
      henter={!harForsoktHentetAlt}
      hentingFeilet={motebehov.hentingFeilet || tilgang.hentingFeilet}
      tilgang={findRelevantTilgang()}
    >
      <Sidetopp tittel="Dialogmøter" />

      <DialogmotePanel ikon={UtropstegnImage} overskrift="Ønsker om dialogmøte">
        <MotebehovKvittering
          motebehovData={motebehov.data}
          ledereData={ledere.data}
          oppfolgingstilfelleperioder={oppfolgingstilfelleperioder}
          sykmeldt={navbruker.data}
        />

        <BehandleMotebehovKnapp
          fnr={fnr}
          motebehovData={motebehov.data}
          veilederinfo={veilederinfo.data}
        />
      </DialogmotePanel>

      <InnkallingDialogmotePanel fnr={fnr} />

      {erLokal() ? <PrediksjonVisning fnr={fnr} /> : <></>}

      <UtdragFraSykefravaeret
        aktiveDialoger={aktiveDialoger}
        fnr={fnr}
        oppfolgingstilfelleperioder={oppfolgingstilfelleperioder}
        sykmeldinger={sykmeldinger.data}
      />
    </SideLaster>
  );
};

export default Motelandingsside;
