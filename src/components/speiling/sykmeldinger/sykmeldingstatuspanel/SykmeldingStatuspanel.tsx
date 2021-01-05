import React from "react";
import {
  Sykmeldingstatus,
  SendtDato,
  Arbeidsgiver,
  Orgnummer,
} from "./SykmeldingStatuspanelOpplysning";
import { gamleSMStatuser as sykmeldingstatuser } from "../../../../utils/sykmeldinger/sykmeldingstatuser";
import { sykmelding as sykmeldingPt } from "../../../../propTypes";
import GjenapneSykmelding from "./GjenapneSykmelding";
import Statuspanel, { Statusopplysninger } from "../../Statuspanel";
import { SykmeldingOldFormat } from "../../../../data/sykmelding/types/SykmeldingOldFormat";

interface NokkelopplysningerProps {
  sykmelding: SykmeldingOldFormat;
}

export const Nokkelopplysninger = (
  nokkelopplysningerProps: NokkelopplysningerProps
) => {
  const { sykmelding } = nokkelopplysningerProps;
  switch (sykmelding.status) {
    case sykmeldingstatuser.SENDT:
    case sykmeldingstatuser.TIL_SENDING: {
      return (
        <Statusopplysninger>
          <Sykmeldingstatus sykmelding={sykmelding} />
          <SendtDato sykmelding={sykmelding} />
          <Arbeidsgiver sykmelding={sykmelding} />
          <Orgnummer sykmelding={sykmelding} />
        </Statusopplysninger>
      );
    }
    case sykmeldingstatuser.AVBRUTT: {
      return (
        <Statusopplysninger>
          <Sykmeldingstatus sykmelding={sykmelding} />
          <SendtDato sykmelding={sykmelding} />
        </Statusopplysninger>
      );
    }
    case sykmeldingstatuser.UTGAATT: {
      return (
        <Statusopplysninger>
          <Sykmeldingstatus sykmelding={sykmelding} />
        </Statusopplysninger>
      );
    }
    default: {
      return null;
    }
  }
};

Nokkelopplysninger.propTypes = {
  sykmelding: sykmeldingPt,
};

interface SykmeldingStatuspanelProps {
  sykmelding: SykmeldingOldFormat;
}

const SykmeldingStatuspanel = (
  sykmeldingStatuspanelProps: SykmeldingStatuspanelProps
) => {
  const { sykmelding } = sykmeldingStatuspanelProps;
  return (
    <Statuspanel>
      <Nokkelopplysninger sykmelding={sykmelding} />
      {sykmelding.status === sykmeldingstatuser.AVBRUTT &&
        !sykmelding.egenmeldt && <GjenapneSykmelding />}
    </Statuspanel>
  );
};

export default SykmeldingStatuspanel;
