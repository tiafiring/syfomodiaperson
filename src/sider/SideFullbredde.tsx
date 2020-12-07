import React from "react";
import { Container, Row, Column } from "nav-frontend-grid";
import ContextContainer from "../context/ContextContainer";
import Personkort from "../components/personkort/Personkort";

const DocumentTitle = require("react-document-title");

interface SideFullbreddeProps {
  tittel?: string;
  children?: any;
}

const Side = (sideFullbreddeProps: SideFullbreddeProps) => {
  const { tittel = "", children } = sideFullbreddeProps;
  return (
    <DocumentTitle
      title={tittel + (tittel.length > 0 ? " - Sykefravær" : "Sykefravær")}
    >
      <Container>
        <Row>
          <Column className="col-xs-12">
            <ContextContainer />
          </Column>
        </Row>
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
  );
};

export default Side;
