import React, { ReactElement } from "react";
import { MoteDTO } from "@/data/mote/types/moteTypes";
import { SeMoteStatus } from "./SeMoteStatus";
import { MoteIkonBlaaImage } from "../../../../../img/ImageComponents";
import { DialogmotePanel } from "../DialogmotePanel";
import { tilDatoMedUkedagOgManedNavn } from "@/utils/datoUtils";
import { useAktivtMoteplanleggerMote } from "@/data/mote/moter_hooks";
import { FlexRow } from "../../../Layout";
import { TrackedKnapp } from "../../../buttons/TrackedKnapp";
import { Link } from "react-router-dom";

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
        <Link to="/sykefravaer/mote">
          <TrackedKnapp
            data-cy="nyttMoteplanleggerMote"
            context={texts.planleggNyttMote}
          >
            {texts.nyttMote}
          </TrackedKnapp>
        </Link>
      </FlexRow>
    </DialogmotePanel>
  );
};
