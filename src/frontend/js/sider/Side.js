import React from 'react';
import PropTypes from 'prop-types';
import { Container, Row, Column } from 'nav-frontend-grid';
import GlobalNavigasjonContainer from '../containers/GlobalNavigasjonContainer';
import PersonkortContainer from '../containers/PersonKortContainer';

const DocumentTitle = require('react-document-title');

const Side = ({ tittel = '', children, aktivtMenypunkt, fnr }) => {
    return (<DocumentTitle title={tittel + (tittel.length > 0 ? ' - Sykefravær' : 'Sykefravær')}>
        <Container>
            <Row>
                <Column className="col-xs-12">
                    <PersonkortContainer />
                </Column>
            </Row>
            <Row>
                <nav className="col-xs-12 col-sm-4">
                    <GlobalNavigasjonContainer fnr={fnr} aktivtMenypunkt={aktivtMenypunkt} />
                </nav>
                <Column className="col-xs-12 col-sm-8">
                    {children}
                </Column>
            </Row>
        </Container>
    </DocumentTitle>);
};

Side.propTypes = {
    children: PropTypes.object,
    fnr: PropTypes.string,
    tittel: PropTypes.string,
    aktivtMenypunkt: PropTypes.string,
};

export default Side;
