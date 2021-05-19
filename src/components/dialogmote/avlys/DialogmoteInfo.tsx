import { FlexColumn, FlexRow } from "../../Layout";
import { Element, Normaltekst } from "nav-frontend-typografi";
import { tilDatoMedUkedagOgManedNavnOgKlokkeslett } from "../../../utils/datoUtils";
import React, { ReactElement } from "react";
import { DialogmoteDTO } from "../../../data/dialogmote/dialogmoteTypes";
import AvlysDialogmoteSkjemaSeksjon from "./AvlysDialogmoteSkjemaSeksjon";

const texts = {
  gjelderTitle: "Gjelder dialogmøtet",
};

interface DialogmoteInfoProps {
  dialogmote: DialogmoteDTO;
}

const DialogmoteInfo = ({ dialogmote }: DialogmoteInfoProps): ReactElement => (
  <AvlysDialogmoteSkjemaSeksjon>
    <FlexRow>
      <FlexColumn>
        <Element>{texts.gjelderTitle}</Element>
        <Normaltekst>
          {tilDatoMedUkedagOgManedNavnOgKlokkeslett(dialogmote.tid)}
        </Normaltekst>
      </FlexColumn>
    </FlexRow>
  </AvlysDialogmoteSkjemaSeksjon>
);

export default DialogmoteInfo;
