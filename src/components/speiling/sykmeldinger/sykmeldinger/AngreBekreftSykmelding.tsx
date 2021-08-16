import React, { ReactElement } from "react";
import Knapp from "nav-frontend-knapper";
import { SykmeldingOldFormat } from "@/data/sykmelding/types/SykmeldingOldFormat";
import { useAppSelector } from "@/hooks/hooks";
import { SykepengesoknadDTO } from "@/data/sykepengesoknad/types/SykepengesoknadDTO";

const texts = {
  angre: "Endre opplysninger",
};

export const sykmeldingHarSoknad = (
  sykepengeSoknader: SykepengesoknadDTO[],
  sykmeldingId: string
): boolean => {
  return sykepengeSoknader.some(
    (soknad) => soknad.sykmeldingId === sykmeldingId
  );
};

interface AngreBekreftSykmeldingProps {
  sykmelding: SykmeldingOldFormat;
}

const AngreBekreftSykmelding = (
  angreBekreftSykmeldingProps: AngreBekreftSykmeldingProps
): ReactElement => {
  const { sykmelding } = angreBekreftSykmeldingProps;

  const { data: sykepengeSoknader } = useAppSelector((state) => state.soknader);

  const FIRE_MANEDER_SIDEN = new Date();
  FIRE_MANEDER_SIDEN.setMonth(FIRE_MANEDER_SIDEN.getMonth() - 4);
  const vis =
    new Date(sykmelding.sendtdato) > FIRE_MANEDER_SIDEN &&
    !sykmeldingHarSoknad(sykepengeSoknader, sykmelding.id);
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
