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

const DialogmoteInfo = ({ dialogmote }: DialogmoteInfoProps): ReactElement => {
  const dialogmoteTid = dialogmote.tidStedList[0]?.tid;

  return (
    <AvlysDialogmoteSkjemaSeksjon>
      <FlexRow>
        <FlexColumn>
          <Element>{texts.gjelderTitle}</Element>
          {dialogmoteTid && (
            <Normaltekst>
              {tilDatoMedUkedagOgManedNavnOgKlokkeslett(dialogmoteTid)}
            </Normaltekst>
          )}
        </FlexColumn>
      </FlexRow>
    </AvlysDialogmoteSkjemaSeksjon>
  );
};

export default DialogmoteInfo;
