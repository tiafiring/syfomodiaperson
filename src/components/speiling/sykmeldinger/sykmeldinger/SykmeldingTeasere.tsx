import React from "react";
import { SykmeldingOldFormat } from "../../../../data/sykmelding/types/SykmeldingOldFormat";
import SykmeldingTeaser from "./SykmeldingTeaser";

interface SykmeldingTeasereProps {
  sykmeldinger: SykmeldingOldFormat[];
  ledetekster: any;
  fnr: string;
  className: string;
  tittel: string;
  ingenSykmeldingerMelding: string;
  id: string;
  children?: any;
}

const SykmeldingTeasere = (sykmeldingTeasereProps: SykmeldingTeasereProps) => {
  const {
    sykmeldinger,
    ledetekster,
    fnr,
    className,
    tittel = "",
    ingenSykmeldingerMelding,
    id,
    children,
  } = sykmeldingTeasereProps;
  return (
    <div className="blokk--l">
      <header className="inngangspanelerHeader">
        <h2 className="inngangspanelerHeader__tittel">{tittel}</h2>
        {children}
      </header>
      <div id={id} className={className || "js-content"}>
        {sykmeldinger.length ? (
          sykmeldinger.map((sykmelding, idx) => {
            return (
              <SykmeldingTeaser
                key={idx}
                fnr={fnr}
                sykmelding={sykmelding}
                ledetekster={ledetekster}
              />
            );
          })
        ) : (
          <p className="panel typo-infotekst">{ingenSykmeldingerMelding}</p>
        )}
      </div>
    </div>
  );
};

export default SykmeldingTeasere;
