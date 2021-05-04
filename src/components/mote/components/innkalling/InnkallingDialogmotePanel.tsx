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
  //Todo: Fiks noe greier når datastruktur kommer på plass
  const eksisterendeMoteplanleggerMote = useAktivtMoteplanleggerMote();
  const eksisterendeDialogmoteInnkallingMote = undefined;

  //Fjernes når vi går i prod med ferdig løsning
  if (!erLokalEllerPreprod) {
    return <Moteplanleggeren />;
  } else if (eksisterendeDialogmoteInnkallingMote) {
    return <DialogmoteMoteStatusPanel />;
  } else if (eksisterendeMoteplanleggerMote) {
    return (
      <DialogmotePanel
        icon={MoteIkonBlaaImage}
        header={
          eksisterendeMoteplanleggerMote.status === "BEKREFTET"
            ? texts.bekreftetMote
            : texts.seMotestatus
        }
        subtitle={resolveUndertittelForMoteStatus(
          eksisterendeMoteplanleggerMote
        )}
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
