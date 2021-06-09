import React from "react";
import { tilLesbarDatoMedArstall } from "../../utils/datoUtils";
import OppfoelgingsdialogIkon from "../../ikoner/OppfoelgingsdialogIkon";
import MoteIkon from "../../ikoner/MoteIkon";
import LederIkon from "../../ikoner/LederIkon";
import styled from "styled-components";
import { Normaltekst } from "nav-frontend-typografi";
import navFarger from "nav-frontend-core";

const hentIkon = (event: any) => {
  switch (event.kilde) {
    case "MOTER":
    case "MOTEBEHOV": {
      return <MoteIkon />;
    }
    case "OPPFOELGINGSDIALOG": {
      return <OppfoelgingsdialogIkon />;
    }
    case "LEDER": {
      return <LederIkon />;
    }
    default: {
      return null;
    }
  }
};

const HistorikkEventListItem = styled.li`
  border-bottom: 1px solid ${navFarger.navGra40};
  padding: 1.5em 0;
  display: block;

  &:last-child {
    border-bottom: 0;
  }
`;

const HistorikkEventInfo = styled.div`
  display: flex;
`;

const HistorikkIkonWrapper = styled.div`
  display: flex;
  align-self: center;
  margin-right: 10px;
`;

interface HistorikkEventProps {
  event: any;
}

const HistorikkEvent = (historikkEventProps: HistorikkEventProps) => {
  const event = historikkEventProps.event;
  return (
    <HistorikkEventListItem>
      <Normaltekst>{tilLesbarDatoMedArstall(event.tidspunkt)}</Normaltekst>
      <HistorikkEventInfo>
        <HistorikkIkonWrapper>{hentIkon(event)}</HistorikkIkonWrapper>
        <Normaltekst>{event.tekst}</Normaltekst>
      </HistorikkEventInfo>
    </HistorikkEventListItem>
  );
};

export default HistorikkEvent;
