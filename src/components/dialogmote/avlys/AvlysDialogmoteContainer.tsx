import React, { ReactElement, useEffect } from "react";
import { useParams } from "react-router-dom";
import Side from "../../../sider/Side";
import { MOETEPLANLEGGER } from "../../../enums/menypunkter";
import SideLaster from "../../SideLaster";
import Sidetopp from "../../Sidetopp";
import { useTilgang } from "../../../hooks/useTilgang";
import AvlysDialogmoteSkjema from "./AvlysDialogmoteSkjema";
import { useAppSelector } from "../../../hooks/hooks";
import Feilmelding from "../../Feilmelding";
import { useDispatch } from "react-redux";
import { fetchDialogmote } from "../../../data/dialogmote/dialogmote_actions";

const texts = {
  pageTitle: "Avlys dialogmøte",
  pageHeader: "Avlys dialogmøte",
  moteNotFound: "Fant ikke dialogmøte",
};

const AvlysDialogmoteContainer = (): ReactElement => {
  const { dialogmoteUuid, fnr } = useParams<{
    dialogmoteUuid: string;
    fnr: string;
  }>();
  const {
    henterMote,
    henterMoteFeilet,
    dialogmoter,
    moterHentet,
  } = useAppSelector((state) => state.dialogmote);
  const { tilgang, hentingTilgangFeilet, henterTilgang } = useTilgang();

  const dispatch = useDispatch();
  useEffect(() => {
    if (!moterHentet) {
      dispatch(fetchDialogmote(fnr));
    }
  }, [moterHentet]);

  const henter = henterTilgang || henterMote;
  const hentingFeilet = hentingTilgangFeilet || henterMoteFeilet;
  const dialogmote = dialogmoter.find(
    (dialogmote) => dialogmote.uuid === dialogmoteUuid
  );

  return (
    <Side fnr={fnr} tittel={texts.pageTitle} aktivtMenypunkt={MOETEPLANLEGGER}>
      <SideLaster
        henter={henter}
        hentingFeilet={hentingFeilet}
        tilgang={tilgang}
      >
        <Sidetopp tittel={texts.pageHeader} />
        {dialogmote ? (
          <AvlysDialogmoteSkjema
            dialogmote={dialogmote}
            pageTitle={texts.pageTitle}
          />
        ) : (
          <Feilmelding tittel={texts.moteNotFound} />
        )}
      </SideLaster>
    </Side>
  );
};

export default AvlysDialogmoteContainer;
