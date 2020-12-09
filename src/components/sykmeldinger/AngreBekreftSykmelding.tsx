import React from "react";
import { useSelector } from "react-redux";
import Knapp from "nav-frontend-knapper";
import { SykmeldingOldFormat } from "../../data/sykmelding/types/SykmeldingOldFormat";
import { SykepengesoknaderState } from "../../data/sykepengesoknad/soknader";

const texts = {
  angre: "Endre opplysninger",
};

export const sykmeldingHarSoknad = (
  sykepengesoknaderState: SykepengesoknaderState,
  sykmeldingId: string
) => {
  return (
    sykepengesoknaderState.data.filter((soknad) => {
      return soknad.sykmeldingId === sykmeldingId;
    }).length > 0
  );
};

interface AngreBekreftSykmeldingProps {
  sykmelding: SykmeldingOldFormat;
}

const AngreBekreftSykmelding = (
  angreBekreftSykmeldingProps: AngreBekreftSykmeldingProps
) => {
  const { sykmelding } = angreBekreftSykmeldingProps;

  const sykepengesoknaderState = useSelector((state: any) => state.soknader);

  const FIRE_MANEDER_SIDEN = new Date();
  FIRE_MANEDER_SIDEN.setMonth(FIRE_MANEDER_SIDEN.getMonth() - 4);
  const vis =
    new Date(sykmelding.sendtdato) > FIRE_MANEDER_SIDEN &&
    !sykmeldingHarSoknad(sykepengesoknaderState, sykmelding.id);
  return (
    <>
      {vis ? (
        <div>
          <div className="verktoylinje">
            <Knapp type="standard" mini disabled>
              {texts.angre}
            </Knapp>
          </div>
        </div>
      ) : null}
    </>
  );
};

export default AngreBekreftSykmelding;
