import React, { useEffect } from "react";
import { useDispatch } from "react-redux";
import Side from "../../../../sider/Side";
import { hentSykmeldinger } from "../../../../data/sykmelding/sykmeldinger_actions";
import SidetoppSpeilet from "../../../SidetoppSpeilet";
import DineSykmeldinger from "../sykmeldinger/DineSykmeldinger";
import Brodsmuler from "../../Brodsmuler";
import { SYKMELDINGER } from "../../../../enums/menypunkter";
import Speilingvarsel from "../../Speilingvarsel";
import { harForsoktHentetSykmeldinger } from "../../../../utils/reducerUtils";
import Pengestopp from "../../../pengestopp/Pengestopp";
import { useValgtPersonident } from "../../../../hooks/useValgtBruker";
import SideLaster from "../../../SideLaster";
import { useNavBrukerData } from "../../../../data/navbruker/navbruker_hooks";
import { useAppSelector } from "../../../../hooks/hooks";

const texts = {
  introduksjonstekst:
    "NAV mottar alle sykmeldinger. Ser du den ikke her? Det betyr at den som har sykmeldt deg ikke sender den digitalt til NAV. Da bruker du papirsykmeldingen i stedet.",
};

const SykmeldingerSide = () => {
  const fnr = useValgtPersonident();

  const sykmeldingerState = useAppSelector((state) => state.sykmeldinger);
  const { navn: brukernavn } = useNavBrukerData();
  const sykmeldinger = sykmeldingerState.data;

  const harForsoektHentetAlt = harForsoktHentetSykmeldinger(sykmeldingerState);
  const henter = !harForsoektHentetAlt;
  const hentingFeilet = sykmeldingerState.hentingFeilet;

  const dispatch = useDispatch();
  useEffect(() => {
    dispatch(hentSykmeldinger(fnr));
  }, [dispatch, fnr]);

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
      <SideLaster henter={henter} hentingFeilet={hentingFeilet}>
        <div>
          <Pengestopp sykmeldinger={sykmeldinger} />
          <Speilingvarsel brukernavn={brukernavn} />
          <div className="speiling">
            <Brodsmuler brodsmuler={brodsmuler} />
            <SidetoppSpeilet tittel="Dine sykmeldinger" htmlTekst={htmlIntro} />
            <DineSykmeldinger fnr={fnr} sykmeldinger={sykmeldinger} />
          </div>
        </div>
      </SideLaster>
    </Side>
  );
};

export default SykmeldingerSide;
