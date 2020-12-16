import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import Side from "../sider/Side";
import { hentSykmeldinger } from "../data/sykmelding/sykmeldinger_actions";
import SidetoppSpeilet from "../components/SidetoppSpeilet";
import Feilmelding from "../components/Feilmelding";
import AppSpinner from "../components/AppSpinner";
import DineSykmeldinger from "../components/speiling/sykmeldinger/sykmeldinger/DineSykmeldinger";
import Brodsmuler from "../components/speiling/Brodsmuler";
import { SYKMELDINGER } from "../enums/menypunkter";
import Speilingvarsel from "../components/speiling/Speilingvarsel";
import { hentBegrunnelseTekst } from "../utils/tilgangUtils";
import { harForsoktHentetSykmeldinger } from "../utils/reducerUtils";
import Pengestopp from "../components/pengestopp/Pengestopp";

const texts = {
  introduksjonstekst:
    "NAV mottar alle sykmeldinger. Ser du den ikke her? Det betyr at den som har sykmeldt deg ikke sender den digitalt til NAV. Da bruker du papirsykmeldingen i stedet.",
  feilmelding: "Du har ikke tilgang til denne tjenesten",
};

const SykmeldingerSide = () => {
  const fnr = window.location.pathname.split("/")[2];

  const ledeteksterState = useSelector((state: any) => state.ledetekster);
  const navbrukerState = useSelector((state: any) => state.navbruker);
  const sykmeldingerState = useSelector((state: any) => state.sykmeldinger);
  const tilgangState = useSelector((state: any) => state.tilgang);

  const brukernavn = navbrukerState.data.navn;
  const ledetekster = ledeteksterState.data;
  const sykmeldinger = sykmeldingerState.data;
  const sortering = sykmeldingerState.sortering;
  const tilgang = tilgangState.data;

  const harForsoektHentetAlt = harForsoktHentetSykmeldinger(sykmeldingerState);
  const henter =
    !harForsoektHentetAlt || ledeteksterState.henter || tilgangState.henter;
  const hentingFeilet =
    sykmeldingerState.hentingFeilet ||
    ledeteksterState.hentingFeilet ||
    tilgangState.hentingFeilet;

  const dispatch = useDispatch();
  useEffect(() => {
    dispatch(hentSykmeldinger(fnr));
  }, []);

  const htmlIntro = {
    __html: `<p>${texts.introduksjonstekst}</p>`,
  };
  const brodsmuler = [
    {
      tittel: "Ditt sykefravær",
    },
    {
      tittel: "Dine sykmeldinger",
    },
  ];

  return (
    <Side fnr={fnr} tittel="Sykmeldinger" aktivtMenypunkt={SYKMELDINGER}>
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
        if (hentingFeilet) {
          return <Feilmelding />;
        }
        return (
          <div>
            <Pengestopp sykmeldinger={sykmeldinger} />
            <Speilingvarsel brukernavn={brukernavn} />
            <div className="speiling">
              <Brodsmuler brodsmuler={brodsmuler} />
              <SidetoppSpeilet
                tittel="Dine sykmeldinger"
                htmlTekst={htmlIntro}
              />
              <DineSykmeldinger
                ledetekster={ledetekster}
                fnr={fnr}
                sykmeldinger={sykmeldinger}
                sortering={sortering}
              />
            </div>
          </div>
        );
      })()}
    </Side>
  );
};

export default SykmeldingerSide;
