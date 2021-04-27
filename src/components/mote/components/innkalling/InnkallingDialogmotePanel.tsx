import React, { ReactElement } from "react";
import { MoteDTO } from "../../../../data/mote/types/moteTypes";
import { SeMoteStatus } from "./SeMoteStatus";
import { NyttDialogMote } from "./NyttDialogMote";
import { MoteIkonBlaaImage } from "../../../../../img/ImageComponents";
import { DialogmotePanel } from "../DialogmotePanel";
import { tilDatoMedUkedagOgManedNavn } from "../../../../utils/datoUtils";
import { useAktivtMote } from "../../../../data/mote/moter_hooks";

interface Props {
  fnr: string;
}

const resolveUndertittelForMoteStatus = (mote: MoteDTO) => {
  if (mote.status === "BEKREFTET" && mote.bekreftetAlternativ) {
    return `${"Dialogmøte"} ${tilDatoMedUkedagOgManedNavn(
      mote.bekreftetAlternativ.tid
    )}`;
  } else {
    return `${"Møteforespørsel sendt"} ${tilDatoMedUkedagOgManedNavn(
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
        aktivtMote.status === "BEKREFTET" ? "Bekreftet møte" : "Se møtestatus"
      }
      underoverskrift={resolveUndertittelForMoteStatus(aktivtMote)}
    >
      <SeMoteStatus fnr={fnr} />
    </DialogmotePanel>
  ) : (
    <DialogmotePanel
      ikon={MoteIkonBlaaImage}
      overskrift="Planlegg nytt dialogmøte"
      underoverskrift="Ingen møter planlagt"
    >
      <NyttDialogMote />
    </DialogmotePanel>
  );
};
