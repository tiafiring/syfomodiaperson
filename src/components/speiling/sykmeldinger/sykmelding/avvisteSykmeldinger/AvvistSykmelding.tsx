import React from "react";
import { SykmeldingOldFormat } from "../../../../../data/sykmelding/types/SykmeldingOldFormat";
import AvvistSykmeldingStatuspanel from "./AvvistSykmeldingStatuspanel";
import { AvvistSykmeldingPanel } from "./AvvistSykmeldingPanel";
import BekreftAvvistSykmelding from "./BekreftAvvistSykmelding";
import DineSykmeldingOpplysninger from "../sykmeldingOpplysninger/DineSykmeldingOpplysninger";

interface AvvistSykmeldingProps {
  sykmelding: SykmeldingOldFormat;
}

const AvvistSykmelding = (avvistSykmeldingProps: AvvistSykmeldingProps) => {
  const { sykmelding } = avvistSykmeldingProps;
  return (
    <div>
      <AvvistSykmeldingStatuspanel sykmelding={sykmelding} />
      <AvvistSykmeldingPanel sykmelding={sykmelding} />
      <div className="panel blokk">
        <DineSykmeldingOpplysninger sykmelding={sykmelding} />
      </div>
      <BekreftAvvistSykmelding sykmelding={sykmelding} />
    </div>
  );
};

export default AvvistSykmelding;
