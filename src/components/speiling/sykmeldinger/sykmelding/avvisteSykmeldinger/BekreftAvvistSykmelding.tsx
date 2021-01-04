import React from "react";
import { Checkbox } from "nav-frontend-skjema";
import { Hovedknapp } from "nav-frontend-knapper";
import { SykmeldingOldFormat } from "../../../../../data/sykmelding/types/SykmeldingOldFormat";
import { gamleSMStatuser } from "../../../../../utils/sykmeldinger/sykmeldingstatuser";

const texts = {
  confirm: "Bekreft",
  confirmCheckboxLabel:
    "Jeg bekrefter at jeg har lest at sykmeldingen er avvist",
};

interface BekreftAvvistSykmeldingProps {
  sykmelding: SykmeldingOldFormat;
}

const BekreftAvvistSykmelding = (
  bekreftAvvistSykmeldingProps: BekreftAvvistSykmeldingProps
) => {
  const { sykmelding } = bekreftAvvistSykmeldingProps;
  return (
    <>
      {sykmelding.status === gamleSMStatuser.NY && (
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
