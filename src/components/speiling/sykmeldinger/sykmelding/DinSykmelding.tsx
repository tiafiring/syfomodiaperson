import React from "react";
import { Link } from "react-router";
import Alertstripe from "nav-frontend-alertstriper";
import { Bjorn } from "@navikt/digisyfo-npm";
import DineSykmeldingOpplysninger from "./sykmeldingOpplysninger/DineSykmeldingOpplysninger";
import { SykmeldingOldFormat } from "../../../../data/sykmelding/types/SykmeldingOldFormat";

const texts = {
  eldreSykmeldinger: "Du har eldre sykmeldinger som du bør behandle før denne.",
  eldreSykmeldingerLenke: "Gå til den eldste sykmeldingen.",
  bjorn:
    "Hei, her sjekker du opplysningene fra den som sykmeldte deg. Stemmer det med det dere ble enige om? Du velger selv om du vil bruke sykmeldingen.",
};

interface DinSykmeldingProps {
  sykmelding: SykmeldingOldFormat;
  ledetekster: any;
  visEldreSykmeldingVarsel?: boolean;
  eldsteSykmeldingId?: string;
}

const DinSykmelding = (dinSykmeldingProps: DinSykmeldingProps) => {
  const {
    sykmelding,
    ledetekster,
    visEldreSykmeldingVarsel,
    eldsteSykmeldingId,
  } = dinSykmeldingProps;
  return (
    <div>
      <Bjorn className="blokk" hvit stor rootUrl="/sykefravaer">
        <div>
          <p>{texts.bjorn}</p>
          <p className="introtekst__knapperad">
            <button disabled className="knapp knapp--mini">
              Gå til utfylling
            </button>
          </p>
        </div>
      </Bjorn>
      {visEldreSykmeldingVarsel && (
        <Alertstripe type="info">
          <p className="sist side-innhold">
            <span>{texts.eldreSykmeldinger} </span>
            <Link to={`/sykefravaer/sykmeldinger/${eldsteSykmeldingId}`}>
              {texts.eldreSykmeldingerLenke}
            </Link>
          </p>
        </Alertstripe>
      )}
      <header className="panelHeader panelHeader--lysebla">
        <img
          className="panelHeader__ikon"
          src="/sykefravaer/img/svg/person.svg"
          alt="Du"
        />
        <img
          className="panelHeader__ikon panelHeader__ikon--hoykontrast"
          src="/sykefravaer/img/svg/person-highcontrast.svg"
          alt="Du"
        />
      </header>
      <div className="panel blokk">
        <DineSykmeldingOpplysninger
          sykmelding={sykmelding}
          ledetekster={ledetekster}
        />
      </div>
    </div>
  );
};

export default DinSykmelding;
