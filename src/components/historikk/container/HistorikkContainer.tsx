import React, { ReactElement, useEffect, useMemo } from "react";
import { useDispatch } from "react-redux";
import Side from "../../../sider/Side";
import Historikk from "../Historikk";
import { HISTORIKK } from "../../../enums/menypunkter";
import SideLaster from "../../SideLaster";
import { useAppSelector } from "../../../hooks/hooks";
import { useTilgang } from "../../../hooks/useTilgang";
import { useLedere } from "../../../hooks/useLedere";
import { useValgtPersonident } from "../../../hooks/useValgtBruker";
import { hentHistorikk } from "../../../data/historikk/historikk_actions";
import { hentLedere } from "../../../data/leder/ledere_actions";
import { hentOppfolgingstilfelleperioder } from "../../../data/oppfolgingstilfelle/oppfolgingstilfelleperioder_actions";

const texts = {
  pageTitle: "Historikk",
  errorTitle: "Du har ikke tilgang til denne tjenesten",
};

export const HistorikkContainer = (): ReactElement => {
  const fnr = useValgtPersonident();
  const dispatch = useDispatch();
  const historikkState = useAppSelector((state) => state.historikk);
  const oppfolgingstilfelleperioder = useAppSelector(
    (state) => state.oppfolgingstilfelleperioder
  );

  const { henterTilgang, hentingTilgangFeilet } = useTilgang();
  const {
    henterLedere,
    hentingLedereFeilet,
    currentLedere,
    formerLedere,
  } = useLedere();
  const henterTilfeller = Object.keys(oppfolgingstilfelleperioder).some(
    (orgnummer) => oppfolgingstilfelleperioder[orgnummer].henter
  );
  const henter = henterTilgang || henterLedere || henterTilfeller;
  const hentingFeilet = hentingTilgangFeilet || hentingLedereFeilet;

  const allLedere = useMemo(() => [...currentLedere, ...formerLedere], [
    currentLedere,
    formerLedere,
  ]);

  useEffect(() => {
    if (!historikkState.henterMoter && !historikkState.hentetMoter) {
      dispatch(hentHistorikk(fnr, "MOTER"));
    }
  }, [dispatch, fnr, historikkState.henterMoter, historikkState.hentetMoter]);

  useEffect(() => {
    if (!historikkState.henterMotebehov && !historikkState.hentetMotebehov) {
      dispatch(hentHistorikk(fnr, "MOTEBEHOV"));
    }
  }, [
    dispatch,
    fnr,
    historikkState.henterMotebehov,
    historikkState.hentetMotebehov,
  ]);

  useEffect(() => {
    if (
      !historikkState.henterOppfoelgingsdialoger &&
      !historikkState.hentetOppfoelgingsdialoger
    ) {
      dispatch(hentHistorikk(fnr, "OPPFOELGINGSDIALOG"));
    }
  }, [
    dispatch,
    fnr,
    historikkState.henterOppfoelgingsdialoger,
    historikkState.hentetOppfoelgingsdialoger,
  ]);

  useEffect(() => {
    dispatch(hentLedere(fnr));
  }, [dispatch, fnr]);

  useEffect(() => {
    if (allLedere && allLedere.length > 0) {
      dispatch(hentOppfolgingstilfelleperioder(fnr));
    }
  }, [dispatch, fnr, allLedere]);

  return (
    <Side fnr={fnr} tittel={texts.pageTitle} aktivtMenypunkt={HISTORIKK}>
      <SideLaster henter={henter} hentingFeilet={hentingFeilet}>
        <Historikk
          oppfolgingstilfelleperioder={oppfolgingstilfelleperioder}
          historikk={historikkState}
          ledere={allLedere}
        />
      </SideLaster>
    </Side>
  );
};

export default HistorikkContainer;
