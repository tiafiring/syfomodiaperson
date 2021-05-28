import { DialogmotePanel } from "../../mote/components/DialogmotePanel";
import { FortidenImage } from "../../../../img/ImageComponents";
import { FlexRow } from "../../Layout";
import React, { ReactElement } from "react";
import { useHistoriskeDialogmoter } from "../../../data/dialogmote/dialogmote_hooks";
import {
  DialogmoteDTO,
  DialogmoteStatus,
} from "../../../data/dialogmote/dialogmoteTypes";
import { tilDatoMedUkedagOgManedNavn } from "../../../utils/datoUtils";
import styled from "styled-components";

const texts = {
  header: "Møtehistorikk",
  subtitle:
    "Oversikt over tidligere dialogmøter som ble innkalt i Modia (inkluderer ikke historikk fra Arena).",
  avlystMote: "Avlyst møte",
  avholdtMote: "Avholdt møte",
};

interface MoteListElementProps {
  children: DialogmoteDTO;
}

const MoteListElement = ({ children }: MoteListElementProps): ReactElement => {
  const avlystMote = children.status === DialogmoteStatus.AVLYST;

  if (avlystMote) {
    return (
      <li>
        {texts.avlystMote} {tilDatoMedUkedagOgManedNavn(children.tid)}
      </li>
    );
  }

  return (
    <li>
      {texts.avholdtMote} {tilDatoMedUkedagOgManedNavn(children.tid)}
    </li>
  );
};

const UlWithoutIndentation = styled.ul`
  padding-left: 1.2em;
  margin: 0;
`;

export const MotehistorikkPanel = () => {
  const historiskeMoter = useHistoriskeDialogmoter();

  if (historiskeMoter.length === 0) return <></>;

  return (
    <DialogmotePanel
      icon={FortidenImage}
      header={texts.header}
      subtitle={texts.subtitle}
    >
      <FlexRow>
        <UlWithoutIndentation>
          {historiskeMoter.map((mote, index) => (
            <MoteListElement key={index}>{mote}</MoteListElement>
          ))}
        </UlWithoutIndentation>
      </FlexRow>
    </DialogmotePanel>
  );
};
