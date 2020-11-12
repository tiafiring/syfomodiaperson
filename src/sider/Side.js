import React from 'react';
import PropTypes from 'prop-types';
import { Column, Container, Row } from 'nav-frontend-grid';
import GlobalNavigasjonContainer from '../containers/GlobalNavigasjonContainer';
import PersonkortContainer from '../containers/PersonKortContainer';
import ContextContainer from '../context/ContextContainer';

const DocumentTitle = require('react-document-title');

const Side = ({ tittel = '', children, aktivtMenypunkt, fnr }) => {
    return (<DocumentTitle title={tittel + (tittel.length > 0 ? ' - Sykefravær' : 'Sykefravær')}>
        <Container fluid style={{width: '95%'}}>
            <Row>
                <Column className="col-xs-12">
                    <ContextContainer/>
                </Column>
            </Row>
            <Row>
                <Column className="col-xs-12">
                    <PersonkortContainer/>
                </Column>
            </Row>
            <Row>
                <nav className="col-xs-12 col-sm-3">
                    <GlobalNavigasjonContainer fnr={fnr} aktivtMenypunkt={aktivtMenypunkt}/>
                </nav>
                <Column className="col-xs-12 col-sm-9">
                    {children}
                </Column>
            </Row>
        </Container>
    </DocumentTitle>);
};

Side.propTypes = {
    children: PropTypes.element,
    fnr: PropTypes.string,
    tittel: PropTypes.string,
    aktivtMenypunkt: PropTypes.string,
};

export default Side;
