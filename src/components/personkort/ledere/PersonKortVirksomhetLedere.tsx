import React from "react";
import styled from "styled-components";
import { Row, Column } from "nav-frontend-grid";
import { EtikettLiten } from "nav-frontend-typografi";
import { Leder } from "../../../data/leder/ledere";
import { restdatoTildato } from "../../../utils/datoUtils";
import PersonKortVirksomhetHeader from "./PersonKortVirksomhetHeader";
import EpostButton from "../EpostButton";

const texts = {
  name: "Navn",
  phone: "Telefon",
  email: "E-post",
  orgnummer: "Org.nummer",
  startDate: "Meldt inn",
  active: "Nåværende",
};

const RowFullWidth = styled(Row)`
  width: 100%;
  margin-bottom: 0.5em;
`;

const EtikettLitenUpper = styled(EtikettLiten)`
  text-transform: uppercase;
`;

export const PersonKortVirksomhetLederIngressRow = () => {
  return (
    <RowFullWidth>
      <Column className="col-sm-4">
        <EtikettLitenUpper>{texts.name}</EtikettLitenUpper>
      </Column>
      <Column className="col-sm-2">
        <EtikettLitenUpper>{texts.email}</EtikettLitenUpper>
      </Column>
      <Column className="col-sm-2">
        <EtikettLitenUpper>{texts.phone}</EtikettLitenUpper>
      </Column>
      <Column className="col-sm-2">
        <EtikettLitenUpper>{texts.startDate}</EtikettLitenUpper>
      </Column>
    </RowFullWidth>
  );
};

interface PersonKortVirksomhetLederColumnProps {
  colSize: number;
  text?: string;
  isActive: boolean;
}

export const PersonKortVirksomhetLederColumn = (
  personKortVirksomhetLederColumnProps: PersonKortVirksomhetLederColumnProps
) => {
  const { colSize, text, isActive } = personKortVirksomhetLederColumnProps;
  return (
    <Column className={`col-sm-${colSize}`}>
      <p>{isActive ? <b>{text}</b> : text}</p>
    </Column>
  );
};

interface PersonKortVirksomhetLederRowProps {
  leder: Leder;
  isActive: boolean;
}

export const PersonKortVirksomhetLederRow = (
  personKortVirksomhetLederRowProps: PersonKortVirksomhetLederRowProps
) => {
  const { leder, isActive } = personKortVirksomhetLederRowProps;
  return (
    <RowFullWidth>
      <PersonKortVirksomhetLederColumn
        colSize={4}
        text={leder.navn}
        isActive={isActive}
      />
      <EpostButton epost={leder.epost} />
      <PersonKortVirksomhetLederColumn
        colSize={2}
        text={leder.tlf}
        isActive={isActive}
      />
      {leder.fomDato && (
        <PersonKortVirksomhetLederColumn
          colSize={2}
          text={restdatoTildato(leder.fomDato)}
          isActive={isActive}
        />
      )}
      {isActive && (
        <PersonKortVirksomhetLederColumn
          colSize={2}
          text={texts.active}
          isActive={isActive}
        />
      )}
    </RowFullWidth>
  );
};

interface PersonKortVirksomhetLedereProps {
  sykmeldinger: any[];
  virksomhetLederMap: any;
  virksomhetsnummer: string;
}

const PersonKortVirksomhetLedere = (
  personKortVirksomhetLedereProps: PersonKortVirksomhetLedereProps
) => {
  const {
    sykmeldinger,
    virksomhetLederMap,
    virksomhetsnummer,
  } = personKortVirksomhetLedereProps;
  const currentLeder = virksomhetLederMap[virksomhetsnummer][0];
  return (
    <PersonKortVirksomhetHeader
      currentLeder={currentLeder}
      sykmeldinger={sykmeldinger}
    >
      <PersonKortVirksomhetLederIngressRow />
      {virksomhetLederMap[virksomhetsnummer].map(
        (leder: Leder, idx: number) => {
          return (
            <PersonKortVirksomhetLederRow
              key={idx}
              leder={leder}
              isActive={idx === 0}
            />
          );
        }
      )}
    </PersonKortVirksomhetHeader>
  );
};

export default PersonKortVirksomhetLedere;
