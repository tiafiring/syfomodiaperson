import React, { ReactElement, useEffect } from "react";
import { useDispatch } from "react-redux";
import { hentSykmeldinger } from "@/data/sykmelding/sykmeldinger_actions";
import SykmeldingUtdrag from "./soknad-felles/SykmeldingUtdrag";
import {
  SoknadstypeDTO,
  SykepengesoknadDTO,
} from "@/data/sykepengesoknad/types/SykepengesoknadDTO";
import { useSykmeldinger } from "@/data/sykmelding/sykmeldinger_hooks";

interface SykmeldingUtdragContainerProps {
  soknad: SykepengesoknadDTO;
  fnr: string;
}

export const SykmeldingUtdragContainer = ({
  soknad,
  fnr,
}: SykmeldingUtdragContainerProps): ReactElement => {
  const {
    henterSykmeldinger,
    hentetSykmeldinger,
    hentingSykmeldingerFeilet,
    sykmeldinger,
  } = useSykmeldinger();
  const sykmelding = sykmeldinger.find((s) => {
    return s.id === soknad.sykmeldingId;
  });
  const skalHenteSykmeldinger =
    !henterSykmeldinger && !hentetSykmeldinger && !hentingSykmeldingerFeilet;
  const dispatch = useDispatch();
  useEffect(() => {
    if (skalHenteSykmeldinger) {
      dispatch(hentSykmeldinger(fnr));
    }
  }, [fnr, dispatch, skalHenteSykmeldinger]);

  return sykmelding &&
    soknad &&
    (!soknad.soknadstype ||
      soknad.soknadstype === SoknadstypeDTO.ARBEIDSTAKERE) ? (
    <SykmeldingUtdrag sykmelding={sykmelding} />
  ) : (
    <></>
  );
};
