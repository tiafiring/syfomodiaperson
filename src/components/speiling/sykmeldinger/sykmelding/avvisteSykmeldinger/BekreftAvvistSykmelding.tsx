import React, { ReactElement } from "react";
import { Checkbox } from "nav-frontend-skjema";
import { Hovedknapp } from "nav-frontend-knapper";
import {
  SykmeldingOldFormat,
  SykmeldingStatus,
} from "../../../../../data/sykmelding/types/SykmeldingOldFormat";

const texts = {
  confirm: "Bekreft",
  confirmCheckboxLabel:
    "Jeg bekrefter at jeg har lest at sykmeldingen er avvist",
};

interface BekreftAvvistSykmeldingProps {
  sykmelding: SykmeldingOldFormat;
}

const BekreftAvvistSykmelding = ({
  sykmelding,
}: BekreftAvvistSykmeldingProps): ReactElement => {
  return (
    <>
      {sykmelding.status === SykmeldingStatus.NY && (
        <>
          <div>
            <Checkbox
              className="bekreftLestAvvistSykmelding bekreftCheckboksPanel"
              label={texts.confirmCheckboxLabel}
              disabled
            />
          </div>
          <div className="knapperad">
            <Hovedknapp disabled>{texts.confirm}</Hovedknapp>
          </div>
        </>
      )}
    </>
  );
};

export default BekreftAvvistSykmelding;
