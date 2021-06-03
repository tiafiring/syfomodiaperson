import * as React from "react";
import { Element, Undertittel } from "nav-frontend-typografi";
import { StatusEndring } from "../../data/pengestopp/types/FlaggPerson";
import {
  displayArbeidsgiverNavn,
  displayArsakText,
  sykmeldingerToArbeidsgiver,
  uniqueArbeidsgivere,
} from "../../utils/pengestoppUtils";
import { SykmeldingOldFormat } from "../../data/sykmelding/types/SykmeldingOldFormat";
import Panel from "nav-frontend-paneler";
import styled from "styled-components";
import { texts } from "./Pengestopp";
import navFarger from "nav-frontend-core";

interface IPengestoppDropdown {
  statusEndringList: StatusEndring[];
  sykmeldinger: SykmeldingOldFormat[];
}

const StyledBorderedPanel = styled(Panel)`
  background: ${navFarger.navLysBlaLighten80};
  border-color: ${navFarger.navLysBlaDarken40};
  margin: 0.5em 0;
`;

const PengestoppHistorikk = ({
  statusEndringList,
  sykmeldinger,
}: IPengestoppDropdown) => {
  const allArbeidsgivere = uniqueArbeidsgivere(
    sykmeldingerToArbeidsgiver(sykmeldinger)
  );

  return (
    <>
      <Undertittel>{texts.beskjeder}</Undertittel>
      {statusEndringList.map((statusEndring: StatusEndring, index: number) => {
        const opprettet = new Date(statusEndring.opprettet);
        return (
          <StyledBorderedPanel key={index} border>
            <Element>{`${opprettet.getDate()}.${
              opprettet.getMonth() + 1
            }.${opprettet.getFullYear()} · Gjelder for:
            
            ${displayArbeidsgiverNavn(allArbeidsgivere, statusEndring)}
           `}</Element>
            <p>
              {statusEndring.arsakList?.length > 0 &&
                displayArsakText(statusEndring.arsakList)}
            </p>
          </StyledBorderedPanel>
        );
      })}
    </>
  );
};

export default PengestoppHistorikk;
