import React, { useEffect } from "react";
import { useDispatch } from "react-redux";
import styled from "styled-components";
import { hentPrediksjon } from "../../data/prediksjon/prediksjon_actions";
import Prediksjontittel from "./Prediksjontittel";
import ViktigeFaktorer from "./ViktigeFaktorer";
import DetaljertInformasjon from "./DetaljertInformasjon";
import PrediksjonResultat from "./PrediksjonResultat";
import { useAppSelector } from "../../hooks/hooks";

interface PrediksjonProps {
  fnr: string;
}

const PrediksjonPanel = styled.div`
  margin-bottom: 1em;
`;

const PrediksjonVisning = ({ fnr }: PrediksjonProps) => {
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(hentPrediksjon(fnr));
  }, []);
  const prediksjonReducer = useAppSelector((state) => state.prediksjon);
  const data = prediksjonReducer && prediksjonReducer.data;

  return (
    <>
      {!!data && (
        <PrediksjonPanel className="panel">
          <Prediksjontittel />
          <PrediksjonResultat prediksjon={data} />
          <ViktigeFaktorer prediksjon={data} />
          <DetaljertInformasjon
            kortereFaktorer={data.kortereVarighetGrunner}
            lengreFaktorer={data.lengreVarighetGrunner}
          />
        </PrediksjonPanel>
      )}
    </>
  );
};

export default PrediksjonVisning;
