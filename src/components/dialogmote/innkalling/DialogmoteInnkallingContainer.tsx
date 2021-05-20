import Side from "../../../sider/Side";
import { MOETEPLANLEGGER } from "../../../enums/menypunkter";
import React, { ReactElement } from "react";
import Sidetopp from "../../Sidetopp";
import DialogmoteInnkallingSkjema from "./DialogmoteInnkallingSkjema";
import SideLaster from "../../SideLaster";
import styled from "styled-components";
import AlertStripe from "nav-frontend-alertstriper";
import { useLedere } from "../../../hooks/useLedere";
import { useTilgang } from "../../../hooks/useTilgang";
import { useFnrParam } from "../../../hooks/useFnrParam";

const texts = {
  pageTitle: "Innkalling til dialogmøte",
  pageHeader: "Innkalling til dialogmøte",
  alert:
    "I denne nye løsningen sender du innkalling, avlysning, endring av tidspunkt og referat. I Arena trenger du bare endre status til ferdig behandlet.",
};

const DialogmoteInnkallingWarningAlert = styled(AlertStripe)`
  margin-bottom: 2.5em;
  .alertstripe__tekst {
    max-width: 100%;
  }
`;

const DialogmoteInnkallingContainer = (): ReactElement => {
  const fnr = useFnrParam();
  const { henterLedere, hentingLedereFeilet } = useLedere();
  const { henterTilgang, hentingTilgangFeilet, tilgang } = useTilgang();

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
        <DialogmoteInnkallingWarningAlert type="advarsel">
          {texts.alert}
        </DialogmoteInnkallingWarningAlert>
        <DialogmoteInnkallingSkjema />
      </SideLaster>
    </Side>
  );
};
export default DialogmoteInnkallingContainer;
