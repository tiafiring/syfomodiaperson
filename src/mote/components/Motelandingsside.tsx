import React from "react";
import { Link } from "react-router";
import { MoteDTO } from "../../data/mote/types/moteTypes";
import { tilDatoMedUkedagOgManedNavn } from "../../utils/datoUtils";
import Sidetopp from "../../components/Sidetopp";
import MotelandingssidePrikk from "./MotelandingssidePrikk";

const texts = {
  pageHeader: "Dialogmøter",
  moteElement: {
    titles: {
      confirmed: "Bekreftet møte",
      seeStatus: "Se møtestatus",
      requestMeeting: "Forespør møte",
    },
    subtitles: {
      dialogmote: "Dialogmøte",
      requestSent: "Møteforespørsel sendt",
      noMeetings: "Ingen møter planlagt",
    },
  },
  motebehovElement: {
    title: "BEHOV FOR DIALOGMØTE",
    subtitle: "Avklaring om møtebehov",
  },
};

const setTittel = (mote: MoteDTO) => {
  if (mote) {
    if (mote.status === "BEKREFTET") {
      return texts.moteElement.titles.confirmed;
    }
    return texts.moteElement.titles.seeStatus;
  }
  return texts.moteElement.titles.requestMeeting;
};

const setUndertittel = (mote: MoteDTO) => {
  if (mote) {
    if (mote.status === "BEKREFTET" && mote.bekreftetAlternativ) {
      return `${
        texts.moteElement.subtitles.dialogmote
      } ${tilDatoMedUkedagOgManedNavn(mote.bekreftetAlternativ.tid)}`;
    } else if (mote.opprettetTidspunkt) {
      return `${
        texts.moteElement.subtitles.requestSent
      } ${tilDatoMedUkedagOgManedNavn(mote.opprettetTidspunkt)}`;
    }
  }
  return texts.moteElement.subtitles.noMeetings;
};

interface MotelandingssideMoteElementProps {
  fnr: string;
  mote: MoteDTO;
  skalVisePrikk: boolean;
}

export const MotelandingssideMoteElement = (
  motelandingssideMoteElementProps: MotelandingssideMoteElementProps
) => {
  const { fnr, mote, skalVisePrikk } = motelandingssideMoteElementProps;
  const undertittel = setUndertittel(mote);
  const tittel = setTittel(mote);
  return (
    <li className="motelandingssidepanel">
      <Link
        className="motelandingssidepanel__innhold"
        to={`/sykefravaer/${fnr}/mote`}
      >
        <img
          className="motelandingssidepanel__ikon"
          src="/sykefravaer/img/svg/moteikon_blaabg.svg"
          alt="moteikon"
        />
        <div className="motelandingssidepanel__tekst">
          <header className="motelandingssidepanel__tekst--tittel">
            <h3 className="js-title" id="soknad-header-mote">
              {tittel}
            </h3>
          </header>
          <p className="inngangspanel__tekst--undertittel js-tekst">
            {undertittel}
          </p>
        </div>
        {skalVisePrikk && <MotelandingssidePrikk />}
      </Link>
    </li>
  );
};

interface MotelandingssideMotebehovElementProps {
  fnr: string;
  skalVisePrikk: boolean;
}

export const MotelandingssideMotebehovElement = (
  motelandingssideMotebehovElementProps: MotelandingssideMotebehovElementProps
) => {
  const { fnr, skalVisePrikk } = motelandingssideMotebehovElementProps;
  return (
    <li className="motelandingssidepanel">
      <Link
        className="motelandingssidepanel__innhold"
        to={`/sykefravaer/${fnr}/motebehov`}
      >
        <img
          className="motelandingssidepanel__ikon"
          src="/sykefravaer/img/svg/moteikon_blaabg.svg"
          alt="moteikon"
        />
        <div className="motelandingssidepanel__tekst">
          <header className="motelandingssidepanel__tekst--tittel">
            <h3 className="js-title" id="soknad-header-mote">
              {texts.motebehovElement.title}
            </h3>
          </header>
          <p className="inngangspanel__tekst--undertittel js-tekst">
            {texts.motebehovElement.subtitle}
          </p>
        </div>
        {skalVisePrikk && <MotelandingssidePrikk />}
      </Link>
    </li>
  );
};

interface MotelandingssideProps {
  fnr: string;
  mote: MoteDTO;
  skalViseMotebehovPrikk: boolean;
  skalViseMotePrikk: boolean;
}

export const Motelandingsside = (
  motelandingssideProps: MotelandingssideProps
) => {
  const {
    fnr,
    mote,
    skalViseMotebehovPrikk,
    skalViseMotePrikk,
  } = motelandingssideProps;
  return (
    <div>
      <Sidetopp tittel={texts.pageHeader} />
      <ul>
        <MotelandingssideMoteElement
          fnr={fnr}
          mote={mote}
          skalVisePrikk={skalViseMotePrikk}
        />
        <MotelandingssideMotebehovElement
          fnr={fnr}
          skalVisePrikk={skalViseMotebehovPrikk}
        />
      </ul>
    </div>
  );
};

export default Motelandingsside;
