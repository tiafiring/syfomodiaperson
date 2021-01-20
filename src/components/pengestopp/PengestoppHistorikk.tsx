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
import { navLysBla, navLysBlaDarken } from "../../colors";

interface IPengestoppDropdown {
  statusEndringList: StatusEndring[];
  sykmeldinger: SykmeldingOldFormat[];
}

const StyledBorderedPanel = styled(Panel)`
  background: ${navLysBla};
  border-color: ${navLysBlaDarken};
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
            <Element>{`${opprettet.getDay()}.${opprettet.getDate()}.${opprettet.getFullYear()} · Gjelder for:
            
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
