import * as React from "react";
import { Element, Undertittel } from "nav-frontend-typografi";
import {
  Arbeidsgiver,
  StatusEndring,
} from "../../data/pengestopp/types/FlaggPerson";
import {
  sykmeldingerToArbeidsgiver,
  uniqueArbeidsgivere,
} from "../../utils/pengestoppUtils";
import { SykmeldingOldFormat } from "../../data/sykmelding/types/SykmeldingOldFormat";
import { sykepengestoppArsakTekstListe } from "./PengestoppModal";
import Panel from "nav-frontend-paneler";
import styled from "styled-components";
import { texts } from "./Pengestopp";

interface IPengestoppDropdown {
  statusEndringList: StatusEndring[];
  sykmeldinger: SykmeldingOldFormat[];
}

const navLysBla = "#e0f5fb";
const navLysBlaDarken = "#5690a2";

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
            
            ${
              allArbeidsgivere.find(
                (ag: Arbeidsgiver) =>
                  ag.orgnummer === statusEndring.virksomhetNr.value
              )?.navn
            }
           `}</Element>
            <p>
              {statusEndring.arsakList?.length > 0 &&
                `Årsak: ${statusEndring?.arsakList
                  .map((arsak, index: number) => {
                    return sykepengestoppArsakTekstListe.find((arsakTekst) => {
                      return arsakTekst.type === arsak.type;
                    })?.text;
                  })
                  .join(", ")}.`}
            </p>
          </StyledBorderedPanel>
        );
      })}
    </>
  );
};

export default PengestoppHistorikk;
