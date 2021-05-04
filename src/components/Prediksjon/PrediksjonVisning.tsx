import React, { useEffect } from "react";
import { useDispatch } from "react-redux";
import { hentPrediksjon } from "../../data/prediksjon/prediksjon_actions";
import PrediksjonHjelpetekst from "./PrediksjonHjelpetekst";
import ViktigeFaktorer from "./ViktigeFaktorer";
import DetaljertInformasjon from "./DetaljertInformasjon";
import PrediksjonResultat from "./PrediksjonResultat";
import { useAppSelector } from "../../hooks/hooks";
import { DialogmotePanel } from "../mote/components/DialogmotePanel";
import { UtropstegnImage } from "../../../img/ImageComponents";

interface PrediksjonProps {
  fnr: string;
}

const texts = {
  title: "Vil den sykmeldte fortsatt være sykmeldt etter uke 28?",
};

const PrediksjonVisning = ({ fnr }: PrediksjonProps) => {
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(hentPrediksjon(fnr));
  }, []);
  const prediksjonData = useAppSelector((state) => state.prediksjon?.data);
  return (
    <>
      {!!prediksjonData && (
        <DialogmotePanel
          icon={UtropstegnImage}
          header={texts.title}
          topRightElement={<PrediksjonHjelpetekst />}
        >
          <PrediksjonResultat prediksjon={prediksjonData} />
          <ViktigeFaktorer prediksjon={prediksjonData} />
          <DetaljertInformasjon
            kortereFaktorer={prediksjonData.kortereVarighetGrunner}
            lengreFaktorer={prediksjonData.lengreVarighetGrunner}
          />
        </DialogmotePanel>
      )}
    </>
  );
};

export default PrediksjonVisning;
