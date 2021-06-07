import { DialogmotePanel } from "../../mote/components/DialogmotePanel";
import { FortidenImage } from "../../../../img/ImageComponents";
import { FlexRow } from "../../Layout";
import React, { ReactElement, useState } from "react";
import { useHistoriskeDialogmoter } from "../../../data/dialogmote/dialogmote_hooks";
import {
  DialogmoteDTO,
  DialogmoteStatus,
  MotedeltakerVarselType,
} from "../../../data/dialogmote/dialogmoteTypes";
import { tilDatoMedUkedagOgManedNavn } from "../../../utils/datoUtils";
import styled from "styled-components";
import { Forhandsvisning } from "../Forhandsvisning";
import { Normaltekst } from "nav-frontend-typografi";
import { TrackedFlatknapp } from "../../buttons/TrackedFlatknapp";

const texts = {
  header: "Møtehistorikk",
  subtitle:
    "Oversikt over tidligere dialogmøter som ble innkalt i Modia (inkluderer ikke historikk fra Arena).",
  avlystMote: "Avlyst møte",
  avholdtMote: "Avholdt møte",
  referat: "Referat",
  avlysningsBrev: "Avlysningsbrev",
};

const InlineNormaltekst = styled(Normaltekst)`
  display: inline;
`;

const FlatknappWithMargin = styled(TrackedFlatknapp)`
  margin-left: 1em;
`;

interface MoteListElementProps {
  children: DialogmoteDTO;
}

const MoteListElement = ({ children }: MoteListElementProps): ReactElement => {
  const [modalIsOpen, setModalIsOpen] = useState(false);
  const isMoteAvlyst = children.status === DialogmoteStatus.AVLYST;
  const varselType = isMoteAvlyst
    ? MotedeltakerVarselType.AVLYST
    : MotedeltakerVarselType.REFERAT;
  const documentComponents = children.arbeidstaker.varselList.find(
    (varsel) => varsel.varselType === varselType
  )?.document;

  return (
    <li>
      <InlineNormaltekst>
        {isMoteAvlyst ? texts.avlystMote : texts.avholdtMote}{" "}
        {tilDatoMedUkedagOgManedNavn(children.tid)}
      </InlineNormaltekst>
      {documentComponents && (
        <>
          <Forhandsvisning
            title={isMoteAvlyst ? texts.avlysningsBrev : texts.referat}
            subtitle=""
            contentLabel={isMoteAvlyst ? texts.avlysningsBrev : texts.referat}
            isOpen={modalIsOpen}
            handleClose={() => setModalIsOpen(false)}
            documentComponents={() => documentComponents}
          />
          <FlatknappWithMargin
            data-cy={isMoteAvlyst ? texts.avlysningsBrev : texts.referat}
            context={texts.header}
            mini
            htmlType="button"
            onClick={() => {
              setModalIsOpen(true);
            }}
          >
            {isMoteAvlyst ? texts.avlysningsBrev : texts.referat}
          </FlatknappWithMargin>
        </>
      )}
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
