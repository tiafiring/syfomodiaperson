import React, { ReactElement } from "react";
import { MoteDTO } from "../../../../data/mote/types/moteTypes";
import { SeMoteStatus } from "./SeMoteStatus";
import { NyttDialogMote } from "./NyttDialogMote";
import { MoteIkonBlaaImage } from "../../../../../img/ImageComponents";
import { DialogmotePanel } from "../DialogmotePanel";
import { tilDatoMedUkedagOgManedNavn } from "../../../../utils/datoUtils";
import { useAktivtMote } from "../../../../data/mote/moter_hooks";

const texts = {
  bekreftetMote: "Bekreftet møte",
  seMotestatus: "Se møtestatus",
  planleggNyttMote: "Planlegg nytt dialogmøte",
  ingenMoterPlanlagt: "Ingen møter planlagt",
  dialogMote: "Dialogmøte",
  moteforesporselSendt: "Møteforespørsel sendt",
};

interface Props {
  fnr: string;
}

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

export const InnkallingDialogmotePanel = ({ fnr }: Props): ReactElement => {
  const aktivtMote = useAktivtMote();

  return aktivtMote ? (
    <DialogmotePanel
      ikon={MoteIkonBlaaImage}
      overskrift={
        aktivtMote.status === "BEKREFTET"
          ? texts.bekreftetMote
          : texts.seMotestatus
      }
      underoverskrift={resolveUndertittelForMoteStatus(aktivtMote)}
    >
      <SeMoteStatus fnr={fnr} />
    </DialogmotePanel>
  ) : (
    <DialogmotePanel
      ikon={MoteIkonBlaaImage}
      overskrift={texts.planleggNyttMote}
      underoverskrift={texts.ingenMoterPlanlagt}
    >
      <NyttDialogMote />
    </DialogmotePanel>
  );
};
