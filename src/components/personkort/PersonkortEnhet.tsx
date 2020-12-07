import React from "react";
import PersonkortElement from "./PersonkortElement";
import PersonkortInformasjon from "./PersonkortInformasjon";

const texts = {
  enhet: "Enhet",
};

interface PersonkortEnhetProps {
  behandlendeEnhet: any;
}

const PersonkortEnhet = (personkortEnhetProps: PersonkortEnhetProps) => {
  const { behandlendeEnhet } = personkortEnhetProps;
  const informasjonNokkelTekster = new Map([["enhetId", texts.enhet]]);
  const valgteElementer = (({ enhetId }) => {
    return { enhetId };
  })(behandlendeEnhet);
  return (
    <PersonkortElement
      tittel={behandlendeEnhet.navn}
      imgUrl="/sykefravaer/img/svg/kontorbygg.svg"
    >
      <PersonkortInformasjon
        informasjonNokkelTekster={informasjonNokkelTekster}
        informasjon={valgteElementer}
      />
    </PersonkortElement>
  );
};

export default PersonkortEnhet;
