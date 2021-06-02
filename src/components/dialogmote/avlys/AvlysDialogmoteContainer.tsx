import React, { ReactElement } from "react";
import AvlysDialogmoteSkjema from "./AvlysDialogmoteSkjema";
import { DialogmoteSideContainer } from "../DialogmoteSideContainer";

const texts = {
  pageTitle: "Avlys dialogmøte",
  pageHeader: "Avlys dialogmøte",
};

const AvlysDialogmoteContainer = (): ReactElement => (
  <DialogmoteSideContainer title={texts.pageTitle} header={texts.pageHeader}>
    {(dialogmote) => (
      <AvlysDialogmoteSkjema
        dialogmote={dialogmote}
        pageTitle={texts.pageTitle}
      />
    )}
  </DialogmoteSideContainer>
);

export default AvlysDialogmoteContainer;
