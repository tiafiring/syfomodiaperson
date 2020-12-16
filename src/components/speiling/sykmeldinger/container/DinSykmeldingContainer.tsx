import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { hentSykmeldinger } from "../../../../data/sykmelding/sykmeldinger_actions";
import {
  SykmeldingOldFormat,
  SykmeldingStatus,
} from "../../../../data/sykmelding/types/SykmeldingOldFormat";
import Side from "../../../../sider/Side";
import SidetoppSpeilet from "../../../SidetoppSpeilet";
import SykmeldingSide from "../sykmelding/SykmeldingSide";
import Feilmelding from "../../../Feilmelding";
import AppSpinner from "../../../AppSpinner";
import Brodsmuler from "../../Brodsmuler";
import Speilingvarsel from "../../Speilingvarsel";
import { SYKMELDINGER } from "../../../../enums/menypunkter";
import { ARBEIDSTAKER } from "../../../../enums/arbeidssituasjoner";
import { hentBegrunnelseTekst } from "../../../../utils/tilgangUtils";
import { harForsoktHentetSykmeldinger } from "../../../../utils/reducerUtils";

const texts = {
  pageTitleSykmelding: "Sykmelding",
  pageTitleEgenmelding: "Egenmelding",
  feilmelding: "Du har ikke tilgang til denne tjenesten",
};

const pageTitle = (dinSykmelding?: SykmeldingOldFormat) => {
  return dinSykmelding?.egenmeldt
    ? texts.pageTitleEgenmelding
    : texts.pageTitleSykmelding;
};

export function getSykmelding(
  sykmeldinger: SykmeldingOldFormat[],
  sykmeldingId: string
) {
  return sykmeldinger.find((sykmld) => {
    return `${sykmld.id}` === `${sykmeldingId}`;
  });
}

const DinSykmeldingSide = () => {
  const fnr = window.location.pathname.split("/")[2];
  const sykmeldingId = window.location.pathname.split("/")[4];

  const ledeteksterState = useSelector((state: any) => state.ledetekster);
  const navbrukerState = useSelector((state: any) => state.navbruker);
  const sykmeldingerState = useSelector((state: any) => state.sykmeldinger);
  const tilgangState = useSelector((state: any) => state.tilgang);

  const harForsoktHentetAlt = harForsoktHentetSykmeldinger(sykmeldingerState);
  const henter = !harForsoktHentetAlt || ledeteksterState.henter;
  const hentingFeilet =
    sykmeldingerState.hentingFeilet || tilgangState.hentingFeilet;
  const dinSykmelding = getSykmelding(sykmeldingerState.data, sykmeldingId);
  let arbeidsgiversSykmelding = {} as SykmeldingOldFormat | undefined;

  if (
    dinSykmelding &&
    (dinSykmelding.status === SykmeldingStatus.SENDT ||
      (dinSykmelding.status === SykmeldingStatus.BEKREFTET &&
        dinSykmelding.valgtArbeidssituasjon === ARBEIDSTAKER))
  ) {
    arbeidsgiversSykmelding = getSykmelding(
      sykmeldingerState.arbeidsgiverssykmeldinger,
      sykmeldingId
    );
  }

  const brukernavn = navbrukerState.data.navn;
  const tilgang = tilgangState.data;
  const ledetekster = ledeteksterState.data;

  const dispatch = useDispatch();
  useEffect(() => {
    dispatch(hentSykmeldinger(fnr));
  }, []);

  const brodsmuler = [
    {
      tittel: "Ditt sykefravær",
    },
    {
      tittel: "Dine sykmeldinger",
    },
    {
      tittel: "Sykmelding",
    },
  ];

  return (
    <Side fnr={fnr} tittel="Sykmeldinger" aktivtMenypunkt={SYKMELDINGER}>
      {(() => {
        if (henter) {
          return <AppSpinner />;
        }
        if (hentingFeilet) {
          return <Feilmelding />;
        }
        if (!tilgang.harTilgang) {
          return (
            <Feilmelding
              tittel={texts.feilmelding}
              melding={hentBegrunnelseTekst(tilgang.begrunnelse)}
            />
          );
        }

        return (
          <div>
            <Speilingvarsel brukernavn={brukernavn} />
            <div className="speiling">
              <Brodsmuler brodsmuler={brodsmuler} />
              <SidetoppSpeilet tittel={pageTitle(dinSykmelding)} />
              <SykmeldingSide
                dinSykmelding={dinSykmelding}
                ledetekster={ledetekster}
                arbeidsgiversSykmelding={arbeidsgiversSykmelding}
                fnr={fnr}
              />
            </div>
          </div>
        );
      })()}
    </Side>
  );
};

export default DinSykmeldingSide;
