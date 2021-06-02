import React, { useEffect } from "react";
import styled from "styled-components";
import { Column, Container, Row } from "nav-frontend-grid";
import GlobalNavigasjonContainer from "../components/globalnavigasjon/GlobalNavigasjonContainer";
import Personkort from "../components/personkort/Personkort";
import Decorator from "../decorator/Decorator";
import DocumentTitle from "react-document-title";
import {
  hasLoadedMetaData,
  useTrackPageLoad,
} from "../data/logging/loggingHooks";

const StyledContainer = styled(Container)`
  width: 95%;
`;

interface SideProps {
  tittel: string;
  children?: any;
  aktivtMenypunkt: string;
  fnr?: string;
}

const Side = (sideProps: SideProps) => {
  const { tittel, children, aktivtMenypunkt, fnr } = sideProps;
  const metaDataLoaded = hasLoadedMetaData();
  const trackPageLoad = useTrackPageLoad();

  useEffect(() => {
    if (metaDataLoaded) {
      trackPageLoad(tittel, aktivtMenypunkt);
    }
  }, [metaDataLoaded]);

  return (
    <>
      <Decorator />
      <DocumentTitle
        title={tittel + (tittel.length > 0 ? " - Sykefravær" : "Sykefravær")}
      >
        <StyledContainer fluid>
          <Row>
            <Column className="col-xs-12">
              <Personkort />
            </Column>
          </Row>
          <Row>
            <nav className="col-xs-12 col-sm-3">
              <GlobalNavigasjonContainer
                fnr={fnr}
                aktivtMenypunkt={aktivtMenypunkt}
              />
            </nav>
            <Column className="col-xs-12 col-sm-9">{children}</Column>
          </Row>
        </StyledContainer>
      </DocumentTitle>
    </>
  );
};

export default Side;
