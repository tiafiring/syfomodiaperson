import React from "react";
import PersonkortElement from "./PersonkortElement";
import PersonkortInformasjon from "./PersonkortInformasjon";
import { KontorByggImage } from "../../../img/ImageComponents";
import { useBehandlendeEnhet } from "@/data/behandlendeenhet/behandlendeEnhet_hooks";
import ErrorBoundary from "../ErrorBoundary";

const texts = {
  enhet: "Enhet",
};

const PersonkortEnhet = () => {
  const { error, data } = useBehandlendeEnhet();
  const informasjonNokkelTekster = new Map([["enhetId", texts.enhet]]);
  const valgteElementer = (({ enhetId }) => {
    return { enhetId };
  })(data);
  return (
    <ErrorBoundary apiError={error}>
      <PersonkortElement
        tittel={data.navn}
        imgUrl={KontorByggImage}
        imgAlt="Kontorbygg"
      >
        <PersonkortInformasjon
          informasjonNokkelTekster={informasjonNokkelTekster}
          informasjon={valgteElementer}
        />
      </PersonkortElement>
    </ErrorBoundary>
  );
};

export default PersonkortEnhet;
