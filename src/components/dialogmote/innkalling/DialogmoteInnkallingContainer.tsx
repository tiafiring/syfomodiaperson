import Side from "../../../sider/Side";
import { MOETEPLANLEGGER } from "@/enums/menypunkter";
import React, { ReactElement } from "react";
import Sidetopp from "../../Sidetopp";
import DialogmoteInnkallingSkjema from "./DialogmoteInnkallingSkjema";
import SideLaster from "../../SideLaster";
import styled from "styled-components";
import { useLedere } from "@/hooks/useLedere";
import { useValgtPersonident } from "@/hooks/useValgtBruker";
import { AlertstripeFullbredde } from "../../AlertstripeFullbredde";
import { BrukerKanIkkeVarslesPapirpostAdvarsel } from "@/components/dialogmote/BrukerKanIkkeVarslesPapirpostAdvarsel";
import { useDM2FeatureToggles } from "@/data/unleash/unleash_hooks";
import { useNavBrukerData } from "@/data/navbruker/navbruker_hooks";

const texts = {
  title: "Innkalling til dialogmøte",
  alert:
    "I denne nye løsningen sender du innkalling, avlysning, endring av tidspunkt og referat. I Arena trenger du bare endre status til ferdig behandlet.",
};

const DialogmoteInnkallingWarningAlert = styled(AlertstripeFullbredde)`
  margin-bottom: 2.5em;
`;

const DialogmoteInnkallingContainer = (): ReactElement => {
  const fnr = useValgtPersonident();
  const { hentingLedereForsokt, hentingLedereFeilet } = useLedere();
  const { isDm2FysiskBrevEnabled } = useDM2FeatureToggles();
  const {
    kontaktinfo: { skalHaVarsel: brukerKanVarslesDigitalt },
  } = useNavBrukerData();

  return (
    <Side fnr={fnr} tittel={texts.title} aktivtMenypunkt={MOETEPLANLEGGER}>
      <SideLaster
        henter={!hentingLedereForsokt}
        hentingFeilet={hentingLedereFeilet}
      >
        <Sidetopp tittel={texts.title} />
        <DialogmoteInnkallingWarningAlert type="advarsel">
          {texts.alert}
        </DialogmoteInnkallingWarningAlert>
        {isDm2FysiskBrevEnabled && !brukerKanVarslesDigitalt ? (
          <BrukerKanIkkeVarslesPapirpostAdvarsel />
        ) : (
          <></>
        )}
        <DialogmoteInnkallingSkjema pageTitle={texts.title} />
      </SideLaster>
    </Side>
  );
};
export default DialogmoteInnkallingContainer;
