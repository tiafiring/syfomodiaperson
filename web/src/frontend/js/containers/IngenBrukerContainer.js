import React from 'react';
import { connect } from 'react-redux';
import { Container, Row, Column } from 'nav-frontend-grid';
import Infomelding from '../components/Infomelding';

export const IngenBrukerSide = () => {
    return (<Container>
        <Row>
            <Column className="col-xs-12">
                <Infomelding tittel="Du har ikke valgt hvilken person du ønsker å se" melding="For å se oppfølgingen må du skrive inn fødselsnummeret i menylinjen" />
            </Column>
        </Row>
    </Container>);
};

export function mapStateToProps() {
    return {};
}

const IngenBrukerContainer = connect(mapStateToProps)(IngenBrukerSide);

export default IngenBrukerContainer;
