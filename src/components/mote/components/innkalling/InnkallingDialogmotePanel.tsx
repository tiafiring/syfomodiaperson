import React, { ReactElement } from "react";
import { MoteDTO } from "../../../../data/mote/types/moteTypes";
import { SeMoteStatus } from "./SeMoteStatus";
import { NyttDialogMote } from "./NyttDialogMote";
import { MoteIkonBlaaImage } from "../../../../../img/ImageComponents";
import { DialogmotePanel } from "../DialogmotePanel";
import { tilDatoMedUkedagOgManedNavn } from "../../../../utils/datoUtils";
import { useAktivtMoteplanleggerMote } from "../../../../data/mote/moter_hooks";
import { Moteplanleggeren } from "./Moteplanleggeren";
import { DialogmoteMoteStatusPanel } from "./DialogmoteMoteStatusPanel";
import { useAktivtDialogmote } from "../../../../data/dialogmote/dialogmote_hooks";
import { useIsDM2Enabled } from "../../../../data/unleash/unleash_hooks";
import { useNavBrukerData } from "../../../../data/navbruker/navbruker_hooks";
import styled from "styled-components";
import { AlertstripeFullbredde } from "../../../AlertstripeFullbredde";
import { Normaltekst } from "nav-frontend-typografi";
import { BrukerKanIkkeVarslesText } from "../../../BrukerKanIkkeVarslesText";

export const texts = {
  bekreftetMote: "Bekreftet møte",
  seMotestatus: "Se møtestatus",
  planleggNyttMote: "Planlegg nytt dialogmøte",
  ingenMoterPlanlagt: "Ingen møter planlagt",
  dialogMote: "Dialogmøte",
  moteforesporselSendt: "Møteforespørsel sendt",
  kanIkkeVarslesDialogmoteInnkalling:
    "Dialogmøter med denne personen må fortsatt kalles inn via Arena.",
};

const BrukerKanIkkeVarslesAlertStripe = styled(AlertstripeFullbredde)`
  margin-bottom: 2em;
`;

const BrukerKanIkkeVarslesWarning = () => (
  <BrukerKanIkkeVarslesAlertStripe type="advarsel">
    <BrukerKanIkkeVarslesText />
    <br />
    <Normaltekst>{texts.kanIkkeVarslesDialogmoteInnkalling}</Normaltekst>
  </BrukerKanIkkeVarslesAlertStripe>
);

const resolveUndertittelForMoteStatus = (mote: MoteDTO) => {
  if (mote.status === "BEKREFTET" && mote.bekreftetAlternativ) {
    return `${texts.dialogMote} ${tilDatoMedUkedagOgManedNavn(
      mote.bekreftetAlternativ.tid
    )}`;
  } else {
    return `${texts.moteforesporselSendt} ${tilDatoMedUkedagOgManedNavn(
      mote.opprettetTidspunkt
    )}`;
  }
};

export const InnkallingDialogmotePanel = (): ReactElement => {
  const isDm2Enabled = useIsDM2Enabled();
  const aktivtMoteplanleggerMote = useAktivtMoteplanleggerMote();
  const aktivtDialogmote = useAktivtDialogmote();
  const {
    kontaktinfo: { skalHaVarsel },
  } = useNavBrukerData();

  if (!isDm2Enabled) {
    return <Moteplanleggeren />;
  }

  if (aktivtDialogmote) {
    return <DialogmoteMoteStatusPanel dialogmote={aktivtDialogmote} />;
  } else if (aktivtMoteplanleggerMote) {
    return (
      <DialogmotePanel
        icon={MoteIkonBlaaImage}
        header={
          aktivtMoteplanleggerMote.status === "BEKREFTET"
            ? texts.bekreftetMote
            : texts.seMotestatus
        }
        subtitle={resolveUndertittelForMoteStatus(aktivtMoteplanleggerMote)}
      >
        <SeMoteStatus />
      </DialogmotePanel>
    );
  } else {
    return (
      <DialogmotePanel
        icon={MoteIkonBlaaImage}
        header={texts.planleggNyttMote}
        subtitle={texts.ingenMoterPlanlagt}
      >
        {!skalHaVarsel && <BrukerKanIkkeVarslesWarning />}
        <NyttDialogMote />
      </DialogmotePanel>
    );
  }
};
