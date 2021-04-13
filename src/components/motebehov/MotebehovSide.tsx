import React, { useEffect } from "react";
import { useDispatch } from "react-redux";
import { hentBegrunnelseTekst } from "../../utils/tilgangUtils";
import {
  sorterMotebehovDataEtterDato,
  motebehovlisteMedKunJaSvar,
  motebehovFromLatestActiveTilfelle,
} from "../../utils/motebehovUtils";
import {
  harForsoktHentetLedere,
  harForsoktHentetMotebehov,
} from "../../utils/reducerUtils";
import { ledereUtenMotebehovsvar } from "../../utils/ledereUtils";
import { hentLedere } from "../../data/leder/ledere_actions";
import { hentMotebehov } from "../../data/motebehov/motebehov_actions";
import { hentOppfoelgingsdialoger } from "../../data/oppfolgingsplan/oppfoelgingsdialoger_actions";
import { hentOppfolgingstilfelleperioder } from "../../data/oppfolgingstilfelle/oppfolgingstilfelleperioder_actions";
import { hentSykmeldinger } from "../../data/sykmelding/sykmeldinger_actions";
import Feilmelding from "../Feilmelding";
import AppSpinner from "../AppSpinner";
import Motebehov from "./Motebehov";
import { useOppfoelgingsDialoger } from "../../hooks/useOppfoelgingsDialoger";
import { useAppSelector } from "../../hooks/hooks";

const texts = {
  feilmelding: "Du har ikke tilgang til denne tjenesten",
};

interface MotebehovSideProps {
  fnr: string;
}

const MotebehovSide = ({ fnr }: MotebehovSideProps) => {
  const {
    aktiveDialoger,
    harForsoktHentetOppfoelgingsdialoger,
  } = useOppfoelgingsDialoger();

  const ledereState = useAppSelector((state) => state.ledere);
  const ledereData = ledereState.data;

  const sykmeldingerState = useAppSelector((state) => state.sykmeldinger);
  const sykmeldinger = sykmeldingerState.data;

  const motebehovState = useAppSelector((state) => state.motebehov);
  const motebehovTilgang = motebehovState.tilgang;
  const motebehovData = motebehovState.data;
  const sortertMotebehovListe = motebehovData.sort(
    sorterMotebehovDataEtterDato
  );

  const motebehovListeMedJaSvarTilOppgavebehandling = motebehovlisteMedKunJaSvar(
    motebehovData
  );

  const navbrukerState = useAppSelector((state) => state.navbruker);
  const sykmeldt = navbrukerState.data;

  const tilgangState = useAppSelector((state) => state.tilgang);
  const tilgang = tilgangState.data;

  const veilederinfoState = useAppSelector((state) => state.veilederinfo);
  const veilederinfo = veilederinfoState.data;

  const oppfolgingstilfelleperioder = useAppSelector(
    (state) => state.oppfolgingstilfelleperioder
  );

  const activeMotebehovSvar = motebehovFromLatestActiveTilfelle(
    sortertMotebehovListe,
    oppfolgingstilfelleperioder
  );

  const ledereUtenInnsendtMotebehov = ledereUtenMotebehovsvar(
    ledereData,
    motebehovData,
    oppfolgingstilfelleperioder
  );

  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(hentLedere(fnr));
    dispatch(hentMotebehov(fnr));
    dispatch(hentSykmeldinger(fnr));
    if (fnr) {
      dispatch(hentOppfoelgingsdialoger(fnr));
    }
  }, []);

  useEffect(() => {
    dispatch(hentOppfolgingstilfelleperioder(fnr));
  }, [ledereState, sykmeldingerState]);

  const harForsoktHentetAlt =
    harForsoktHentetMotebehov(motebehovState) &&
    harForsoktHentetOppfoelgingsdialoger &&
    harForsoktHentetLedere(ledereState);

  const henter = !harForsoktHentetAlt;
  const hentingFeilet = motebehovState.hentingFeilet;

  if (henter) {
    return <AppSpinner />;
  }
  if (!tilgang.harTilgang) {
    return (
      <Feilmelding
        tittel={texts.feilmelding}
        melding={hentBegrunnelseTekst(tilgang.begrunnelse)}
      />
    );
  }
  if (motebehovTilgang?.harTilgang === false) {
    return (
      <Feilmelding
        tittel={texts.feilmelding}
        melding={hentBegrunnelseTekst(motebehovTilgang.begrunnelse)}
      />
    );
  }
  if (hentingFeilet) {
    return <Feilmelding />;
  }
  return (
    sykmeldt &&
    veilederinfo && (
      <Motebehov
        fnr={fnr}
        ledereData={ledereData}
        ledereUtenInnsendtMotebehov={ledereUtenInnsendtMotebehov}
        motebehovListe={activeMotebehovSvar}
        sykmeldt={sykmeldt}
        motebehovListeMedJaSvarTilOppgavebehandling={
          motebehovListeMedJaSvarTilOppgavebehandling
        }
        veilederinfo={veilederinfo}
        aktiveDialoger={aktiveDialoger}
        oppfolgingstilfelleperioder={oppfolgingstilfelleperioder}
        sykmeldinger={sykmeldinger}
      />
    )
  );
};

export default MotebehovSide;
