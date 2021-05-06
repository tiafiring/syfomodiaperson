import React, { ReactElement } from "react";
import { MoteDTO } from "../../../../data/mote/types/moteTypes";
import { SeMoteStatus } from "./SeMoteStatus";
import { NyttDialogMote } from "./NyttDialogMote";
import { MoteIkonBlaaImage } from "../../../../../img/ImageComponents";
import { DialogmotePanel } from "../DialogmotePanel";
import { tilDatoMedUkedagOgManedNavn } from "../../../../utils/datoUtils";
import { useAktivtMoteplanleggerMote } from "../../../../data/mote/moter_hooks";
import { Moteplanleggeren } from "./Moteplanleggeren";
import { erLokalEllerPreprod } from "../../../../utils/miljoUtil";
import { DialogmoteMoteStatusPanel } from "./DialogmoteMoteStatusPanel";
import { useAktivtDialogmote } from "../../../../data/dialogmote/dialogmote_hooks";

const texts = {
  bekreftetMote: "Bekreftet møte",
  seMotestatus: "Se møtestatus",
  planleggNyttMote: "Planlegg nytt dialogmøte",
  ingenMoterPlanlagt: "Ingen møter planlagt",
  dialogMote: "Dialogmøte",
  moteforesporselSendt: "Møteforespørsel sendt",
};

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
  const aktivtMoteplanleggerMote = useAktivtMoteplanleggerMote();
  const aktivtDialogmote = useAktivtDialogmote();

  //Fjernes når vi går i prod med ferdig løsning
  if (!erLokalEllerPreprod) {
    return <Moteplanleggeren />;
  } else if (aktivtDialogmote) {
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
        <NyttDialogMote />
      </DialogmotePanel>
    );
  }
};
