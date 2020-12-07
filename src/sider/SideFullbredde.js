import React from "react";
import PropTypes from "prop-types";
import { Container, Row, Column } from "nav-frontend-grid";
import ContextContainer from "../context/ContextContainer";
import Personkort from "../components/personkort/Personkort";

const DocumentTitle = require("react-document-title");

const Side = ({ tittel = "", children }) => {
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

Side.propTypes = {
  children: PropTypes.element,
  tittel: PropTypes.string,
};

export default Side;
