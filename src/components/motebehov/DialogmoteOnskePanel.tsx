import { UtropstegnImage } from "../../../img/ImageComponents";
import MotebehovKvittering from "./MotebehovKvittering";
import { FlexRow, PaddingSize } from "../Layout";
import BehandleMotebehovKnapp from "./BehandleMotebehovKnapp";
import { DialogmotePanel } from "../mote/components/DialogmotePanel";
import React from "react";
import { MotebehovVeilederDTO } from "@/data/motebehov/types/motebehovTypes";
import { Leder } from "@/data/leder/ledere";
import { OppfolgingstilfelleperioderMapState } from "@/data/oppfolgingstilfelle/oppfolgingstilfelleperioder";
import { Brukerinfo } from "@/data/navbruker/types/Brukerinfo";
import { VeilederinfoDTO } from "@/data/veilederinfo/types/VeilederinfoDTO";

const texts = {
  onskerOmDialogmote: "Ønsker om dialogmøte",
};

interface Props {
  motebehovData: MotebehovVeilederDTO[];
  ledereData: Leder[];
  oppfolgingstilfelleperioder: OppfolgingstilfelleperioderMapState;
  sykmeldt?: Brukerinfo;
  veilederinfo?: VeilederinfoDTO;
}

export const DialogmoteOnskePanel = ({
  motebehovData,
  ledereData,
  oppfolgingstilfelleperioder,
  sykmeldt,
  veilederinfo,
}: Props) => {
  return (
    <DialogmotePanel icon={UtropstegnImage} header={texts.onskerOmDialogmote}>
      <MotebehovKvittering
        motebehovData={motebehovData}
        ledereData={ledereData}
        oppfolgingstilfelleperioder={oppfolgingstilfelleperioder}
        sykmeldt={sykmeldt}
      />

      <FlexRow topPadding={PaddingSize.MD}>
        <BehandleMotebehovKnapp
          motebehovData={motebehovData}
          veilederinfo={veilederinfo}
        />
      </FlexRow>
    </DialogmotePanel>
  );
};
