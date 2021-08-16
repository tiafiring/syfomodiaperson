import React, { ReactElement } from "react";
import { MoteDTO } from "@/data/mote/types/moteTypes";
import { SeMoteStatus } from "./SeMoteStatus";
import { MoteIkonBlaaImage } from "../../../../../img/ImageComponents";
import { DialogmotePanel } from "../DialogmotePanel";
import { tilDatoMedUkedagOgManedNavn } from "@/utils/datoUtils";
import { useAktivtMoteplanleggerMote } from "@/data/mote/moter_hooks";
import { FlexRow } from "../../../Layout";
import { useHistory } from "react-router";
import { TrackedKnapp } from "../../../buttons/TrackedKnapp";

const texts = {
  nyttMote: "Nytt dialogmøte",
  dialogMote: "Dialogmøte",
  moteforesporselSendt: "Møteforespørsel sendt",
  bekreftetMote: "Bekreftet møte",
  seMotestatus: "Se møtestatus",
  planleggNyttMote: "Planlegg nytt dialogmøte",
  ingenMoterPlanlagt: "Ingen møter planlagt",
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

export const Moteplanleggeren = (): ReactElement => {
  const aktivtMote = useAktivtMoteplanleggerMote();
  const history = useHistory();

  return aktivtMote ? (
    <DialogmotePanel
      icon={MoteIkonBlaaImage}
      header={
        aktivtMote.status === "BEKREFTET"
          ? texts.bekreftetMote
          : texts.seMotestatus
      }
      subtitle={resolveUndertittelForMoteStatus(aktivtMote)}
    >
      <SeMoteStatus />
    </DialogmotePanel>
  ) : (
    <DialogmotePanel
      icon={MoteIkonBlaaImage}
      header={texts.planleggNyttMote}
      subtitle={texts.ingenMoterPlanlagt}
    >
      <FlexRow>
        <TrackedKnapp
          data-cy="nyttMoteplanleggerMote"
          context={texts.planleggNyttMote}
          onClick={() => {
            history.push(`/sykefravaer/mote`);
          }}
        >
          {texts.nyttMote}
        </TrackedKnapp>
      </FlexRow>
    </DialogmotePanel>
  );
};
