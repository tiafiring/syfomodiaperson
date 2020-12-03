import React from "react";
import { tilLesbarPeriodeMedArUtenManednavn } from "../../utils/datoUtils";
import BoksRad from "./BoksRad";

const kolonne2Tekst = (periode: any) => {
  if (!!periode.behandlingsdager) {
    return periode.behandlingsdager === 1
      ? `${periode.behandlingsdager} behandlingsdag`
      : `${periode.behandlingsdager} behandlingsdager`;
  }
  if (!!periode.reisetilskudd) {
    return !!periode.grad
      ? `${periode.grad}% sykmeldt med reisetilskudd`
      : "Full jobb med reisetilskudd";
  }
  if (!!periode.avventende) {
    return "Avventende";
  }
  return `${periode.grad}%`;
};

interface PeriodeBoksProps {
  periode: any;
}

export const PeriodeBoks = (periodeBoksProps: PeriodeBoksProps) => {
  const periode = periodeBoksProps.periode;
  return (
    <div className="sykmeldingMotebehovVisning__periodeBoks">
      <BoksRad
        kolonne1Tekst={`${tilLesbarPeriodeMedArUtenManednavn(
          periode.fom,
          periode.tom
        )}`}
        kolonne2Tekst={kolonne2Tekst(periode)}
        erTittel
      />
    </div>
  );
};

interface PerioderProps {
  perioder: any[];
}

const Perioder = (perioderProps: PerioderProps) => {
  const perioder = perioderProps.perioder;
  return (
    <div className="sykmeldingMotebehovVisning__perioder">
      <h6 className="sporsmal">Perioder</h6>
      {perioder.map((periode, index) => {
        return <PeriodeBoks key={index} periode={periode} />;
      })}
    </div>
  );
};

export default Perioder;
