import { useParams } from "react-router-dom";
import Side from "../../sider/Side";
import { MOETEPLANLEGGER } from "../../enums/menypunkter";
import React, { ReactElement } from "react";
import Sidetopp from "../Sidetopp";
import DialogmoteInnkallingSkjema from "./DialogmoteInnkallingSkjema";
import { useAppSelector } from "../../hooks/hooks";
import SideLaster from "../SideLaster";
import styled from "styled-components";
import AlertStripe from "nav-frontend-alertstriper";

const texts = {
  pageTitle: "Innkalling til dialogmøte",
  pageHeader: "Innkalling til dialogmøte",
  alert:
    "I denne nye løsningen sender du innkalling, avlysning, endring av tidspunkt og referat. I Arena trenger du bare endre status til ferdig behandlet.",
};

const DialmogteInnkallingWarningAlert = styled(AlertStripe)`
  margin-bottom: 2.5rem;
`;

const DialogmoteInnkallingContainer = (): ReactElement => {
  const { fnr } = useParams();
  const {
    data: ledere,
    henter: henterLedere,
    hentingFeilet: hentingLedereFeilet,
  } = useAppSelector((state) => state.ledere);
  const {
    henter: henterTilgang,
    hentingFeilet: hentingTilgangFeilet,
    data: tilgang,
  } = useAppSelector((state) => state.tilgang);

  const henter = henterTilgang || henterLedere;
  const hentingFeilet = hentingTilgangFeilet || hentingLedereFeilet;

  return (
    <Side fnr={fnr} tittel={texts.pageTitle} aktivtMenypunkt={MOETEPLANLEGGER}>
      <SideLaster
        henter={henter}
        hentingFeilet={hentingFeilet}
        tilgang={tilgang}
      >
        <Sidetopp tittel={texts.pageHeader} />
        <DialmogteInnkallingWarningAlert type="advarsel">
          {texts.alert}
        </DialmogteInnkallingWarningAlert>
        <DialogmoteInnkallingSkjema ledere={ledere} />
      </SideLaster>
    </Side>
  );
};
export default DialogmoteInnkallingContainer;
