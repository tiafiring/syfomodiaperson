import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { hentOppfoelgingsdialoger } from "../../../data/oppfolgingsplan/oppfoelgingsdialoger_actions";
import { hentOppfolgingstilfellerPersonUtenArbeidsiver } from "../../../data/oppfolgingstilfelle/oppfolgingstilfellerperson_actions";
import { hentOppfolgingstilfelleperioder } from "../../../data/oppfolgingstilfelle/oppfolgingstilfelleperioder_actions";
import { hentSykmeldinger } from "../../../data/sykmelding/sykmeldinger_actions";
import { hentLedere } from "../../../data/leder/ledere_actions";
import { NOKKELINFORMASJON } from "../../../enums/menypunkter";
import { hentBegrunnelseTekst } from "../../../utils/tilgangUtils";
import { harForsoktHentetLedere } from "../../../utils/reducerUtils";
import Side from "../../../sider/Side";
import Feilmelding from "../../Feilmelding";
import AppSpinner from "../../AppSpinner";
import Nokkelinformasjon from "../Nokkelinformasjon";
import { useOppfoelgingsDialoger } from "../../../hooks/useOppfoelgingsDialoger";
import { useTilgang } from "../../../hooks/useTilgang";

const texts = {
  feilmelding: "Du har ikke tilgang til denne tjenesten",
};

export const NokkelinformasjonSide = () => {
  const fnr = window.location.pathname.split("/")[2];

  const {
    aktiveDialoger,
    harForsoktHentetOppfoelgingsdialoger,
  } = useOppfoelgingsDialoger();

  const oppfolgingstilfelleperioder = useSelector(
    (state: any) => state.oppfolgingstilfelleperioder
  );

  const oppfolgingstilfelleUtenArbeidsgiverState = useSelector(
    (state: any) => state.oppfolgingstilfellerperson
  );
  const oppfolgingstilfelleUtenArbeidsgiver =
    oppfolgingstilfelleUtenArbeidsgiverState.data[0] || {};

  const ledereState = useSelector((state: any) => state.ledere);
  const sykmeldingerState = useSelector((state: any) => state.sykmeldinger);
  const { tilgang } = useTilgang();

  const harForsoktHentetAlt =
    harForsoktHentetOppfoelgingsdialoger && harForsoktHentetLedere(ledereState);

  const henter = !harForsoktHentetAlt;
  const hentingFeilet = sykmeldingerState.hentingFeilet;
  const sykmeldinger = sykmeldingerState.data;

  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(hentLedere(fnr));
    dispatch(hentSykmeldinger(fnr));
    if (fnr) {
      dispatch(hentOppfoelgingsdialoger(fnr));
    }
  }, []);

  useEffect(() => {
    dispatch(hentOppfolgingstilfellerPersonUtenArbeidsiver(fnr));
  }, [sykmeldingerState]);

  useEffect(() => {
    dispatch(hentOppfolgingstilfelleperioder(fnr));
  }, [ledereState, sykmeldingerState]);

  return (
    <Side fnr={fnr} tittel="Møtebehov" aktivtMenypunkt={NOKKELINFORMASJON}>
      {(() => {
        if (henter) {
          return <AppSpinner />;
        } else if (!tilgang.harTilgang) {
          return (
            <Feilmelding
              tittel={texts.feilmelding}
              melding={hentBegrunnelseTekst(tilgang.begrunnelse)}
            />
          );
        } else if (hentingFeilet) {
          return <Feilmelding />;
        }
        return (
          <Nokkelinformasjon
            fnr={fnr}
            aktiveDialoger={aktiveDialoger}
            oppfolgingstilfelleUtenArbeidsgiver={
              oppfolgingstilfelleUtenArbeidsgiver
            }
            oppfolgingstilfelleperioder={oppfolgingstilfelleperioder}
            sykmeldinger={sykmeldinger}
          />
        );
      })()}
    </Side>
  );
};

export default NokkelinformasjonSide;
