import React, { useEffect } from "react";
import { Container, Row, Column } from "nav-frontend-grid";
import Personkort from "../components/personkort/Personkort";
import Decorator from "../decorator/Decorator";
import DocumentTitle from "react-document-title";
import {
  hasLoadedMetaData,
  useTrackPageLoad,
} from "../data/logging/loggingHooks";

interface SideFullbreddeProps {
  tittel: string;
  aktivtMenypunkt: string;
  children?: any;
}

const Side = (sideFullbreddeProps: SideFullbreddeProps) => {
  const { tittel, aktivtMenypunkt, children } = sideFullbreddeProps;
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
        <Container>
          <Row>
            <Column className="col-xs-12">
              <Personkort />
            </Column>
          </Row>
          <Row>
            <Column className="col-xs-12 col-sm-12">{children}</Column>
          </Row>
        </Container>
      </DocumentTitle>
    </>
  );
};

export default Side;
