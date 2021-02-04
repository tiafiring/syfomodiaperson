import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { OppfolgingsplanerState } from "../../../data/oppfolgingsplan/oppfoelgingsdialoger";
import { MOETEPLANLEGGER } from "../../../enums/menypunkter";
import { hentBegrunnelseTekst } from "../../../utils/tilgangUtils";
import {
  sorterMotebehovDataEtterDato,
  motebehovlisteMedKunJaSvar,
  motebehovFromLatestActiveTilfelle,
} from "../../../utils/motebehovUtils";
import {
  harForsoktHentetLedere,
  harForsoktHentetMotebehov,
  harForsoktHentetOppfoelgingsdialoger,
} from "../../../utils/reducerUtils";
import { ledereUtenMotebehovsvar } from "../../../utils/ledereUtils";
import { hentLedere } from "../../../data/leder/ledere_actions";
import { hentMotebehov } from "../../../data/motebehov/motebehov_actions";
import { hentOppfoelgingsdialoger } from "../../../data/oppfolgingsplan/oppfoelgingsdialoger_actions";
import { hentOppfolgingstilfelleperioder } from "../../../data/oppfolgingstilfelle/oppfolgingstilfelleperioder_actions";
import { hentSykmeldinger } from "../../../data/sykmelding/sykmeldinger_actions";
import Side from "../../../sider/Side";
import Feilmelding from "../../Feilmelding";
import AppSpinner from "../../AppSpinner";
import Motebehov from "../Motebehov";

const texts = {
  feilmelding: "Du har ikke tilgang til denne tjenesten",
};

const MotebehovSide = () => {
  const fnr = window.location.pathname.split("/")[2];

  const oppfolgingsplanerState: OppfolgingsplanerState = useSelector(
    (state: any) => state.oppfoelgingsdialoger
  );
  const aktiveDialoger = oppfolgingsplanerState.data.filter((dialog) => {
    return (
      dialog.status !== "AVBRUTT" &&
      new Date(dialog.godkjentPlan.gyldighetstidspunkt.tom) > new Date()
    );
  });

  const ledereState = useSelector((state: any) => state.ledere);
  const ledereData = ledereState.data;

  const sykmeldingerState = useSelector((state: any) => state.sykmeldinger);
  const sykmeldinger = sykmeldingerState.data;

  const motebehovState = useSelector((state: any) => state.motebehov);
  const motebehovTilgang = motebehovState.tilgang;
  const motebehovData = motebehovState.data;
  const sortertMotebehovListe = motebehovData.sort(
    sorterMotebehovDataEtterDato
  );

  const motebehovListeMedJaSvarTilOppgavebehandling = motebehovlisteMedKunJaSvar(
    motebehovData
  );

  const navbrukerState = useSelector((state: any) => state.navbruker);
  const sykmeldt = navbrukerState.data;

  const tilgangState = useSelector((state: any) => state.tilgang);
  const tilgang = tilgangState.data;

  const veilederinfoState = useSelector((state: any) => state.veilederinfo);
  const veilederinfo = veilederinfoState.data;

  const oppfolgingstilfelleperioder = useSelector(
    (state: any) => state.oppfolgingstilfelleperioder
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
    harForsoktHentetOppfoelgingsdialoger(oppfolgingsplanerState) &&
    harForsoktHentetLedere(ledereState);

  const henter = !harForsoktHentetAlt;
  const hentingFeilet = motebehovState.hentingFeilet;

  return (
    <Side fnr={fnr} tittel="Møtebehov" aktivtMenypunkt={MOETEPLANLEGGER}>
      {(() => {
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
        if (motebehovTilgang.harTilgang === false) {
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
        );
      })()}
    </Side>
  );
};

export default MotebehovSide;
