import React, { useEffect } from "react";
import { Link } from "react-router-dom";
import { MoteDTO } from "../../../data/mote/types/moteTypes";
import { tilDatoMedUkedagOgManedNavn } from "../../../utils/datoUtils";
import Sidetopp from "../../Sidetopp";
import MotelandingssidePrikk from "./MotelandingssidePrikk";
import MotebehovSide from "../../motebehov/MotebehovSide";
import { useDispatch } from "react-redux";
import { hentMoter } from "../../../data/mote/moter_actions";
import { isUnfinishedMoterTask } from "../../../utils/GlobalNavigasjonUtils";
import AppSpinner from "../../AppSpinner";
import Feilmelding from "../../Feilmelding";
import { hentBegrunnelseTekst } from "../../../utils/tilgangUtils";
import { useAppSelector } from "../../../hooks/hooks";

const texts = {
  pageHeader: "Dialogmøter",
  errorTitle: "Du har ikke tilgang til denne tjenesten",
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
};

const setTittel = (mote?: MoteDTO) => {
  if (mote) {
    if (mote.status === "BEKREFTET") {
      return texts.moteElement.titles.confirmed;
    }
    return texts.moteElement.titles.seeStatus;
  }
  return texts.moteElement.titles.requestMeeting;
};

const setUndertittel = (mote?: MoteDTO) => {
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
  mote?: MoteDTO;
  skalVisePrikk: boolean;
}

export const MotelandingssideMoteElement = (
  motelandingssideMoteElementProps: MotelandingssideMoteElementProps
) => {
  const { fnr, mote, skalVisePrikk } = motelandingssideMoteElementProps;
  const undertittel = setUndertittel(mote);
  const tittel = setTittel(mote);
  return (
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
  );
};

interface MotelandingssideProps {
  fnr: string;
}

export const Motelandingsside = (
  motelandingssideProps: MotelandingssideProps
) => {
  const { fnr } = motelandingssideProps;
  const tilgangState = useAppSelector((state) => state.tilgang);
  const moterState = useAppSelector((state) => state.moter);
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(hentMoter(fnr));
  }, [fnr]);

  const henter = tilgangState.henter || moterState.henter;
  const hentingFeilet = tilgangState.hentingFeilet;
  const tilgang = tilgangState.data;
  const aktivtMote = moterState.data.find((mote) => mote.status !== "AVBRUTT");
  const skalViseMotePrikk = isUnfinishedMoterTask(moterState);

  if (henter) {
    return <AppSpinner />;
  }
  if (!tilgang.harTilgang) {
    return (
      <Feilmelding
        tittel={texts.errorTitle}
        melding={hentBegrunnelseTekst(tilgang.begrunnelse)}
      />
    );
  }
  if (hentingFeilet) {
    return <Feilmelding />;
  }

  return (
    <>
      <Sidetopp tittel={texts.pageHeader} />
      <MotelandingssideMoteElement
        fnr={fnr}
        mote={aktivtMote}
        skalVisePrikk={skalViseMotePrikk}
      />
      <MotebehovSide fnr={fnr} />
    </>
  );
};

export default Motelandingsside;
