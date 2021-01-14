import React from "react";
import styled from "styled-components";
import EtikettBase from "nav-frontend-etiketter";
import { Brukerinfo } from "../../data/navbruker/types/Brukerinfo";
import { DiskresjonskodeState } from "../../data/diskresjonskode/diskresjonskode";
import { EgenansattState } from "../../data/egenansatt/egenansatt";
import {
  formaterFnr,
  hentBrukersAlderFraFnr,
  hentBrukersKjoennFraFnr,
} from "../../utils/fnrUtils";
import { KJOENN } from "../../konstanter";
import { sykmeldingerHasCoronaDiagnose } from "../../utils/sykmeldinger/sykmeldingUtils";
import { startDateFromLatestActiveTilfelle } from "../../utils/periodeUtils";
import { tilLesbarDatoMedArUtenManedNavn } from "../../utils/datoUtils";
import CopyButton from "../kopierknapp/CopyButton";

const texts = {
  copied: "Kopiert!",
  startDate: "Sykmeldt f.o.m.: ",
};

interface HeaderInfoStartDateProps {
  startDate: any;
}

const HeaderInfoStartDate = (
  headerInfoStartDateProps: HeaderInfoStartDateProps
) => {
  const { startDate } = headerInfoStartDateProps;
  return (
    <>
      {!!startDate && (
        <React.Fragment>
          <span className="startdate__text">{texts.startDate}</span>
          <span className="startdate__date">
            {tilLesbarDatoMedArUtenManedNavn(startDate)}
          </span>
        </React.Fragment>
      )}
    </>
  );
};

const StyledFnr = styled.div`
  display: flex;
  img {
    padding-left: 0.5em;
    width: auto;
    height: 1.2em;
  }
`;

interface PersonkortHeaderProps {
  diskresjonskode: DiskresjonskodeState;
  egenansatt: EgenansattState;
  navbruker: Brukerinfo;
  oppfolgingstilfelleperioder: any;
  sykmeldinger: any[];
}

const PersonkortHeader = (personkortHeaderProps: PersonkortHeaderProps) => {
  const {
    diskresjonskode,
    egenansatt,
    navbruker,
    oppfolgingstilfelleperioder,
    sykmeldinger,
  } = personkortHeaderProps;
  const hasCoronaDiagnose = sykmeldingerHasCoronaDiagnose(sykmeldinger);
  const visEtiketter =
    diskresjonskode.data.diskresjonskode === "6" ||
    diskresjonskode.data.diskresjonskode === "7" ||
    egenansatt.data.erEgenAnsatt ||
    hasCoronaDiagnose;
  const tittelImg =
    hentBrukersKjoennFraFnr(navbruker.kontaktinfo.fnr) === KJOENN.KVINNE
      ? "/sykefravaer/img/svg/kvinne.svg"
      : "/sykefravaer/img/svg/mann.svg";

  const startDate =
    oppfolgingstilfelleperioder &&
    startDateFromLatestActiveTilfelle(oppfolgingstilfelleperioder);
  return (
    <div className="personkortHeader">
      <div className="personkortHeader__info">
        <img src={tittelImg} alt="person" />
        <div>
          <h3>{`${
            navbruker.navn ? navbruker.navn : ""
          } (${hentBrukersAlderFraFnr(navbruker.kontaktinfo.fnr)} år)`}</h3>
          <StyledFnr>
            {formaterFnr(navbruker.kontaktinfo.fnr)}
            <CopyButton
              message={texts.copied}
              value={navbruker.kontaktinfo.fnr}
            />
          </StyledFnr>
          <HeaderInfoStartDate startDate={startDate} />
        </div>
      </div>
      {visEtiketter && (
        <div className="personkortHeader__etikker">
          {diskresjonskode.data.diskresjonskode === "6" && (
            <EtikettBase type="fokus">Kode 6</EtikettBase>
          )}
          {diskresjonskode.data.diskresjonskode === "7" && (
            <EtikettBase type="fokus">Kode 7</EtikettBase>
          )}
          {egenansatt.data.erEgenAnsatt && (
            <EtikettBase type="fokus">Egenansatt</EtikettBase>
          )}
          {hasCoronaDiagnose && (
            <EtikettBase type="fokus">Koronasykmeldt</EtikettBase>
          )}
        </div>
      )}
    </div>
  );
};

export default PersonkortHeader;
